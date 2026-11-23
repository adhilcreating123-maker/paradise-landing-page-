import fs from 'node:fs';

const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:3100';
const CDP = process.env.QA_CDP ?? 'http://127.0.0.1:9333';
const WIDTHS = [1440, 1024, 768, 390];

const tabs = await fetch(`${CDP}/json`).then((r) => r.json());
const tab = tabs.find((t) => t.type === 'page') ?? tabs[0];
if (!tab) throw new Error('No browser page');

const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));

let nextId = 0;
const pending = new Map();
const errors = [];
const badResponses = [];

ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.method === 'Runtime.exceptionThrown') {
    errors.push(message.params.exceptionDetails.text ?? 'runtime exception');
  }
  if (
    message.method === 'Log.entryAdded' &&
    message.params.entry.level === 'error'
  ) {
    errors.push(message.params.entry.text);
  }
  if (message.method === 'Network.responseReceived') {
    const response = message.params.response;
    if (response.status >= 400) {
      badResponses.push(`${response.status} ${response.url}`);
    }
  }
  if (message.method === 'Network.loadingFailed') {
    badResponses.push(`failed ${message.params.errorText}`);
  }
  if (message.id && pending.has(message.id)) {
    const entry = pending.get(message.id);
    pending.delete(message.id);
    message.error ? entry.reject(message.error) : entry.resolve(message.result);
  }
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

const pause = (ms) => new Promise((r) => setTimeout(r, ms));
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? 'evaluation failed');
  }
  return result.result.value;
};

fs.mkdirSync('.qa', { recursive: true });
await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Network.enable');

const results = [];

for (const width of WIDTHS) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height: 900,
    deviceScaleFactor: 1,
    mobile: width < 768,
  });
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }],
  });
  await send('Page.navigate', { url: `${BASE}/` });
  await pause(1400);

  const layout = await evaluate(`(() => {
    const root = document.documentElement;
    const decorImages = [...document.querySelectorAll(
      '[data-section-layers] img, [data-layer="decor"] img',
    )];
    const decorViolations = decorImages.filter((img) =>
      img.getAttribute('loading') !== 'lazy' ||
      !img.hasAttribute('width') ||
      !img.hasAttribute('height') ||
      img.getAttribute('alt') !== '' ||
      img.getAttribute('aria-hidden') !== 'true' ||
      !img.getAttribute('src').startsWith('/parallax/')
    ).map((img) => img.getAttribute('src'));
    const layerRoots = [...document.querySelectorAll('[data-section-layers]')];
    const midgrounds = [...document.querySelectorAll('[data-layer="midground"]')];
    const visibleLayers = [...document.querySelectorAll('[data-parallax-active]')].filter(
      (el) =>
        el.getClientRects().length > 0 &&
        !(innerWidth < 1024 && el.hasAttribute('data-parallax-mobile-hide')),
    );
    const layerGroup = (el) =>
      el.closest('section, footer, [data-parallax-section]') ?? document.body;
    const layersBySection = new Map();
    visibleLayers.forEach((el) => {
      const section = layerGroup(el);
      layersBySection.set(section, (layersBySection.get(section) ?? 0) + 1);
    });
    return {
      width: innerWidth,
      scrollWidth: root.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      layerRoots: layerRoots.length,
      backgrounds: document.querySelectorAll('[data-layer="background"]').length,
      foregrounds: document.querySelectorAll('[data-layer="foreground"]').length,
      midgrounds: midgrounds.length,
      maxActiveLayersPerSection: Math.max(0, ...layersBySection.values()),
      activeLayerDetails: [...layersBySection].map(([section, count]) => ({
        section: section.id || section.tagName.toLowerCase(),
        count,
        layers: visibleLayers
          .filter((el) => layerGroup(el) === section)
          .map((el) =>
            [
              el.tagName.toLowerCase(),
              el.getAttribute('data-layer') ?? el.getAttribute('data-depth') ?? '',
              el.getAttribute('data-parallax') ?? el.getAttribute('data-parallax-depth') ?? '',
              String(el.className).slice(0, 36),
            ].join('|'),
          ),
      })),
      decorImages: decorImages.length,
      decorViolations,
      clippedLayers: layerRoots.every((el) => getComputedStyle(el).overflowX === 'clip'),
      nonInteractive: layerRoots.every((el) => getComputedStyle(el).pointerEvents === 'none'),
      midgroundAbove: midgrounds.every((el) => Number(getComputedStyle(el).zIndex) > 0),
      headerPosition: getComputedStyle(document.querySelector('[data-sticky-header]')).position,
      motionReady: root.hasAttribute('data-motion-ready'),
      lenisAnchors: root.hasAttribute('data-lenis-anchors'),
      brokenImages: [...document.images]
        .filter((img) => img.getClientRects().length > 0 && img.complete && img.naturalWidth === 0)
        .map((img) => img.src),
      undefinedText: document.body.innerText.includes('undefined'),
    };
  })()`);

  await evaluate('window.scrollTo({ top: 600, behavior: "instant" })');
  await pause(450);
  const scrolled = await evaluate(`(() => {
    const fg = document.querySelector('[data-layer="foreground"]');
    const bg = document.querySelector('[data-layer="background"]');
    const copy = document.querySelector('[data-layer="midground"]');
    return {
      foregroundTransform: fg ? getComputedStyle(fg).transform : null,
      backgroundTransform: bg ? getComputedStyle(bg).transform : null,
      heroCopyOpacity: copy ? getComputedStyle(copy).opacity : null,
      scrollY: Math.round(scrollY),
    };
  })()`);

  await evaluate('window.scrollTo({ top: 0, behavior: "instant" })');
  await pause(300);
  await evaluate(`document.querySelector('a[href="#story"]').click()`);
  await pause(1300);
  const anchor = await evaluate(`(() => {
    const target = document.getElementById('story');
    const header = document.querySelector('[data-sticky-header]');
    return {
      hash: location.hash,
      targetTop: Math.round(target.getBoundingClientRect().top),
      headerHeight: header.offsetHeight,
      withinHeaderOffset: Math.abs(target.getBoundingClientRect().top - header.offsetHeight) < 12,
    };
  })()`);

  const shot = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  });
  fs.writeFileSync(
    `.qa/parallax-home-${width}.png`,
    Buffer.from(shot.data, 'base64'),
  );

  results.push({ ...layout, scrolled, anchor });
}

