import type { CSSProperties } from 'react';
import styles from './CustomCakePreview.module.css';

type CakePreviewProps = {
  shape: string;
  flavour: string;
  layers: string;
  size: string;
  theme: string;
  topper: string;
  message: string;
};

const palettes: Record<string, string[]> = {
  'Cherry Red': ['#ea8499', '#a32140', '#671425'],
  'Royal Burgundy & Gold': ['#bd6377', '#741c3a', '#e7b65d'],
  'Dark Chocolate': ['#ad7d67', '#543129', '#d6a074'],
  'Pastel Rose': ['#ffe1e7', '#cf779a', '#a3486b'],
};

const fillings: Record<string, string> = {
  Vanilla: '#fff0cc',
  'Belgian Chocolate': '#42231b',
  'Red velvet': '#aa1d37',
  Butterscotch: '#d78939',
};

export default function CustomCakePreview({ shape, flavour, layers, size, theme, topper, message }: CakePreviewProps) {
  const count = Number.parseInt(layers, 10);
  const [icing, shade, trim] = palettes[theme];
  const cakeStyle = {
    '--icing': icing,
    '--shade': shade,
    '--trim': trim,
    '--filling': fillings[flavour],
    '--cake-width': `${62 + Number.parseFloat(size) * 12}%`,
  } as CSSProperties;
  const lettering = message.trim();

  return (
    <div
      role="img"
      aria-label={`${shape} ${layers} ${flavour} cake, ${size}, ${theme}${topper === 'None' ? '' : `, ${topper}`}${lettering ? `, message: ${lettering}` : ''}`}
      className={styles.stage}
      style={cakeStyle}
    >
      <div aria-hidden="true" className={styles.cake}>
        {topper !== 'None' && (
          <div className={styles.topper}>
            {topper === 'Candles' ? '🕯️🕯️🕯️' : topper === 'Flowers' ? '🌸' : <span>Happy Birthday</span>}
          </div>
        )}
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className={styles.tier}
            data-shape={shape}
            data-cake-tier
            style={{ width: `${100 - (count - index - 1) * 21}%`, zIndex: count - index }}
          >
            {index === count - 1 && lettering && <span className={styles.message}>{lettering}</span>}
          </div>
        ))}
        <div className={styles.plate} />
      </div>
    </div>
  );
}
