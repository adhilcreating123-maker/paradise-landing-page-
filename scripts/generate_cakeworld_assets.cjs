const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '..', 'public', 'images', 'cakeworld');
fs.mkdirSync(outDir, { recursive: true });

// SVG definitions for all 12 items
const assets = {
  'cake-main': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="goldPlate" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFE088"/>
          <stop offset="60%" stop-color="#E3A04B"/>
          <stop offset="100%" stop-color="#735C00"/>
        </radialGradient>
        <linearGradient id="chocBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3B0813"/>
          <stop offset="50%" stop-color="#240008"/>
          <stop offset="100%" stop-color="#140004"/>
        </linearGradient>
        <linearGradient id="creamLayer" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFDF9"/>
          <stop offset="100%" stop-color="#F2E4C9"/>
        </linearGradient>
        <radialGradient id="cherryRed" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FF5C67"/>
          <stop offset="40%" stop-color="#C70024"/>
          <stop offset="90%" stop-color="#5C0010"/>
        </radialGradient>
        <radialGradient id="strawbRed" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FF7582"/>
          <stop offset="50%" stop-color="#D9142A"/>
          <stop offset="100%" stop-color="#730514"/>
        </radialGradient>
        <filter id="cakeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#1C050B" flood-opacity="0.45"/>
        </filter>
      </defs>

      <g filter="url(#cakeGlow)">
        <!-- Pedestal / Stand Base -->
        <ellipse cx="300" cy="510" rx="190" ry="24" fill="url(#goldPlate)"/>
        <path d="M 285 510 L 280 540 L 320 540 L 315 510 Z" fill="#CA8B4A"/>
        <ellipse cx="300" cy="542" rx="90" ry="14" fill="url(#goldPlate)"/>

        <!-- Tier 1: Bottom Chocolate Layer -->
        <path d="M 140 430 Q 300 470 460 430 L 460 480 Q 300 520 140 480 Z" fill="url(#chocBase)"/>
        <ellipse cx="300" cy="430" rx="160" ry="32" fill="#4A1525"/>
        <!-- Tier 1 Cream swirl rim -->
        <path d="M 140 430 C 180 445 220 440 260 448 C 300 455 340 442 380 448 C 420 440 445 435 460 430 C 445 425 420 420 380 415 C 340 410 300 415 260 412 C 220 410 180 420 140 430 Z" fill="url(#creamLayer)" opacity="0.95"/>

        <!-- Tier 2: Velvet Middle Layer -->
        <path d="M 180 340 Q 300 375 420 340 L 420 405 Q 300 440 180 405 Z" fill="#6A1024"/>
        <ellipse cx="300" cy="340" rx="120" ry="26" fill="#80152D"/>
        <!-- Drip lines Tier 2 -->
        <path d="M 182 345 C 190 370 200 370 208 348 C 218 380 230 380 238 350 C 255 385 270 385 285 352 C 305 388 320 388 338 352 C 355 385 370 385 388 348 C 400 375 410 375 418 345" fill="none" stroke="#240008" stroke-width="6" stroke-linecap="round"/>

        <!-- Tier 3: Top Gateau Layer -->
        <path d="M 220 250 Q 300 280 380 250 L 380 315 Q 300 345 220 315 Z" fill="url(#chocBase)"/>
        <ellipse cx="300" cy="250" rx="80" ry="20" fill="#3B0813"/>

        <!-- Rich Glossy Ganache Mirror Top -->
        <ellipse cx="300" cy="248" rx="76" ry="18" fill="#1C050B"/>
        <ellipse cx="280" cy="244" rx="55" ry="10" fill="#4A1525" opacity="0.6"/>

        <!-- Cream Rosettes around Top -->
        <circle cx="235" cy="248" r="12" fill="url(#creamLayer)"/>
        <circle cx="260" cy="256" r="13" fill="url(#creamLayer)"/>
        <circle cx="290" cy="260" r="14" fill="url(#creamLayer)"/>
        <circle cx="320" cy="258" r="14" fill="url(#creamLayer)"/>
        <circle cx="348" cy="254" r="13" fill="url(#creamLayer)"/>
        <circle cx="365" cy="246" r="12" fill="url(#creamLayer)"/>

        <!-- Toppings: Strawberries & Cherries -->
        <!-- Center Giant Strawberry -->
        <path d="M 285 205 C 285 190 315 190 315 205 C 320 230 300 248 300 248 C 300 248 280 230 285 205 Z" fill="url(#strawbRed)"/>
        <!-- Strawberry green leaves -->
        <path d="M 300 192 L 288 198 L 296 204 L 300 192 L 304 204 L 312 198 Z" fill="#2E7D32"/>
        <circle cx="295" cy="215" r="1.5" fill="#FFE088"/>
        <circle cx="305" cy="218" r="1.5" fill="#FFE088"/>
        <circle cx="292" cy="226" r="1.5" fill="#FFE088"/>
        <circle cx="302" cy="230" r="1.5" fill="#FFE088"/>

        <!-- Left Cherry -->
        <circle cx="265" cy="235" r="15" fill="url(#cherryRed)"/>
        <ellipse cx="260" cy="230" rx="4" ry="2" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 260 230)"/>
        <path d="M 265 222 C 270 200 285 195 292 190" fill="none" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round"/>

        <!-- Right Cherry -->
        <circle cx="335" cy="238" r="14" fill="url(#cherryRed)"/>
        <ellipse cx="331" cy="233" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 331 233)"/>
        <path d="M 335 225 C 330 202 310 195 296 190" fill="none" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round"/>

        <!-- Gold Leaf & Shimmer Accents -->
        <polygon points="250,335 255,340 248,343 252,338" fill="#FFE088"/>
        <polygon points="350,345 356,350 348,354 353,348" fill="#FFE088"/>
        <polygon points="210,420 216,425 208,429 214,423" fill="#FFE088"/>
        <polygon points="390,428 396,433 388,437 394,431" fill="#FFE088"/>
      </g>
    </svg>
  `,

  'flour': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="flourBag" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FDFBF7"/>
          <stop offset="70%" stop-color="#EADBCC"/>
          <stop offset="100%" stop-color="#C4B09A"/>
        </radialGradient>
        <linearGradient id="woodScoop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D7A15C"/>
          <stop offset="100%" stop-color="#8D5B28"/>
        </linearGradient>
      </defs>
      <!-- Sack Body -->
      <path d="M 120 180 Q 90 280 110 320 Q 200 350 290 320 Q 310 280 280 180 Z" fill="url(#flourBag)"/>
      <!-- Sack Rim and Fold -->
      <ellipse cx="200" cy="180" rx="85" ry="24" fill="#C4B09A"/>
      <ellipse cx="200" cy="176" rx="80" ry="20" fill="#FFFFFF"/>
      <!-- Soft Flour Mound -->
      <ellipse cx="200" cy="172" rx="72" ry="22" fill="#FFFFFF"/>
      <path d="M 160 172 Q 200 150 240 172 Q 200 178 160 172 Z" fill="#F7F3ED"/>
      <!-- Wooden Scoop -->
      <g transform="rotate(35 250 140)">
        <path d="M 230 130 C 230 110 270 110 270 130 L 265 170 C 265 180 235 180 235 170 Z" fill="url(#woodScoop)"/>
        <rect x="245" y="70" width="10" height="60" rx="5" fill="#8D5B28"/>
        <!-- Flour in scoop -->
        <ellipse cx="250" cy="140" rx="14" ry="20" fill="#FFFFFF"/>
      </g>
      <!-- Floating Flour Dust Particles -->
      <circle cx="100" cy="150" r="4" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="120" cy="120" r="6" fill="#FFFFFF" opacity="0.6"/>
      <circle cx="280" cy="110" r="5" fill="#FFFFFF" opacity="0.7"/>
      <circle cx="310" cy="140" r="7" fill="#FFFFFF" opacity="0.5"/>
      <circle cx="190" cy="100" r="4" fill="#FFFFFF" opacity="0.8"/>
    </svg>
  `,

  'butter': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <linearGradient id="butterTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF5BE"/>
          <stop offset="100%" stop-color="#FCD34D"/>
        </linearGradient>
        <linearGradient id="butterSide" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FBBF24"/>
          <stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
        <linearGradient id="butterFront" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#FBBF24"/>
        </linearGradient>
      </defs>
      <!-- Ceramic Butter Dish Plate -->
      <ellipse cx="200" cy="270" rx="140" ry="40" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="4"/>
      <!-- Butter Block (Isometric) -->
      <!-- Top Face -->
      <polygon points="190,140 280,180 210,215 120,175" fill="url(#butterTop)"/>
      <!-- Right Side -->
      <polygon points="280,180 280,240 210,275 210,215" fill="url(#butterSide)"/>
      <!-- Left Side -->
      <polygon points="120,175 210,215 210,275 120,235" fill="url(#butterFront)"/>
      <!-- Soft Butter Curl on top -->
      <path d="M 170 170 Q 200 145 220 160 Q 205 180 185 172 Z" fill="#FEF08A" stroke="#F59E0B" stroke-width="1.5"/>
      <path d="M 180 165 Q 210 150 215 162" fill="none" stroke="#FBBF24" stroke-width="2"/>
    </svg>
  `,

  'eggs': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="eggBrown" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#F8E5D0"/>
          <stop offset="40%" stop-color="#D7A87E"/>
          <stop offset="100%" stop-color="#9C663B"/>
        </radialGradient>
        <radialGradient id="eggYolk" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="40%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#D97706"/>
        </radialGradient>
      </defs>
      <!-- Whole Egg -->
      <g transform="rotate(-15 150 230)">
        <ellipse cx="150" cy="230" rx="60" ry="85" fill="url(#eggBrown)"/>
        <ellipse cx="135" cy="190" rx="14" ry="24" fill="#FFFFFF" opacity="0.35" transform="rotate(-10 135 190)"/>
      </g>
      <!-- Cracked Egg / Open Half -->
      <g transform="translate(60, 20)">
        <ellipse cx="200" cy="260" rx="65" ry="40" fill="#FFFFFF" opacity="0.4"/>
        <circle cx="200" cy="255" r="32" fill="url(#eggYolk)"/>
        <circle cx="190" cy="245" r="7" fill="#FFFFFF" opacity="0.6"/>
        <!-- Cracked Shell Half -->
        <path d="M 160 210 Q 150 250 200 270 Q 230 250 220 210 Q 210 220 200 210 Q 190 220 180 210 Q 170 220 160 210 Z" fill="url(#eggBrown)"/>
      </g>
    </svg>
  `,

  'milk': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#E0F2FE" stop-opacity="0.8"/>
          <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.9"/>
          <stop offset="70%" stop-color="#F8FAFC" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#BAE6FD" stop-opacity="0.8"/>
        </linearGradient>
      </defs>
      <!-- Glass Milk Bottle -->
      <path d="M 160 110 L 240 110 L 240 150 L 265 200 L 265 320 Q 265 340 240 340 L 160 340 Q 135 340 135 320 L 135 200 L 160 150 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="3"/>
      <!-- Bottle Cap -->
      <ellipse cx="200" cy="110" rx="42" ry="10" fill="#CA8B4A"/>
      <rect x="158" y="98" width="84" height="12" rx="4" fill="#CA8B4A"/>
      <!-- Pure White Milk Fill -->
      <path d="M 140 205 L 260 205 L 260 318 Q 260 334 240 334 L 160 334 Q 140 334 140 318 Z" fill="#FFFFFF"/>
      <ellipse cx="200" cy="205" rx="60" ry="12" fill="#F1F5F9"/>
      <!-- Milk Droplets Splash -->
      <circle cx="280" cy="170" r="6" fill="#FFFFFF"/>
      <circle cx="300" cy="150" r="4" fill="#FFFFFF"/>
      <path d="M 280 220 Q 310 230 300 240 Q 285 240 280 220 Z" fill="#FFFFFF"/>
    </svg>
  `,

  'cocoa': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="cocoaPowder" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#6B341B"/>
          <stop offset="60%" stop-color="#451A08"/>
          <stop offset="100%" stop-color="#240D04"/>
        </radialGradient>
        <radialGradient id="bowlGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#A88B79"/>
          <stop offset="100%" stop-color="#52433B"/>
        </radialGradient>
      </defs>
      <!-- Rustic Ceramic Bowl -->
      <ellipse cx="200" cy="260" rx="120" ry="45" fill="#312520"/>
      <path d="M 80 230 C 80 310 320 310 320 230 Z" fill="url(#bowlGrad)"/>
      <ellipse cx="200" cy="230" rx="120" ry="40" fill="#3D2E28"/>
      <!-- Cocoa Powder Heap -->
      <ellipse cx="200" cy="225" rx="110" ry="34" fill="url(#cocoaPowder)"/>
      <path d="M 130 225 Q 200 170 270 225 Z" fill="#5A2712"/>
      <!-- Cocoa Pod Slice / Beans nearby -->
      <ellipse cx="140" cy="300" rx="20" ry="12" fill="#38180A" transform="rotate(-25 140 300)"/>
      <ellipse cx="260" cy="300" rx="22" ry="14" fill="#38180A" transform="rotate(20 260 300)"/>
    </svg>
  `,

  'sugar': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#F1F5F9"/>
        </linearGradient>
        <linearGradient id="cubeSide" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#E2E8F0"/>
          <stop offset="100%" stop-color="#CBD5E1"/>
        </linearGradient>
      </defs>
      <!-- Sugar Cube 1 (Front Center) -->
      <g transform="translate(130, 180)">
        <polygon points="50,10 90,30 50,50 10,30" fill="url(#cubeTop)"/>
        <polygon points="90,30 90,75 50,95 50,50" fill="url(#cubeSide)"/>
        <polygon points="10,30 50,50 50,95 10,75" fill="#E2E8F0"/>
      </g>
      <!-- Sugar Cube 2 (Right Behind) -->
      <g transform="translate(190, 140)">
        <polygon points="50,10 90,30 50,50 10,30" fill="url(#cubeTop)"/>
        <polygon points="90,30 90,75 50,95 50,50" fill="url(#cubeSide)"/>
        <polygon points="10,30 50,50 50,95 10,75" fill="#E2E8F0"/>
      </g>
      <!-- Sugar Cube 3 (Left Behind) -->
      <g transform="translate(90, 150) rotate(-15 50 50)">
        <polygon points="50,10 90,30 50,50 10,30" fill="url(#cubeTop)"/>
        <polygon points="90,30 90,75 50,95 50,50" fill="url(#cubeSide)"/>
        <polygon points="10,30 50,50 50,95 10,75" fill="#E2E8F0"/>
      </g>
      <!-- Sparkling Crystals -->
      <polygon points="210,120 214,124 218,120 214,116" fill="#F8FAFC"/>
      <polygon points="290,190 293,194 297,190 293,186" fill="#F8FAFC"/>
      <polygon points="110,250 113,253 117,250 113,247" fill="#F8FAFC"/>
    </svg>
  `,

  'strawberry': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="strawbBody" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FF5C6E"/>
          <stop offset="45%" stop-color="#E11D48"/>
          <stop offset="85%" stop-color="#9F1239"/>
          <stop offset="100%" stop-color="#4C0519"/>
        </radialGradient>
      </defs>
      <!-- Berry Heart Shape -->
      <path d="M 140 160 C 130 90 270 90 260 160 C 255 240 200 320 200 320 C 200 320 145 240 140 160 Z" fill="url(#strawbBody)"/>
      <!-- Glossy Highlight -->
      <ellipse cx="170" cy="150" rx="18" ry="32" fill="#FFFFFF" opacity="0.3" transform="rotate(-20 170 150)"/>
      <!-- Seeds Pattern -->
      <g fill="#FEF08A">
        <ellipse cx="180" cy="160" rx="2.5" ry="4" transform="rotate(10 180 160)"/>
        <ellipse cx="210" cy="155" rx="2.5" ry="4" transform="rotate(-10 210 155)"/>
        <ellipse cx="165" cy="195" rx="2.5" ry="4" transform="rotate(15 165 195)"/>
        <ellipse cx="200" cy="190" rx="2.5" ry="4"/>
        <ellipse cx="230" cy="190" rx="2.5" ry="4" transform="rotate(-15 230 190)"/>
        <ellipse cx="180" cy="230" rx="2.5" ry="4" transform="rotate(10 180 230)"/>
        <ellipse cx="215" cy="225" rx="2.5" ry="4" transform="rotate(-10 215 225)"/>
        <ellipse cx="195" cy="265" rx="2" ry="3.5"/>
      </g>
      <!-- Crown Leaves -->
      <path d="M 200 110 L 160 120 L 180 95 L 200 110 L 220 95 L 240 120 Z" fill="#15803D"/>
      <path d="M 200 110 Q 200 70 215 65" fill="none" stroke="#166534" stroke-width="5" stroke-linecap="round"/>
    </svg>
  `,

  'cherry': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="cherryBall" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FF4D6D"/>
          <stop offset="40%" stop-color="#C9184A"/>
          <stop offset="85%" stop-color="#590D22"/>
          <stop offset="100%" stop-color="#2B050E"/>
        </radialGradient>
      </defs>
      <!-- Stems -->
      <path d="M 150 240 C 140 160 210 120 220 70" fill="none" stroke="#4D7C0F" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 250 250 C 240 170 220 120 220 70" fill="none" stroke="#4D7C0F" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Small Leaf at Stem Top -->
      <path d="M 220 70 Q 260 60 250 85 Q 230 85 220 70 Z" fill="#65A30D"/>

      <!-- Left Cherry -->
      <circle cx="145" cy="250" r="50" fill="url(#cherryBall)"/>
      <ellipse cx="130" cy="230" rx="14" ry="7" fill="#FFFFFF" opacity="0.6" transform="rotate(-35 130 230)"/>

      <!-- Right Cherry -->
      <circle cx="255" cy="265" r="48" fill="url(#cherryBall)"/>
      <ellipse cx="242" cy="245" rx="13" ry="6" fill="#FFFFFF" opacity="0.6" transform="rotate(-35 242 245)"/>
    </svg>
  `,

  'chocolate-chips': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="chipGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#4A1E0E"/>
          <stop offset="60%" stop-color="#260C04"/>
          <stop offset="100%" stop-color="#120400"/>
        </radialGradient>
      </defs>
      <!-- Center Chip -->
      <path d="M 160 260 C 130 260 130 220 175 160 C 190 140 210 140 215 160 C 260 220 260 260 230 260 Z" fill="url(#chipGrad)"/>
      <path d="M 195 155 Q 185 200 160 240" fill="none" stroke="#6C331E" stroke-width="3" opacity="0.6"/>

      <!-- Left Small Chip -->
      <g transform="translate(60, 20) rotate(-20 100 240)">
        <path d="M 90 260 C 70 260 70 230 100 190 C 110 175 125 175 130 190 C 160 230 160 260 140 260 Z" fill="url(#chipGrad)"/>
      </g>

      <!-- Right Small Chip -->
      <g transform="translate(180, 40) rotate(15 100 240)">
        <path d="M 90 260 C 70 260 70 230 100 190 C 110 175 125 175 130 190 C 160 230 160 260 140 260 Z" fill="url(#chipGrad)"/>
      </g>
    </svg>
  `,

  'vanilla': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <linearGradient id="podGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2E170E"/>
          <stop offset="50%" stop-color="#4A2518"/>
          <stop offset="100%" stop-color="#1A0C06"/>
        </linearGradient>
      </defs>
      <!-- Curved Vanilla Pod 1 -->
      <path d="M 100 320 C 150 280 200 200 300 100" fill="none" stroke="url(#podGrad)" stroke-width="12" stroke-linecap="round"/>
      <!-- Curved Vanilla Pod 2 -->
      <path d="M 120 330 C 170 290 210 190 280 90" fill="none" stroke="url(#podGrad)" stroke-width="10" stroke-linecap="round"/>
      <!-- Vanilla Orchid Flower -->
      <g transform="translate(180, 180)">
        <!-- Petals -->
        <ellipse cx="0" cy="-35" rx="16" ry="32" fill="#FEF9C3" stroke="#FDE047" stroke-width="1.5"/>
        <ellipse cx="32" cy="-10" rx="16" ry="32" fill="#FEF9C3" stroke="#FDE047" stroke-width="1.5" transform="rotate(72 32 -10)"/>
        <ellipse cx="20" cy="30" rx="16" ry="32" fill="#FEF9C3" stroke="#FDE047" stroke-width="1.5" transform="rotate(144 20 30)"/>
        <ellipse cx="-20" cy="30" rx="16" ry="32" fill="#FEF9C3" stroke="#FDE047" stroke-width="1.5" transform="rotate(216 -20 30)"/>
        <ellipse cx="-32" cy="-10" rx="16" ry="32" fill="#FEF9C3" stroke="#FDE047" stroke-width="1.5" transform="rotate(288 -32 -10)"/>
        <!-- Golden Center -->
        <circle cx="0" cy="0" r="10" fill="#EAB308"/>
      </g>
    </svg>
  `,

  'nuts': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="hazelnut" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#D97706"/>
          <stop offset="50%" stop-color="#92400E"/>
          <stop offset="100%" stop-color="#451A03"/>
        </radialGradient>
        <linearGradient id="almond" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDE68A"/>
          <stop offset="60%" stop-color="#D97706"/>
          <stop offset="100%" stop-color="#78350F"/>
        </linearGradient>
      </defs>
      <!-- Hazelnut (Left) -->
      <circle cx="150" cy="220" r="45" fill="url(#hazelnut)"/>
      <ellipse cx="150" cy="180" rx="20" ry="8" fill="#B45309"/>

      <!-- Whole Almond (Right) -->
      <g transform="translate(240, 210) rotate(-35)">
        <path d="M 0 -45 C 35 -20 35 30 0 50 C -35 30 -35 -20 0 -45 Z" fill="url(#almond)"/>
        <path d="M 0 -35 Q 10 0 0 35" fill="none" stroke="#78350F" stroke-width="2" opacity="0.6"/>
      </g>

      <!-- Walnut Half (Center Below) -->
      <g transform="translate(195, 275)">
        <ellipse cx="0" cy="0" rx="35" ry="25" fill="#B45309"/>
        <path d="M -20 -10 Q 0 -15 20 -10 Q 15 15 -20 -10 Z" fill="#78350F"/>
        <path d="M -20 5 Q 0 15 20 5 Q 15 -15 -20 5 Z" fill="#92400E"/>
      </g>
    </svg>
  `
};

(async () => {
  console.log('Generating transparent PNG assets in:', outDir);
  for (const [name, svgContent] of Object.entries(assets)) {
    const pngPath = path.join(outDir, `${name}.png`);
    const svgBuffer = Buffer.from(svgContent.trim());
    const size = name === 'cake-main' ? 600 : 400;
    
    await sharp(svgBuffer)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(pngPath);
      
    const stat = fs.statSync(pngPath);
    console.log(`Generated ${name}.png (${stat.size} bytes)`);
  }
  console.log('All 12 assets generated successfully!');
})();