// Existing non-parallax motion keeps working.
await send('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await send('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }],
});
await send('Page.navigate', { url: `${BASE}/` });
await pause(1200);
const beforeRotation = await evaluate(`(() => {
  const active = [...document.querySelectorAll('[data-layer="background"] img')]
    .find((img) => img.className.includes('z-10') && img.naturalWidth > 0);
  return active ? active.getAttribute('src') : null;
})()`);
const motionBaseline = await evaluate(`(() => ({
  marqueeAnimation: getComputedStyle(document.querySelector('[data-parallax-depth="0.018"]')).animationName,
  cakeRingAnimation: getComputedStyle(document.querySelector('.animate-spin')).animationName,
  revealCount: document.querySelectorAll('[data-reveal]').length,
}))()`);
await pause(4300);
const afterRotation = await evaluate(`(() => {
  const active = [...document.querySelectorAll('[data-layer="background"] img')]
    .find((img) => img.className.includes('z-10') && img.naturalWidth > 0);
  return active ? active.getAttribute('src') : null;
})()`);
const existingAnimations = {
  ...motionBaseline,
  heroPhotoRotated: Boolean(beforeRotation && afterRotation && beforeRotation !== afterRotation),
  beforeRotation,
  afterRotation,
};

// Light scroll sample: long frames here would indicate janky parallax.
await evaluate('window.scrollTo({ top: 0, behavior: "instant" })');
await pause(250);
const frameTiming = await evaluate(`new Promise((resolve) => {
  const deltas = [];
  let last = performance.now();
  const start = last;
  function tick(now) {
    deltas.push(now - last);
    last = now;
    window.scrollBy(0, 10);
    if (now - start < 1000) requestAnimationFrame(tick);
    else {
      const sorted = [...deltas].sort((a, b) => a - b);
      resolve({
        frames: deltas.length,
        avgMs: Number((deltas.reduce((sum, d) => sum + d, 0) / deltas.length).toFixed(2)),
        p95Ms: Number(sorted[Math.floor(sorted.length * 0.95)].toFixed(2)),
        maxMs: Number(Math.max(...deltas).toFixed(2)),
      });
    }
  }
  requestAnimationFrame(tick);
})`);

// Reduced motion must leave the page static and fully visible.
await send('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
});
await send('Page.navigate', { url: `${BASE}/` });
await pause(1000);
const reducedMotion = await evaluate(`(() => {
  const copy = document.querySelector('[data-layer="midground"]');
  const layer = document.querySelector('.section-layer--fg');
  return {
    contentVisible: getComputedStyle(copy).opacity === '1',
    animationName: getComputedStyle(layer).animationName,
    parallaxOffset: getComputedStyle(layer).getPropertyValue('--pb-parallax-y').trim(),
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  };
})()`);

const report = {
  results,
  existingAnimations,
  frameTiming,
  reducedMotion,
  errors,
  badResponses,
};
fs.writeFileSync('.qa/parallax-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
ws.close();
