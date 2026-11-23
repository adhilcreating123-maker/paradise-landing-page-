'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import CustomCakePreview from '../../components/CustomCakePreview';
import CakeDisplayCooler from '../../components/CakeDisplayCooler';
import SectionDecor from '../../components/SectionDecor';

interface CakeItem {
  id: string;
  name: string;
  displayName: string;
  pricePerKg: number;
  img: string;
  flavourDefault: string;
  category: string;
  inStock: boolean;
  desc: string;
}

const showcaseCakesData: Record<string, CakeItem> = {
  'red-velvet': {
    id: 'red-velvet',
    name: 'Red velvet',
    displayName: 'Red Velvet Rose',
    pricePerKg: 750,
    img: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    flavourDefault: 'Chocolate',
    category: 'Signature Gateaux',
    inStock: true,
    desc: 'Silky cream cheese frosting layered with crimson velvet sponge and candied rose petals.'
  },
  'oreo-chocolate': {
    id: 'oreo-chocolate',
    name: 'Oreo chocolate',
    displayName: 'Oreo Chocolate',
    pricePerKg: 720,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    flavourDefault: 'Chocolate',
    category: 'Chocolate Indulgence',
    inStock: true,
    desc: 'Crushed Oreo cookies folded into airy dark cocoa cream and topped with cookie crunch.'
  },
  'royal-berry': {
    id: 'royal-berry',
    name: 'Royal berry',
    displayName: 'Royal Berry Gateau',
    pricePerKg: 780,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmkwJlOtwpTejVrfn6AOCsRYjXVIHX0EbIcnG-uKHM5jPqZd-E4QEwm2RkO8YIcaP2Bphjrp25pyIdDpsGnanUQHpogmwgOblQN75Dfc83AaY9rSD8TJIgxdbTlen-ePt662k-zCnbwR0WXLOI-jSbAaTyXEyGt43BxzdKQM8029fIkr4phW6k_zoJHlf2vdhkkjX4Ak64K61MOwF2A4JUHDx5RvtOFuQ2uT-15dA',
    flavourDefault: 'Berry Coulis',
    category: 'Fruit & Berry',
    inStock: false,
    desc: 'Fresh raspberries, blackberries, and light chantilly cream over vanilla sponge.'
  },
  'ferrero-rocher': {
    id: 'ferrero-rocher',
    name: 'Ferrero rocher',
    displayName: 'Ferrero Rocher',
    pricePerKg: 850,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATITdLMaM3hyXu4wc63nNN1WYLfJDKGY96WiFvdUA6omMCYSjVn57ASKeCSdyloyvTTkkkWaaW3l7ASXMA-W5WYrGH3jpDTRY6as84hdxX8Zh_UoABYH-Hiz_ADZl5NKroeUfTbx-69UktczD5yIzd9LdFJc_7rcDFGeYFRfpWWcICPk30PosTlz2c6SATCmCpDIJ8bUGimOTzOLCVJxJWjBIjPk9ROee2V2foJ8I',
    flavourDefault: 'Hazelnut Praline',
    category: 'Chocolate Indulgence',
    inStock: true,
    desc: 'Toasted roasted hazelnut praline ganache, crushed wafer, and pure milk chocolate drizzle.'
  },
  'belgian-truffle': {
    id: 'belgian-truffle',
    name: 'Belgian truffle',
    displayName: 'Belgian Truffle',
    pricePerKg: 850,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    flavourDefault: 'Chocolate',
    category: 'Chocolate Indulgence',
    inStock: true,
    desc: '70% dark Belgian chocolate ganache melted into moist fudge sponge with gold leaf dusting.'
  },
  'black-forest': {
    id: 'black-forest',
    name: 'Black forest',
    displayName: 'Black Forest',
    pricePerKg: 680,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmkwJlOtwpTejVrfn6AOCsRYjXVIHX0EbIcnG-uKHM5jPqZd-E4QEwm2RkO8YIcaP2Bphjrp25pyIdDpsGnanUQHpogmwgOblQN75Dfc83AaY9rSD8TJIgxdbTlen-ePt662k-zCnbwR0WXLOI-jSbAaTyXEyGt43BxzdKQM8029fIkr4phW6k_zoJHlf2vdhkkjX4Ak64K61MOwF2A4JUHDx5RvtOFuQ2uT-15dA',
    flavourDefault: 'Chocolate',
    category: 'Signature Gateaux',
    inStock: true,
    desc: 'Classic Kirsch-soaked cherries, whipped fresh dairy cream, and shaved bitter chocolate.'
  },
  'dark-truffle': {
    id: 'dark-truffle',
    name: 'Dark truffle',
    displayName: 'Dark Truffle Noir',
    pricePerKg: 760,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    flavourDefault: 'Chocolate',
    category: 'Chocolate Indulgence',
    inStock: true,
    desc: 'Intense 80% single-origin dark cocoa, dense truffle layers, and velvety chocolate glaze.'
  },
  'salted-caramel': {
    id: 'salted-caramel',
    name: 'Salted caramel crunch',
    displayName: 'Salted Caramel Crunch',
    pricePerKg: 720,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATITdLMaM3hyXu4wc63nNN1WYLfJDKGY96WiFvdUA6omMCYSjVn57ASKeCSdyloyvTTkkkWaaW3l7ASXMA-W5WYrGH3jpDTRY6as84hdxX8Zh_UoABYH-Hiz_ADZl5NKroeUfTbx-69UktczD5yIzd9LdFJc_7rcDFGeYFRfpWWcICPk30PosTlz2c6SATCmCpDIJ8bUGimOTzOLCVJxJWjBIjPk9ROee2V2foJ8I',
    flavourDefault: 'Vanilla Bean',
    category: 'Exotic & Premium',
    inStock: true,
    desc: 'Slow-simmered artisanal amber caramel, Himalayan sea salt flakes, and butter crisp pearls.'
  },
  'chocolate-dream': {
    id: 'chocolate-dream',
    name: 'Chocolate Dream',
    displayName: 'Chocolate Dream',
    pricePerKg: 450,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    flavourDefault: 'Chocolate',
    category: 'Chocolate Indulgence',
    inStock: true,
    desc: 'Rich chocolate sponge layered with whipped cocoa cream, silky fudge frosting, and delicate chocolate curls.'
  },
  'dark-chocolate-opera': {
    id: 'dark-chocolate-opera',
    name: 'Dark chocolate opera',
    displayName: 'Dark Chocolate Opera',
    pricePerKg: 980,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuRinQauLcOunev2Vv8FPwj_JYvP6FRUwb087T6nEJnv713Db5r5m-CgfdPXcxTr9mc5m8BBp7B65tXKBcHxTGIfcXd9fragnV80-TEPWXL8hf2MnhXjZ8sP2-r82p7rtv_DYDo9GDdxyQ1t7I4mxh-mve94RWHVsFAn0zm2krgmXa7o6J2ip2sQZT-PrIb6FSFn3g0LDWFRmVB76pe_ctrhUBjo_Do5YoDSKtiaI',
    flavourDefault: 'Espresso Chocolate',
    category: 'Chocolate Indulgence',
    inStock: true,
    desc: 'French almond Joconde sponge soaked in espresso syrup, layered with dark chocolate ganache and coffee buttercream.'
  },
  'red-velvet-romance': {
    id: 'red-velvet-romance',
    name: 'Red velvet romance',
    displayName: 'Red Velvet Romance',
    pricePerKg: 800,
    img: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    flavourDefault: 'Cream Cheese',
    category: 'Signature Gateaux',
    inStock: true,
    desc: 'Velvety crimson sponge layered with light mascarpone cream, raspberry reduction, and fresh red berries.'
  },
  'white-choco-rose': {
    id: 'white-choco-rose',
    name: 'White choco vanilla',
    displayName: 'White Choco Vanilla',
    pricePerKg: 720,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr16didSxpZglgEBDAu49QDXuu6pPhactZPVs37UdT2-GMLsz5fxZd5sBeynL0JLMo5ip3PqButXbl0aSJQu9fhiumnbC0wLACmDfZTRl2ouaj26MAkGDWysz_kvHfiBEPkq3ioEIDdL3h1G2HN9x9fqPIunhTVi_-gMAF4sVLgNbJVeIMGVByv-U_2cZ_V2iL8-Dl2f5U4uPhkfQWuIjog8EiHrGbgFzl_3qSjew',
    flavourDefault: 'Vanilla Bean',
    category: 'Exotic & Premium',
    inStock: true,
    desc: 'Bourbon vanilla bean mousse with white chocolate curls, toasted almond slivers, and delicate sugar rose pearls.'
  },
  'butterscotch-praline': {
    id: 'butterscotch-praline',
    name: 'Butterscotch praline',
    displayName: 'Butterscotch Praline',
    pricePerKg: 680,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6ZgdjbRHd00azo2QU_GUCN2jXgmrHHHH0KpICxYroBMkHqvo2BdezRIjpP6it5q_OltftWGNZP5gDpwAKXwRBBiecmzebe7TBaIDgqCpD_KC6XSiACmB0U2k92zVSs58tx0DQZhcu-SAVi5GMK-nlRSHXHNZoRyqxHTVO4Qu1e0Al33D7qdjc7ry0elW71iPeIUXHvR95bcCk-cr-IIPWF3-qRNUIPfwgngfIK2M',
    flavourDefault: 'Butterscotch',
    category: 'Exotic & Premium',
    inStock: true,
    desc: 'Handcrafted golden caramel crunch folded into velvety butterscotch cream and moist vanilla sponge.'
  },
  'strawberry-fraisier': {
    id: 'strawberry-fraisier',
    name: 'Strawberry fraisier',
    displayName: 'Strawberry Fraisier',
    pricePerKg: 820,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfgj--7Rwkzc74K_wTEMoNn5FpXMilVx9oRSnvbsO-syAAXkwgMh6RKKgiWrB0C3lBl1pH7RcJoWYhjKJEr9i6MqH3BvwWAodtpTX-964T0DL9PbKmDl9FVQ5iHUlX0hJqsYFbA3r3z3LTjs77PFVNqeYvf09Nt3_WraavL1-cZ8wH9t3OZpXStehyLsw7C_ktK5z4qO__ADVPrAHFRhtMMz4t1We2FV_C5JdTWk8',
    flavourDefault: 'Berry Coulis',
    category: 'Fruit & Berry',
    inStock: true,
    desc: 'Fresh farm strawberries nestled in rich mousseline cream between airy genoise sponge layers.'
  },
  'mango-mascarpone': {
    id: 'mango-mascarpone',
    name: 'Mango mascarpone',
    displayName: 'Mango Mascarpone Bliss',
    pricePerKg: 820,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBquuVBtB3Uk9gzsTLfrHvJOX_xB57h_nH1YFHBDZOHf7z8eKJpC1_o4eRY_9-7N0T2toZdilkqY3EaZYT6FMyh7osezVBv-M1neVDjyxWvwWJRdReP3eV9JNzvNkmR4pbg14byYETP976K2WyWtNYXCwvCgnO1o6Mzr3KJ1QQnQnKGePBUG5_MBzSYQDE0xXabNjpMXsEp3HtzVhouGjRRz3hO8PlX_1D6uT4q2J4',
    flavourDefault: 'Mango Cream',
    category: 'Fruit & Berry',
    inStock: true,
    desc: 'Sweet Alphonso mango coulis blended with silky Italian mascarpone over soft vanilla sponge.'
  },
  'lotus-biscoff': {
    id: 'lotus-biscoff',
    name: 'Lotus biscoff',
    displayName: 'Lotus Biscoff Crunch',
    pricePerKg: 950,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD__69QRCD_hN1fEkrEgm6DzMKi3MbTTsJmGkUplVrFd_QhsmW7GNRehvYAfsbj0kq4doz95kd10zXZ2KDB7PLIKBxFGnm86Q7lYGZJf_mE8z6fAMQi2Ry_wkA0JTfJkcqt6s4U8VJiAmOg-4EDJEZ0R1iaEub6DvF8uz4qOe_XZic0Dr2PjLLxqqZofe8hRqz1lU-0aXzKFIShAHfRFZ_R3EL-6koongt21yd8sNM',
    flavourDefault: 'Biscoff',
    category: 'Exotic & Premium',
    inStock: true,
    desc: 'Spiced Belgian speculoos cookie spread layered with whipped dairy cream and crunchy Biscoff crumbs.'
  }
};

// Official branch phone numbers as used across the site (country code + number, digits only).
const branchWhatsappNumbers: Record<string, string> = {
  'Olavanna Branch': '919744242477',
  'Kattukulangara Branch': '919846772424',
  'Kulangarapeedika Branch': '919946777707',
};

const whatsappLink = (branch: string, text: string) => {
  const number = branchWhatsappNumbers[branch];
  return `https://wa.me/${number || ''}?text=${encodeURIComponent(text)}`;
};

export default function CakeShowcasePage() {
  const [viewMode, setViewMode] = useState<'shelf' | 'full'>('shelf');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Cakes');

  const [currentCakeKey, setCurrentCakeKey] = useState('red-velvet');
  const [currentWeight, setCurrentWeight] = useState(1.0);
  const [selectedFlavour, setSelectedFlavour] = useState('Chocolate');
  const [selectedBranch, setSelectedBranch] = useState('Olavanna Branch');
  const [cakeMessage, setCakeMessage] = useState('');
  const [pickupTime, setPickupTime] = useState('Today, 5:00 PM');

  const [customShape, setCustomShape] = useState('Round');
  const [customFlavour, setCustomFlavour] = useState('Belgian Chocolate');
  const [customLayers, setCustomLayers] = useState('2-Tier');
  const [customSize, setCustomSize] = useState('1.5 kg');
  const [customTheme, setCustomTheme] = useState('Royal Burgundy & Gold');
  const [customTopper, setCustomTopper] = useState("Acrylic 'Happy Birthday'");
  const [customMessage, setCustomMessage] = useState('');
  const [customBranch, setCustomBranch] = useState('Olavanna Branch');
  const [customPhoto, setCustomPhoto] = useState<{ url: string; name: string } | null>(null);
  const [customPhotoError, setCustomPhotoError] = useState('');

  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const customPhotoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!customPhoto) return;
    return () => URL.revokeObjectURL(customPhoto.url);
  }, [customPhoto]);

  const clearCustomPhoto = () => {
    setCustomPhoto(null);
    setCustomPhotoError('');
    if (customPhotoInputRef.current) customPhotoInputRef.current.value = '';
  };

  const handleCustomPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setCustomPhotoError('');
    if (!file) {
      setCustomPhoto(null);
      return;
    }
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setCustomPhotoError('Choose a JPG, PNG, or WebP image under 10 MB.');
      event.target.value = '';
      setCustomPhoto(null);
      return;
    }
    setCustomPhoto({ url: URL.createObjectURL(file), name: file.name });
  };

  const currentCake = showcaseCakesData[currentCakeKey] || showcaseCakesData['red-velvet'];
  const calculatedReadyMadePrice = Math.round(currentCake.pricePerKg * currentWeight);

  const handleSelectCake = (key: string) => {
    setCurrentCakeKey(key);
    const detailPanel = document.getElementById('cake-detail-panel');
    if (detailPanel) {
      detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSendReadyMadeWhatsApp = () => {
    const waText = `Hi Paradise Bakes, I’d like to order a ready-made cake:
Cake: ${currentCake.displayName}
Weight: ${currentWeight} kg
Flavour: ${selectedFlavour}
Message on cake: ${cakeMessage.trim() || 'None'}
Pickup: ${pickupTime} at ${selectedBranch}
Total: ₹${calculatedReadyMadePrice}
Please confirm availability. Thank you!`;

    window.open(whatsappLink(selectedBranch, waText), '_blank', 'noopener,noreferrer');
  };

  const handleSendCustomWhatsApp = () => {
    const waCustomText = `Hi Paradise Bakes, I’d like a custom cake:
Shape: ${customShape}
Flavour: ${customFlavour}
Layers: ${customLayers}
Size: ${customSize}
Theme: ${customTheme}
Topper: ${customTopper}
Message on cake: ${customMessage.trim() || 'None'}
Preferred branch: ${customBranch}
Reference photo: ${customPhoto ? `${customPhoto.name} (I will send the image in this chat)` : 'None'}
Please confirm the price and availability. Thank you!`;

    window.open(whatsappLink(customBranch, waCustomText), '_blank', 'noopener,noreferrer');
  };

  const handleSlideGallery = (direction: 'prev' | 'next') => {
    if (!galleryTrackRef.current) return;
    const scrollAmount = 320;
    if (direction === 'prev') {
      galleryTrackRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      galleryTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(() => {
      if (!galleryTrackRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = galleryTrackRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        galleryTrackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        galleryTrackRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#1c1c18] font-sans antialiased overflow-x-clip selection:bg-[#E3A04B] selection:text-[#5C0302]">
      
{/*  Top Navigation Header  */}
<header data-enter="header" className="fixed top-0 w-full z-50 bg-[#F2E4C9]/95 backdrop-blur-md border-b border-[#5C0302]/10 shadow-[0_2px_12px_rgba(92,3,2,0.04)]">
<div className="h-14 md:h-20 site-shell flex items-center justify-between">
<Link href="/" className="flex items-center gap-2.5 md:gap-3 cursor-pointer group" aria-label="Paradise Bakes Home">
<img alt="Paradise Bakes Logo" className="h-7 md:h-9 w-auto object-contain group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbIJQ9q5HItsy5kHpd-U3FaTdlhX8eo3-kV3mvdWE4mIg63fXYENU1EVIk9hDT8nOdBSEQLc_WGtgQfZeBDXNi4hygJRrvBZQtkr8wUs0trGcjfc77MoiCiB9DAsduj7h5J6Q50UB81OuF2KGuMViEGLeOW4lJDTeR7iswAGQXI9SbZVLKIR6HArFvDZm09BjG0zCx1JqON2eyY3_imJFASYc2aqtZfobFtZLAdijcEUsgTob0Sva5" />
<span className="font-['Playfair_Display',serif] text-lg md:text-xl font-bold tracking-wide text-[#5C0302] group-hover:text-[#9A1C20] transition-colors">Paradise Bakes</span>
</Link>
<nav className="hidden md:flex items-center gap-7">
<Link className="text-sm font-medium text-[#5C0302]/80 hover:text-[#5C0302] transition-colors" href="/">Home</Link>

<a aria-current="page" className="text-sm font-bold bg-[#9A1C20] text-[#FDF2D8] rounded-full px-4 py-1.5 shadow-sm transition-all" href="/cake-world">Our Cake World</a>
<a className="text-sm font-medium text-[#5C0302]/80 hover:text-[#5C0302] transition-colors" href="#custom-builder">CUSTOM</a>
<a className="text-sm font-medium text-[#5C0302]/80 hover:text-[#5C0302] transition-colors" href="#cakes-we-have-made">MADE</a>
</nav>
<div className="flex items-center gap-3">
<div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#5C0302] text-[#FDF2D8] flex items-center justify-center shadow-inner cursor-pointer hover:bg-[#9A1C20] transition-colors">
<span className="material-symbols-outlined text-[17px] md:text-[19px]">person</span>
</div>
</div>
</div>
</header>
<main className="w-full pt-14 md:pt-20">
  {/* =========================================================================
      PARADISE BAKES — REFRIGERATED CAKE DISPLAY COOLER (REFERENCE INSPIRATION)
      ========================================================================= */}
  <CakeDisplayCooler
    onSelectCake={handleSelectCake}
    selectedCakeKey={currentCakeKey}
  />
{/*  3. CAKE DETAIL PANEL (Mobile View: ~640px compact layout with side-by-side branch/flavour & single swipeable rows)  */}
<section className="w-full bg-[#F2E4C9] text-[#5C0302] pt-3 md:pt-4 pb-12 md:pb-16 site-gutter relative border-t-4 border-[#CA8B4A]" id="cake-detail-panel">
<div className="relative -top-3 md:-top-4 flex justify-center mb-2 md:mb-4">
<div className="w-7 h-4 bg-[#5C0302] [clip-path:polygon(50%_100%,0_0,100%_0)] shadow-sm"></div>
</div>
{/* Mobile Drag Handle */}
<div className="w-12 h-1.5 bg-[#CA8B4A]/60 rounded-full mx-auto mb-3 block lg:hidden" />
<div data-parallax-depth="0.04" data-reveal="scale" className="max-w-6xl mx-auto bg-[#FDF2D8] rounded-2xl md:rounded-3xl border-2 border-[#CA8B4A]/60 p-4 sm:p-10 shadow-xl">
<div data-reveal-group className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
{/*  MOBILE ONLY: 160px cutout on circle  */}
<div className="block lg:hidden w-full flex flex-col items-center justify-center">
<div data-parallax-depth="-0.055" className="relative w-44 h-44 flex items-center justify-center">
<div className="w-40 h-40 rounded-full bg-[#E5D5B5] shadow-inner absolute"></div>
<img className="relative z-10 w-40 h-40 object-contain drop-shadow-[0_20px_25px_rgba(92,3,2,0.25)]" id="detail-cake-img-mobile" src={currentCake.img} alt={currentCake.displayName} />
</div>
</div>
{/*  LEFT COLUMN: Cake Details & Order Form (7 Cols)  */}
<div className="lg:col-span-7 space-y-4 md:space-y-6">
<div>
<div className="flex items-center gap-2 mb-1">
<div className="flex text-[#E3A04B]">
<span className="material-symbols-outlined text-sm md:text-lg fill-current">star</span>
<span className="material-symbols-outlined text-sm md:text-lg fill-current">star</span>
<span className="material-symbols-outlined text-sm md:text-lg fill-current">star</span>
<span className="material-symbols-outlined text-sm md:text-lg fill-current">star</span>
<span className="material-symbols-outlined text-sm md:text-lg fill-current">star_half</span>
</div>
<span className="text-[13px] font-semibold text-[#5C0302]/80">4.8 rating, 126 reviews</span>
</div>
<h2  className="text-2xl md:text-4xl font-['Playfair_Display',serif] font-bold text-[#5C0302]" id="detail-cake-name">{currentCake.displayName}</h2>
</div>
{/*  Price: 24px on mobile, 40px on desktop  */}
<div className="flex items-baseline gap-2">
<span className="text-2xl md:text-4xl font-['Playfair_Display',serif] font-bold text-[#9A1C20]" id="detail-cake-total-price">₹{calculatedReadyMadePrice}</span>
<span className="text-xs uppercase tracking-wider text-[#5C0302]/70 font-semibold">(<span  id="detail-cake-rate">₹{currentCake.pricePerKg}</span> / kg)</span>
</div>
<div className="flex items-center gap-2" id="detail-stock-indicator-wrap">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-semibold bg-[#CA8B4A]/20 border border-[#CA8B4A] text-[#5C0302]" id="detail-stock-pill"><span className="w-2 h-2 rounded-full bg-[#9A1C20] animate-pulse" id="detail-stock-dot"></span><span id="detail-stock-text">Only a few left</span></div>
<span className="text-[13px] font-semibold text-[#9A1C20]" id="detail-stock-alert">Only a few left today. Order early.</span>
</div>
{/*  Weight Selection: ONE row of 44px pills  */}
<div>
<label className="block text-xs uppercase tracking-wider font-bold text-[#5C0302] mb-1.5">Select Weight</label>
<div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap pb-1 flex-nowrap" >
<button onClick={() => setCurrentWeight(0.5)} className={`weight-pill min-h-[44px] px-4 py-2 rounded-full border border-[#CA8B4A]/60 font-semibold text-xs transition-all ${currentWeight === 0.5 ? 'bg-[#5C0302] text-[#FDF2D8]' : 'bg-[#F2E4C9] text-[#5C0302]'}`} type="button">0.5 kg</button>
<button onClick={() => setCurrentWeight(1)} className={`weight-pill min-h-[44px] px-4 py-2 rounded-full border border-[#CA8B4A]/60 font-semibold text-xs transition-all ${currentWeight === 1 ? 'bg-[#5C0302] text-[#FDF2D8]' : 'bg-[#F2E4C9] text-[#5C0302]'}`} type="button">1 kg</button>
<button onClick={() => setCurrentWeight(2)} className={`weight-pill min-h-[44px] px-4 py-2 rounded-full border border-[#CA8B4A]/60 font-semibold text-xs transition-all ${currentWeight === 2 ? 'bg-[#5C0302] text-[#FDF2D8]' : 'bg-[#F2E4C9] text-[#5C0302]'}`} type="button">2 kg</button>
<button onClick={() => setCurrentWeight(3)} className={`weight-pill min-h-[44px] px-4 py-2 rounded-full border border-[#CA8B4A]/60 font-semibold text-xs transition-all ${currentWeight === 3 ? 'bg-[#5C0302] text-[#FDF2D8]' : 'bg-[#F2E4C9] text-[#5C0302]'}`} type="button">3 kg</button>
</div>
</div>
{/*  Mobile Side-by-side Flavour & Pickup Branch (each ~165x48px on mobile)  */}
<div className="grid grid-cols-2 gap-3">
<div>
<label className="block text-[11px] md:text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1">Flavour</label>
<select className="w-full h-12 px-2.5 rounded-xl bg-[#FDF2D8] text-[#5C0302] font-medium text-xs border border-[#CA8B4A] focus:ring-2 focus:ring-[#9A1C20] focus:outline-none shadow-sm" id="detail-flavour-select" value={selectedFlavour} onChange={(e) => setSelectedFlavour(e.target.value)}>
<option defaultValue="true" value="Chocolate">Chocolate Ganache</option>
<option value="Vanilla Bean">Vanilla Bean</option>
<option value="Cream Cheese">Cream Cheese</option>
<option value="Berry Coulis">Berry Coulis</option>
</select>
</div>
<div>
<label className="block text-[11px] md:text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1">Pickup Branch</label>
<select className="w-full h-12 px-2.5 rounded-xl bg-[#FDF2D8] text-[#5C0302] font-medium text-xs border border-[#CA8B4A] focus:ring-2 focus:ring-[#9A1C20] focus:outline-none shadow-sm" id="detail-branch-select" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
<option value="Olavanna Branch">Olavanna Branch</option>
<option value="Kattukulangara Branch">Kattukulangara Branch</option>
<option value="Kulangarapeedika Branch">Kulangarapeedika Branch</option>
</select>
</div>
</div>
{/*  Message on Cake: 48px full width input  */}
<div>
<label className="block text-[11px] md:text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1">Message on Cake</label>
<input  className="w-full h-12 px-3 rounded-xl bg-[#FDF2D8] text-[#5C0302] font-medium text-xs border border-[#CA8B4A] focus:ring-2 focus:ring-[#9A1C20] focus:outline-none shadow-sm" id="detail-cake-message" type="text" value={cakeMessage} onChange={(e) => setCakeMessage(e.target.value)} />
</div>
{/*  Date & Time Picker: 48px full width input  */}
<div>
<label className="block text-[11px] md:text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1">Pickup Date &amp; Time</label>
<input  className="w-full h-12 px-3 rounded-xl bg-[#FDF2D8] text-[#5C0302] font-medium text-xs border border-[#CA8B4A] focus:ring-2 focus:ring-[#9A1C20] focus:outline-none shadow-sm" id="detail-pickup-time" type="text" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
</div>
{/*  "What's inside" Row of Outlined Pills in ONE swipeable row (32px)  */}
<div>
<label className="block text-[11px] md:text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1.5">What’s inside</label>
<div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 flex-nowrap" >
<span className="inline-flex items-center h-8 px-3 rounded-full text-xs font-medium bg-[#FDF2D8] border border-[#CA8B4A]/60 text-[#5C0302] whitespace-nowrap shadow-sm gap-1.5 flex-shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-[#CA8B4A]"></span>Fresh cream</span>
<span className="inline-flex items-center h-8 px-3 rounded-full text-xs font-medium bg-[#FDF2D8] border border-[#CA8B4A]/60 text-[#5C0302] whitespace-nowrap shadow-sm gap-1.5 flex-shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-[#CA8B4A]"></span>Cocoa</span>
<span className="inline-flex items-center h-8 px-3 rounded-full text-xs font-medium bg-[#FDF2D8] border border-[#CA8B4A]/60 text-[#5C0302] whitespace-nowrap shadow-sm gap-1.5 flex-shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-[#CA8B4A]"></span>Butter</span>
<span className="inline-flex items-center h-8 px-3 rounded-full text-xs font-medium bg-[#FDF2D8] border border-[#CA8B4A]/60 text-[#5C0302] whitespace-nowrap shadow-sm gap-1.5 flex-shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-[#CA8B4A]"></span>Eggs</span>
<span className="inline-flex items-center h-8 px-3 rounded-full text-xs font-medium bg-[#FDF2D8] border border-[#CA8B4A]/60 text-[#5C0302] whitespace-nowrap shadow-sm gap-1.5 flex-shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-[#CA8B4A]"></span>Flour</span>
<span className="inline-flex items-center h-8 px-3 rounded-full text-xs font-medium bg-[#FDF2D8] border border-[#CA8B4A]/60 text-[#5C0302] whitespace-nowrap shadow-sm gap-1.5 flex-shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-[#CA8B4A]"></span>Cherries</span>
</div>
</div>
<button onClick={handleSendReadyMadeWhatsApp} className="hidden sm:flex btn-shimmer w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-[#9A1C20] text-[#FDF2D8] hover:bg-[#801418] transition-all shadow-lg items-center justify-center gap-3 cursor-pointer" type="button">
<svg className="w-5 h-5 fill-current text-[#FDF2D8]" viewBox="0 0 24 24"><path d="M12.031 0C5.399 0 0 5.399 0 12.031c0 2.119.553 4.185 1.602 6.008L.069 24l6.133-1.609c1.765.962 3.766 1.47 5.829 1.47 6.632 0 12.031-5.399 12.031-12.03C24.062 5.399 18.663 0 12.031 0zm0 22.008c-1.802 0-3.568-.485-5.109-1.401l-.367-.218-3.797.997 1.014-3.702-.239-.381c-1.008-1.605-1.541-3.468-1.541-5.272 0-5.517 4.488-10.005 10.039-10.005 5.551 0 10.039 4.488 10.039 10.005 0 5.517-4.488 10.005-10.039 10.005zm5.503-7.519c-.302-.151-1.785-.88-2.062-.981-.277-.101-.479-.151-.681.151-.202.302-.782.981-.958 1.183-.176.202-.353.227-.655.076-.302-.151-1.275-.47-2.428-1.498-.898-.8-1.503-1.789-1.68-2.091-.176-.302-.019-.465.132-.616.136-.135.302-.353.454-.529.151-.176.202-.302.302-.504.101-.202.05-.378-.025-.529-.076-.151-.681-1.642-.933-2.25-.245-.592-.494-.512-.681-.521l-.579-.01c-.202 0-.529.076-.806.378-.277.302-1.058 1.033-1.058 2.52 0 1.486 1.083 2.922 1.234 3.124.151.202 2.132 3.256 5.166 4.566.721.312 1.284.498 1.723.637.724.23 1.383.197 1.904.12.581-.087 1.785-.73 2.037-1.436.252-.705.252-1.309.176-1.436-.076-.126-.277-.202-.579-.353z"></path></svg>
<span>Order on WhatsApp</span>
</button>
</div>
{/*  RIGHT COLUMN: Desktop Large Cutout Image  */}
<div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center">
<div className="relative w-80 h-80 flex items-center justify-center">
<div className="w-72 h-72 rounded-full bg-[#E5D5B5] shadow-inner absolute"></div>
<img className="relative z-10 w-64 h-64 object-contain drop-shadow-[0_24px_30px_rgba(92,3,2,0.3)] transition-all duration-300" id="detail-cake-img" src={currentCake.img} alt={currentCake.displayName} />
</div>
<p className="text-xs text-[#5C0302]/70 italic mt-3">Daily artisanal batch • Certified pure Normandy dairy</p>
</div>
</div>
</div>
</section>
{/*  4. CUSTOM CAKE BUILDER (~600px mobile: Option groups with 12px label + ONE swipeable row of 36px pills, 36px swatches, 48px message, 350x72px upload)  */}
<section className="w-full bg-[#F2E4C9] text-[#5C0302] py-10 md:py-16 site-gutter border-t-2 border-[#CA8B4A]/60 relative overflow-x-clip" id="custom-builder"><div data-parallax="0.1" data-parallax-mobile-hide className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#9A1C20]/10 rounded-full blur-3xl pointer-events-none"></div><div data-parallax="0.1" data-axis="x" data-parallax-mobile-hide aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"><span className="font-serif text-[18vw] font-bold leading-none tracking-[0.18em] text-[#C9A34E] opacity-[0.045]">BESPOKE</span></div><div className="max-w-6xl mx-auto relative z-10"><div data-parallax-depth="0.06" data-reveal className="text-center mb-8 md:mb-12"><h2 className="text-2xl md:text-5xl font-['Playfair_Display',serif] font-bold text-[#5C0302]">Design a custom cake</h2><p className="text-xs md:text-base text-[#5C0302]/80 mt-1.5 md:mt-2 max-w-xl mx-auto">Pick your options, and your order goes to WhatsApp.</p></div><div data-reveal-group className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-8 items-start"><div className="w-full lg:col-span-7 bg-[#FDF2D8] text-[#5C0302] rounded-2xl md:rounded-3xl p-4 sm:p-8 border-2 border-[#CA8B4A] shadow-2xl space-y-4 md:space-y-6">
<div className="sticky top-14 z-30 -mx-2 rounded-xl border border-[#CA8B4A]/40 bg-[#FDF2D8] px-3 pt-2 shadow-sm md:top-20 lg:hidden"><h3 className="text-center text-sm font-semibold">Live preview</h3><CustomCakePreview shape={customShape} flavour={customFlavour} layers={customLayers} size={customSize} theme={customTheme} topper={customTopper} message={customMessage} /></div>
<div><label className="block text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1.5">Shape</label><div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 flex-nowrap" ><button onClick={() => setCustomShape('Round')} aria-pressed={customShape === 'Round'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button"><span className="material-symbols-outlined text-sm text-[#E3A04B]">circle</span> Round</button><button onClick={() => setCustomShape('Square')} aria-pressed={customShape === 'Square'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button"><span className="material-symbols-outlined text-sm text-[#CA8B4A]">square</span> Square</button><button onClick={() => setCustomShape('Heart')} aria-pressed={customShape === 'Heart'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button"><span className="material-symbols-outlined text-sm text-[#9A1C20]">favorite</span> Heart</button></div></div><div><label className="block text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1.5">Flavour</label><div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 flex-nowrap" ><button onClick={() => setCustomFlavour('Vanilla')} aria-pressed={customFlavour === 'Vanilla'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">Vanilla</button><button onClick={() => setCustomFlavour('Belgian Chocolate')} aria-pressed={customFlavour === 'Belgian Chocolate'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">Chocolate</button><button onClick={() => setCustomFlavour('Red velvet')} aria-pressed={customFlavour === 'Red velvet'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">Red velvet</button><button onClick={() => setCustomFlavour('Butterscotch')} aria-pressed={customFlavour === 'Butterscotch'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">Butterscotch</button></div></div><div><label className="block text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1.5">Layers</label><div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 flex-nowrap" ><button onClick={() => setCustomLayers('1-Tier')} aria-pressed={customLayers === '1-Tier'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">1 layer</button><button onClick={() => setCustomLayers('2-Tier')} aria-pressed={customLayers === '2-Tier'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">2 layers</button><button onClick={() => setCustomLayers('3-Tier')} aria-pressed={customLayers === '3-Tier'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">3 layers</button></div></div><div><label className="block text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1.5">Size</label><div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 flex-nowrap" ><button onClick={() => setCustomSize('0.5 kg')} aria-pressed={customSize === '0.5 kg'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">0.5 kg</button><button onClick={() => setCustomSize('1 kg')} aria-pressed={customSize === '1 kg'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">1 kg</button><button onClick={() => setCustomSize('1.5 kg')} aria-pressed={customSize === '1.5 kg'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">1.5 kg</button><button onClick={() => setCustomSize('2 kg')} aria-pressed={customSize === '2 kg'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">2 kg</button><button onClick={() => setCustomSize('3 kg')} aria-pressed={customSize === '3 kg'} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">3 kg</button></div></div><div><label className="block text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1.5">Colour Theme</label><div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap pb-1 flex-nowrap" ><button onClick={() => setCustomTheme('Cherry Red')} aria-pressed={customTheme === 'Cherry Red'} className="theme-swatch aria-pressed:ring-2 aria-pressed:ring-[#9A1C20] aria-pressed:ring-offset-2 rounded-lg group relative flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer"  title="Cherry Red" type="button"><span className="w-9 h-9 rounded-full bg-[#9A1C20] border-2 border-[#5C0302] shadow-sm flex items-center justify-center text-[#FDF2D8]"></span><span className="text-[10px] font-bold text-[#5C0302]">Cherry</span></button><button onClick={() => setCustomTheme('Royal Burgundy & Gold')} aria-pressed={customTheme === 'Royal Burgundy & Gold'} className="theme-swatch aria-pressed:ring-2 aria-pressed:ring-[#9A1C20] aria-pressed:ring-offset-2 rounded-lg group relative flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer"  title="Cream / Gold" type="button"><span className="w-9 h-9 rounded-full bg-[#E3A04B] border-2 border-[#5C0302] shadow-sm flex items-center justify-center text-[#5C0302]"></span><span className="text-[10px] font-medium text-[#5C0302]">Gold</span></button><button onClick={() => setCustomTheme('Dark Chocolate')} aria-pressed={customTheme === 'Dark Chocolate'} className="theme-swatch aria-pressed:ring-2 aria-pressed:ring-[#9A1C20] aria-pressed:ring-offset-2 rounded-lg group relative flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer"  title="Dark Chocolate" type="button"><span className="w-9 h-9 rounded-full bg-[#3B1E16] border-2 border-[#5C0302] shadow-sm flex items-center justify-center text-[#FDF2D8]"></span><span className="text-[10px] font-medium text-[#5C0302]">Choco</span></button><button onClick={() => setCustomTheme('Pastel Rose')} aria-pressed={customTheme === 'Pastel Rose'} className="theme-swatch aria-pressed:ring-2 aria-pressed:ring-[#9A1C20] aria-pressed:ring-offset-2 rounded-lg group relative flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer"  title="Pastel Rose" type="button"><span className="w-9 h-9 rounded-full bg-[#E8A5A5] border-2 border-[#5C0302] shadow-sm flex items-center justify-center text-[#5C0302] ring-2 ring-[#9A1C20] ring-offset-2 ring-offset-[#F2E4C9]"><span className="material-symbols-outlined text-sm font-bold">check</span></span><span className="text-[10px] font-medium text-[#5C0302]">Rose</span></button></div></div><div><label className="block text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1.5">Topper</label><div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 flex-nowrap" ><button onClick={() => setCustomTopper("None")} aria-pressed={customTopper === "None"} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">None</button><button onClick={() => setCustomTopper("Candles")} aria-pressed={customTopper === "Candles"} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">Candles</button><button onClick={() => setCustomTopper("Flowers")} aria-pressed={customTopper === "Flowers"} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">Flowers</button><button onClick={() => setCustomTopper("Acrylic 'Happy Birthday'")} aria-pressed={customTopper === "Acrylic 'Happy Birthday'"} className="h-9 px-4 shrink-0 rounded-xl border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E3A04B]/20 aria-pressed:border-[#5C0302] aria-pressed:bg-[#5C0302] aria-pressed:text-[#FDF2D8]"  type="button">Name board</button></div></div><div><label className="block text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1">Message on Cake</label><input  className="w-full h-12 px-3 rounded-xl bg-[#F2E4C9] text-[#5C0302] font-medium text-xs border border-[#CA8B4A] focus:ring-2 focus:ring-[#9A1C20] focus:outline-none shadow-sm" id="custom-message-input"  type="text" value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} /></div><div><label htmlFor="custom-branch-select" className="block text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1">Which branch?</label><select id="custom-branch-select" className="w-full h-11 px-3 rounded-xl bg-[#FDF2D8] text-[#5C0302] font-medium text-xs border border-[#CA8B4A] focus:ring-2 focus:ring-[#9A1C20] focus:outline-none shadow-sm" value={customBranch} onChange={(e) => setCustomBranch(e.target.value)}><option value="Olavanna Branch">Olavanna Branch · +91 97442 42477</option><option value="Kattukulangara Branch">Kattukulangara Branch · +91 98467 72424</option><option value="Kulangarapeedika Branch">Kulangarapeedika Branch · +91 99467 77707</option></select></div><div><label className="block text-xs uppercase font-bold tracking-wider text-[#5C0302] mb-1">Reference photo upload</label><input ref={customPhotoInputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" aria-label="Choose a reference photo" onChange={handleCustomPhotoChange} />{customPhoto ? <div className="w-full max-w-[350px] mx-auto rounded-2xl border border-[#CA8B4A] bg-[#F2E4C9]/60 p-2 flex items-center gap-3"><img src={customPhoto.url} alt="Selected cake design reference" className="h-14 w-14 shrink-0 rounded-xl object-cover border border-[#CA8B4A]" /><div className="min-w-0 flex-1 text-left"><span className="block text-[11px] font-semibold text-[#5C0302] truncate">{customPhoto.name}</span><span className="block text-[9px] text-[#5C0302]/70">Preview only · send in WhatsApp chat</span></div><button type="button" onClick={clearCustomPhoto} aria-label="Remove reference photo" className="shrink-0 rounded-full p-1.5 text-[#9A1C20] hover:bg-[#E3A04B]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9A1C20]"><span className="material-symbols-outlined text-base">close</span></button></div> : <button type="button" onClick={() => customPhotoInputRef.current?.click()} className="w-full max-w-[350px] h-[72px] mx-auto border-2 border-dashed border-[#CA8B4A] rounded-2xl px-3 py-2 text-center bg-[#F2E4C9]/50 hover:bg-[#F2E4C9] transition-colors flex flex-row items-center justify-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A1C20]"><span className="material-symbols-outlined text-xl text-[#9A1C20]">add_photo_alternate</span><span className="text-left"><span className="text-[11px] font-semibold text-[#5C0302] block leading-tight">Add a photo of the design you like</span><span className="text-[9px] text-[#5C0302]/70 block">PNG, JPG, WEBP up to 10MB</span></span></button>}{customPhotoError && <p role="alert" className="mt-1 text-[10px] font-semibold text-[#9A1C20]">{customPhotoError}</p>}</div></div><div className="w-full lg:col-span-5 lg:sticky lg:top-24"><div className="bg-[#FDF2D8] text-[#5C0302] rounded-2xl md:rounded-3xl p-5 sm:p-8 border-2 border-[#CA8B4A] shadow-2xl relative"><div className="flex items-center justify-between pb-3 md:pb-4 border-b border-[#CA8B4A]/40 mb-4 md:mb-6"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-[#9A1C20] text-xl">auto_fix_high</span><h3 className="font-['Playfair_Display',serif] font-bold text-lg md:text-xl text-[#5C0302]">Live preview</h3></div><span className="px-2.5 py-0.5 md:py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E3A04B] text-[#5C0302]">Custom Craft</span></div>
<div className="mb-6 hidden lg:block"><CustomCakePreview shape={customShape} flavour={customFlavour} layers={customLayers} size={customSize} theme={customTheme} topper={customTopper} message={customMessage} /></div>
<div className="bg-[#F2E4C9] rounded-xl md:rounded-2xl p-3 md:p-4 border border-[#CA8B4A]/50 space-y-1.5 md:space-y-2 text-xs mb-4 md:mb-5"><div className="flex justify-between"><span className="text-[#5C0302]/70">Shape:</span><span  className="font-bold text-[#5C0302]" id="sum-shape">{customShape}</span></div><div className="flex justify-between"><span className="text-[#5C0302]/70">Flavour:</span><span  className="font-bold text-[#5C0302]" id="sum-flavour">{customFlavour}</span></div><div className="flex justify-between"><span className="text-[#5C0302]/70">Layers:</span><span  className="font-bold text-[#5C0302]" id="sum-layers">{customLayers}</span></div><div className="flex justify-between"><span className="text-[#5C0302]/70">Size:</span><span  className="font-bold text-[#5C0302]" id="sum-size">{customSize}</span></div><div className="flex justify-between"><span className="text-[#5C0302]/70">Theme:</span><span  className="font-bold text-[#5C0302]" id="sum-theme">{customTheme}</span></div><div className="flex justify-between"><span className="text-[#5C0302]/70">Topper:</span><span  className="font-bold text-[#5C0302]" id="sum-topper">{customTopper}</span></div><div className="flex justify-between"><span className="text-[#5C0302]/70">Message:</span><span  className="font-bold text-[#9A1C20] truncate max-w-[180px]" id="sum-message">{customMessage.trim() || 'None'}</span></div><div className="flex justify-between"><span className="text-[#5C0302]/70">Reference:</span><span  className="font-bold text-[#5C0302] truncate max-w-[180px]" id="sum-reference">{customPhoto ? customPhoto.name : 'None'}</span></div><div className="flex justify-between"><span className="text-[#5C0302]/70">Branch:</span><span  className="font-bold text-[#5C0302]" id="sum-branch">{customBranch}</span></div></div><p className="text-xs text-center text-[#5C0302]/80 font-medium italic mb-3 md:mb-4">We’ll confirm the price on WhatsApp</p><button onClick={handleSendCustomWhatsApp} className="btn-shimmer w-full py-3.5 md:py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-[#9A1C20] text-[#FDF2D8] hover:bg-[#801418] transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"  type="button"><svg className="w-4 h-4 fill-current text-[#FDF2D8]" viewBox="0 0 24 24"><path d="M12.031 0C5.399 0 0 5.399 0 12.031c0 2.119.553 4.185 1.602 6.008L.069 24l6.133-1.609c1.765.962 3.766 1.47 5.829 1.47 6.632 0 12.031-5.399 12.031-12.03C24.062 5.399 18.663 0 12.031 0zm0 22.008c-1.802 0-3.568-.485-5.109-1.401l-.367-.218-3.797.997 1.014-3.702-.239-.381c-1.008-1.605-1.541-3.468-1.541-5.272 0-5.517 4.488-10.005 10.039-10.005 5.551 0 10.039 4.488 10.039 10.005 0 5.517-4.488 10.005-10.039 10.005zm5.503-7.519c-.302-.151-1.785-.88-2.062-.981-.277-.101-.479-.151-.681.151-.202.302-.782.981-.958 1.183-.176.202-.353.227-.655.076-.302-.151-1.275-.47-2.428-1.498-.898-.8-1.503-1.789-1.68-2.091-.176-.302-.019-.465.132-.616.136-.135.302-.353.454-.529.151-.176.202-.302.302-.504.101-.202.05-.378-.025-.529-.076-.151-.681-1.642-.933-2.25-.245-.592-.494-.512-.681-.521l-.579-.01c-.202 0-.529.076-.806.378-.277.302-1.058 1.033-1.058 2.52 0 1.486 1.083 2.922 1.234 3.124.151.202 2.132 3.256 5.166 4.566.721.312 1.284.498 1.723.637.724.23 1.383.197 1.904.12.581-.087 1.785-.73 2.037-1.436.252-.705.252-1.309.176-1.436-.076-.126-.277-.202-.579-.353z"></path></svg><span>Order on WhatsApp</span></button></div></div></div>

{/* =========================================================================
    CUSTOM CAKE SERVICES & SPECIFICATION GUIDE TABLE
    ========================================================================= */}
<div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t-2 border-[#CA8B4A]/40 w-full">
  <div className="text-center mb-6 md:mb-10">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5C0302]/10 border border-[#CA8B4A] text-[11px] font-bold uppercase tracking-widest text-[#9A1C20] mb-2">
      <span className="material-symbols-outlined text-sm text-[#E3A04B]">star</span>
      <span>Bespoke Services &amp; Timelines</span>
    </div>
    <h3 className="text-2xl md:text-4xl font-['Playfair_Display',serif] font-bold text-[#5C0302]">
      Custom Cake Offerings &amp; Advance Notice Guide
    </h3>
    <p className="text-xs md:text-sm text-[#5C0302]/80 mt-1.5 max-w-xl mx-auto">
      Plan your celebration with confidence. Here is our complete custom cake scope, popular varieties, and recommended advance notice.
    </p>
  </div>

  {/* Desktop Table View (>= 1024px) */}
  <div className="hidden lg:block overflow-hidden rounded-2xl md:rounded-3xl border-2 border-[#CA8B4A] bg-[#FDF2D8] shadow-2xl">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-[#5C0302] via-[#750A10] to-[#5C0302] text-[#FDF2D8] text-xs uppercase tracking-wider font-bold">
          <th className="py-4 px-6 border-b border-[#CA8B4A]/50">Service / Offering</th>
          <th className="py-4 px-6 border-b border-[#CA8B4A]/50">Customization Scope</th>
          <th className="py-4 px-6 border-b border-[#CA8B4A]/50">Popular Varieties &amp; Styles</th>
          <th className="py-4 px-6 border-b border-[#CA8B4A]/50 text-right">Advance Notice</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#CA8B4A]/30 text-xs text-[#5C0302]">
        <tr className="hover:bg-[#F2E4C9]/70 transition-colors">
          <td className="py-4 px-6 font-bold flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#5C0302] text-[#E3A04B] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-base">palette</span>
            </span>
            <div>
              <span className="font-['Playfair_Display',serif] text-sm md:text-base font-bold block text-[#5C0302]">Customized Cakes</span>
              <span className="text-[10px] text-[#9A1C20] font-mono uppercase tracking-wide">Bespoke Recipe</span>
            </div>
          </td>
          <td className="py-4 px-6 text-[#5C0302]/90 leading-relaxed font-medium">
            Design, flavor &amp; size crafted as per your choice
          </td>
          <td className="py-4 px-6 text-[#5C0302]/80 leading-relaxed">
            Single &amp; multi-flavour options, custom sponge &amp; filling
          </td>
          <td className="py-4 px-6 text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#E3A04B]/25 border border-[#CA8B4A] text-[#5C0302] shadow-sm whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CA8B4A]"></span>
              Pre-order recommended
            </span>
          </td>
        </tr>

        <tr className="hover:bg-[#F2E4C9]/70 transition-colors">
          <td className="py-4 px-6 font-bold flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#5C0302] text-[#E3A04B] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-base">photo_camera</span>
            </span>
            <div>
              <span className="font-['Playfair_Display',serif] text-sm md:text-base font-bold block text-[#5C0302]">Photo Print Cakes</span>
              <span className="text-[10px] text-[#9A1C20] font-mono uppercase tracking-wide">Edible Sugar Sheet</span>
            </div>
          </td>
          <td className="py-4 px-6 text-[#5C0302]/90 leading-relaxed font-medium">
            Edible high-definition photo printing on cakes
          </td>
          <td className="py-4 px-6 text-[#5C0302]/80 leading-relaxed">
            Personalized portraits, company logos &amp; celebration images
          </td>
          <td className="py-4 px-6 text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 border border-emerald-400 text-emerald-900 shadow-sm whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Same day / 24h advance
            </span>
          </td>
        </tr>

        <tr className="hover:bg-[#F2E4C9]/70 transition-colors">
          <td className="py-4 px-6 font-bold flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#5C0302] text-[#E3A04B] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-base">celebration</span>
            </span>
            <div>
              <span className="font-['Playfair_Display',serif] text-sm md:text-base font-bold block text-[#5C0302]">Theme-Based Cakes</span>
              <span className="text-[10px] text-[#9A1C20] font-mono uppercase tracking-wide">Handcrafted Sculpt</span>
            </div>
          </td>
          <td className="py-4 px-6 text-[#5C0302]/90 leading-relaxed font-medium">
            Artisanal celebration cakes designed for special moments
          </td>
          <td className="py-4 px-6 text-[#5C0302]/80 leading-relaxed">
            Spiderman, Doll Cakes, Kids Themes, Floral &amp; Cartoon designs
          </td>
          <td className="py-4 px-6 text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-sky-100 border border-sky-400 text-sky-900 shadow-sm whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              24h – 48h advance
            </span>
          </td>
        </tr>

        <tr className="hover:bg-[#F2E4C9]/70 transition-colors">
          <td className="py-4 px-6 font-bold flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#5C0302] text-[#E3A04B] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-base">cake</span>
            </span>
            <div>
              <span className="font-['Playfair_Display',serif] text-sm md:text-base font-bold block text-[#5C0302]">Multi-Layer Tier Cakes</span>
              <span className="text-[10px] text-[#9A1C20] font-mono uppercase tracking-wide">Architectural Grand</span>
            </div>
          </td>
          <td className="py-4 px-6 text-[#5C0302]/90 leading-relaxed font-medium">
            Architectural tiered cakes for weddings &amp; grand milestones
          </td>
          <td className="py-4 px-6 text-[#5C0302]/80 leading-relaxed">
            2-tier, 3-tier &amp; multi-layer structural cake configurations
          </td>
          <td className="py-4 px-6 text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#9A1C20]/15 border border-[#9A1C20] text-[#9A1C20] shadow-sm whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9A1C20]"></span>
              48h advance
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Mobile & Tablet Card Stack (< 1024px) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
    {/* Card 1 */}
    <div className="bg-[#FDF2D8] border-2 border-[#CA8B4A] rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#5C0302] text-[#E3A04B] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-base">palette</span>
            </span>
            <div>
              <h4 className="font-['Playfair_Display',serif] text-base font-bold text-[#5C0302] leading-tight">
                Customized Cakes
              </h4>
              <span className="text-[10px] text-[#9A1C20] font-mono font-semibold uppercase">Bespoke Recipe</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E3A04B]/25 border border-[#CA8B4A] text-[#5C0302] flex-shrink-0">
            Pre-order
          </span>
        </div>
        <p className="text-xs text-[#5C0302] font-semibold leading-relaxed mb-2">
          Design, flavor &amp; size crafted as per your choice.
        </p>
        <div className="bg-[#F2E4C9] rounded-xl p-2.5 border border-[#CA8B4A]/40 text-[11px] text-[#5C0302]/80 leading-snug">
          <strong className="text-[#5C0302] block mb-0.5">Popular Styles:</strong>
          Single &amp; multi-flavour options, custom sponge &amp; filling.
        </div>
      </div>
      <div className="mt-3 pt-2.5 border-t border-[#CA8B4A]/30 flex items-center justify-between text-[11px]">
        <span className="text-[#5C0302]/70 font-medium">Timeline:</span>
        <span className="font-bold text-[#5C0302]">Pre-order recommended</span>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-[#FDF2D8] border-2 border-[#CA8B4A] rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#5C0302] text-[#E3A04B] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-base">photo_camera</span>
            </span>
            <div>
              <h4 className="font-['Playfair_Display',serif] text-base font-bold text-[#5C0302] leading-tight">
                Photo Print Cakes
              </h4>
              <span className="text-[10px] text-[#9A1C20] font-mono font-semibold uppercase">Edible Sugar Sheet</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 border border-emerald-400 text-emerald-900 flex-shrink-0">
            Same day / 24h
          </span>
        </div>
        <p className="text-xs text-[#5C0302] font-semibold leading-relaxed mb-2">
          Edible high-definition photo printing on cakes.
        </p>
        <div className="bg-[#F2E4C9] rounded-xl p-2.5 border border-[#CA8B4A]/40 text-[11px] text-[#5C0302]/80 leading-snug">
          <strong className="text-[#5C0302] block mb-0.5">Popular Styles:</strong>
          Personalized portraits, company logos &amp; celebration images.
        </div>
      </div>
      <div className="mt-3 pt-2.5 border-t border-[#CA8B4A]/30 flex items-center justify-between text-[11px]">
        <span className="text-[#5C0302]/70 font-medium">Timeline:</span>
        <span className="font-bold text-emerald-800">Same day / 24h advance</span>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-[#FDF2D8] border-2 border-[#CA8B4A] rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#5C0302] text-[#E3A04B] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-base">celebration</span>
            </span>
            <div>
              <h4 className="font-['Playfair_Display',serif] text-base font-bold text-[#5C0302] leading-tight">
                Theme-Based Cakes
              </h4>
              <span className="text-[10px] text-[#9A1C20] font-mono font-semibold uppercase">Handcrafted Sculpt</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 border border-sky-400 text-sky-900 flex-shrink-0">
            24h – 48h
          </span>
        </div>
        <p className="text-xs text-[#5C0302] font-semibold leading-relaxed mb-2">
          Artisanal celebration cakes designed for special moments.
        </p>
        <div className="bg-[#F2E4C9] rounded-xl p-2.5 border border-[#CA8B4A]/40 text-[11px] text-[#5C0302]/80 leading-snug">
          <strong className="text-[#5C0302] block mb-0.5">Popular Styles:</strong>
          Spiderman, Doll Cakes, Kids Themes, Floral &amp; Cartoon designs.
        </div>
      </div>
      <div className="mt-3 pt-2.5 border-t border-[#CA8B4A]/30 flex items-center justify-between text-[11px]">
        <span className="text-[#5C0302]/70 font-medium">Timeline:</span>
        <span className="font-bold text-sky-900">24h – 48h advance</span>
      </div>
    </div>

    {/* Card 4 */}
    <div className="bg-[#FDF2D8] border-2 border-[#CA8B4A] rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#5C0302] text-[#E3A04B] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-base">cake</span>
            </span>
            <div>
              <h4 className="font-['Playfair_Display',serif] text-base font-bold text-[#5C0302] leading-tight">
                Multi-Layer Tier Cakes
              </h4>
              <span className="text-[10px] text-[#9A1C20] font-mono font-semibold uppercase">Architectural Grand</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#9A1C20]/15 border border-[#9A1C20] text-[#9A1C20] flex-shrink-0">
            48h advance
          </span>
        </div>
        <p className="text-xs text-[#5C0302] font-semibold leading-relaxed mb-2">
          Architectural tiered cakes for weddings &amp; grand milestones.
        </p>
        <div className="bg-[#F2E4C9] rounded-xl p-2.5 border border-[#CA8B4A]/40 text-[11px] text-[#5C0302]/80 leading-snug">
          <strong className="text-[#5C0302] block mb-0.5">Popular Styles:</strong>
          2-tier, 3-tier &amp; multi-layer structural cake configurations.
        </div>
      </div>
      <div className="mt-3 pt-2.5 border-t border-[#CA8B4A]/30 flex items-center justify-between text-[11px]">
        <span className="text-[#5C0302]/70 font-medium">Timeline:</span>
        <span className="font-bold text-[#9A1C20]">48h advance</span>
      </div>
    </div>
  </div>
</div>
</div></section>
{/*  MOBILE STICKY BOTTOM BAR (64px high with safe-area padding, live price and Order on WhatsApp button)  */}
<div className="fixed bottom-0 inset-x-0 h-16 bg-[#5C0302]/95 border-t-2 border-[#E3A04B] px-4 z-50 flex items-center justify-between sm:hidden backdrop-blur-md shadow-2xl pb-[env(safe-area-inset-bottom,0px)]">
<div className="flex flex-col justify-center">
<div className="text-[10px] text-[#F2E4C9] uppercase tracking-wider font-semibold leading-tight">Total Price</div>
<div  className="text-xl font-['Playfair_Display',serif] font-bold text-[#E3A04B] leading-tight" id="sticky-mobile-price">₹{calculatedReadyMadePrice}</div>
</div>
<button onClick={handleSendReadyMadeWhatsApp} className="w-[190px] h-11 rounded-full font-bold text-xs uppercase tracking-wider bg-[#9A1C20] text-[#FDF2D8] shadow-md flex items-center justify-center gap-2 cursor-pointer hover:bg-[#801418] active:scale-95 transition-all" type="button">
<svg className="w-4 h-4 fill-current text-[#FDF2D8]" viewBox="0 0 24 24"><path d="M12.031 0C5.399 0 0 5.399 0 12.031c0 2.119.553 4.185 1.602 6.008L.069 24l6.133-1.609c1.765.962 3.766 1.47 5.829 1.47 6.632 0 12.031-5.399 12.031-12.03C24.062 5.399 18.663 0 12.031 0zm0 22.008c-1.802 0-3.568-.485-5.109-1.401l-.367-.218-3.797.997 1.014-3.702-.239-.381c-1.008-1.605-1.541-3.468-1.541-5.272 0-5.517 4.488-10.005 10.039-10.005 5.551 0 10.039 4.488 10.039 10.005 0 5.517-4.488 10.005-10.039 10.005zm5.503-7.519c-.302-.151-1.785-.88-2.062-.981-.277-.101-.479-.151-.681.151-.202.302-.782.981-.958 1.183-.176.202-.353.227-.655.076-.302-.151-1.275-.47-2.428-1.498-.898-.8-1.503-1.789-1.68-2.091-.176-.302-.019-.465.132-.616.136-.135.302-.353.454-.529.151-.176.202-.302.302-.504.101-.202.05-.378-.025-.529-.076-.151-.681-1.642-.933-2.25-.245-.592-.494-.512-.681-.521l-.579-.01c-.202 0-.529.076-.806.378-.277.302-1.058 1.033-1.058 2.52 0 1.486 1.083 2.922 1.234 3.124.151.202 2.132 3.256 5.166 4.566.721.312 1.284.498 1.723.637.724.23 1.383.197 1.904.12.581-.087 1.785-.73 2.037-1.436.252-.705.252-1.309.176-1.436-.076-.126-.277-.202-.579-.353z"></path></svg>
<span>Order on WhatsApp</span>
</button>
</div>
</main>
{/*  FOOTER  */}
{/*  5. CAKES WE'VE MADE GALLERY SECTION  */}
<section className="w-full bg-[#F2E4C9] text-[#5C0302] py-8 sm:py-20 border-t-2 border-[#CA8B4A]/60 relative overflow-hidden min-h-[330px]" id="cakes-we-have-made">
{/*  Section Header  */}
<div data-parallax-depth="-0.065" data-reveal className="max-w-4xl mx-auto text-center px-4 mb-6 sm:mb-12 relative z-10">
<h2 className="text-2xl sm:text-4xl md:text-5xl font-['Playfair_Display',serif] font-bold text-[#5C0302] tracking-tight mb-1.5 sm:mb-3">
      Cakes we’ve made
    </h2>
<p className="text-xs sm:text-base font-semibold text-[#9A1C20] tracking-wide">
      Real cakes from our ovens, made for real celebrations.
    </p>
<div className="w-12 sm:w-16 h-0.5 bg-[#CA8B4A] mx-auto mt-2 sm:mt-4 rounded-full"></div>
</div>
{/*  Mobile swipeable arch photo cards: 150x200px, 12px captions  */}
<div data-parallax-depth="0.045" className="relative w-full site-shell py-2" id="gallery-carousel-container">
<div className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex">
<button onClick={() => handleSlideGallery('prev')} aria-label="Previous cakes" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#5C0302] border-2 border-[#E3A04B] text-[#E3A04B] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#9A1C20] hover:text-[#FDF2D8] active:scale-95 cursor-pointer" id="gallery-prev-btn" type="button"><span className="material-symbols-outlined text-2xl font-bold pointer-events-none">chevron_left</span></button>
</div>
<div className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex">
<button onClick={() => handleSlideGallery('next')} aria-label="Next cakes" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#5C0302] border-2 border-[#E3A04B] text-[#E3A04B] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#9A1C20] hover:text-[#FDF2D8] active:scale-95 cursor-pointer" id="gallery-next-btn" type="button"><span className="material-symbols-outlined text-2xl font-bold pointer-events-none">chevron_right</span></button>
</div>
<div data-reveal="fade" className="overflow-x-auto scroll-smooth py-2 px-1 select-none" id="gallery-track" ref={galleryTrackRef} >
<div className="items-end gap-3 sm:gap-8 flex w-max snap-x snap-mandatory flex-nowrap" id="gallery-row-1"><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Salted Caramel" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd7-7ocmbChhPNwMMhwrxko-iORhWM_hiEfytvT8TbpWon9taKSdOgO5xm1fYYkC_tkBgA1bTOuhnRUHx6YgxeHg7AArht0tKiDLB0YJdNRu6DT-G3PuWynYYtpNCoPiC3vQtMd-uN9qJtUjgjekhRSCDuyGJUpI1K8dascwauqAiyUm8QzjWTKauu1k1WoaVUntVYNZCqi6hJbgK_LA9sDfo9Qbswq0w0g0sJH2E" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Salted Caramel</h4><p className="text-[11px] font-medium text-[#9A1C20]">1 kg • ₹720</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Royal Berry Gateau" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmkwJlOtwpTejVrfn6AOCsRYjXVIHX0EbIcnG-uKHM5jPqZd-E4QEwm2RkO8YIcaP2Bphjrp25pyIdDpsGnanUQHpogmwgOblQN75Dfc83AaY9rSD8TJIgxdbTlen-ePt662k-zCnbwR0WXLOI-jSbAaTyXEyGt43BxzdKQM8029fIkr4phW6k_zoJHlf2vdhkkjX4Ak64K61MOwF2A4JUHDx5RvtOFuQ2uT-15dA" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Royal Berry Gateau</h4><p className="text-[11px] font-medium text-[#9A1C20]">1.5 kg • ₹780</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Belgian Dark Truffle" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Belgian Dark Truffle</h4><p className="text-[11px] font-medium text-[#9A1C20]">1 kg • ₹850</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Butterscotch Praline" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6ZgdjbRHd00azo2QU_GUCN2jXgmrHHHH0KpICxYroBMkHqvo2BdezRIjpP6it5q_OltftWGNZP5gDpwAKXwRBBiecmzebe7TBaIDgqCpD_KC6XSiACmB0U2k92zVSs58tx0DQZhcu-SAVi5GMK-nlRSHXHNZoRyqxHTVO4Qu1e0Al33D7qdjc7ry0elW71iPeIUXHvR95bcCk-cr-IIPWF3-qRNUIPfwgngfIK2M" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Butterscotch Praline</h4><p className="text-[11px] font-medium text-[#9A1C20]">1 kg • ₹680</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="White Choco Rose" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr16didSxpZglgEBDAu49QDXuu6pPhactZPVs37UdT2-GMLsz5fxZd5sBeynL0JLMo5ip3PqButXbl0aSJQu9fhiumnbC0wLACmDfZTRl2ouaj26MAkGDWysz_kvHfiBEPkq3ioEIDdL3h1G2HN9x9fqPIunhTVi_-gMAF4sVLgNbJVeIMGVByv-U_2cZ_V2iL8-Dl2f5U4uPhkfQWuIjog8EiHrGbgFzl_3qSjew" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">White Choco Rose</h4><p className="text-[11px] font-medium text-[#9A1C20]">2 kg • ₹1200</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Fresh Strawberry Fraisier" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfgj--7Rwkzc74K_wTEMoNn5FpXMilVx9oRSnvbsO-syAAXkwgMh6RKKgiWrB0C3lBl1pH7RcJoWYhjKJEr9i6MqH3BvwWAodtpTX-964T0DL9PbKmDl9FVQ5iHUlX0hJqsYFbA3r3z3LTjs77PFVNqeYvf09Nt3_WraavL1-cZ8wH9t3OZpXStehyLsw7C_ktK5z4qO__ADVPrAHFRhtMMz4t1We2FV_C5JdTWk8" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Strawberry Fraisier</h4><p className="text-[11px] font-medium text-[#9A1C20]">1.2 kg • ₹820</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Pistachio Berry Paris-Brest" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL2r9f86h-iQHp_VPqWF44kIS8aijkzQ_AB-gYUhdA_tFcW0CL-hNNKr_Ajw9XHNLGkvTbrcAimLGWFQiWMgAuBk0uT_Bj73I0pZJkKnXLr-JebPCC8bfutWwWrl3P7Xnz_iLWNpPvlqC-nn6MqvsXosp5StDDqDxZUD95fTGL76DFhKHYK2M0Z2-FCfyj9OsxFtf7U-80Zu7TUxQLh_VSeEJ67SH5HrhqOA-vl3c" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Pistachio Paris-Brest</h4><p className="text-[11px] font-medium text-[#9A1C20]">1 kg • ₹890</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Lotus Biscoff Crunch" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD__69QRCD_hN1fEkrEgm6DzMKi3MbTTsJmGkUplVrFd_QhsmW7GNRehvYAfsbj0kq4doz95kd10zXZ2KDB7PLIKBxFGnm86Q7lYGZJf_mE8z6fAMQi2Ry_wkA0JTfJkcqt6s4U8VJiAmOg-4EDJEZ0R1iaEub6DvF8uz4qOe_XZic0Dr2PjLLxqqZofe8hRqz1lU-0aXzKFIShAHfRFZ_R3EL-6koongt21yd8sNM" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Lotus Biscoff</h4><p className="text-[11px] font-medium text-[#9A1C20]">1.5 kg • ₹950</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Black Forest Classic" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmkwJlOtwpTejVrfn6AOCsRYjXVIHX0EbIcnG-uKHM5jPqZd-E4QEwm2RkO8YIcaP2Bphjrp25pyIdDpsGnanUQHpogmwgOblQN75Dfc83AaY9rSD8TJIgxdbTlen-ePt662k-zCnbwR0WXLOI-jSbAaTyXEyGt43BxzdKQM8029fIkr4phW6k_zoJHlf2vdhkkjX4Ak64K61MOwF2A4JUHDx5RvtOFuQ2uT-15dA" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Black Forest Classic</h4><p className="text-[11px] font-medium text-[#9A1C20]">1 kg • ₹750</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Mango Mascarpone Bliss" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBquuVBtB3Uk9gzsTLfrHvJOX_xB57h_nH1YFHBDZOHf7z8eKJpC1_o4eRY_9-7N0T2toZdilkqY3EaZYT6FMyh7osezVBv-M1neVDjyxWvwWJRdReP3eV9JNzvNkmR4pbg14byYETP976K2WyWtNYXCwvCgnO1o6Mzr3KJ1QQnQnKGePBUG5_MBzSYQDE0xXabNjpMXsEp3HtzVhouGjRRz3hO8PlX_1D6uT4q2J4" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Mango Mascarpone</h4><p className="text-[11px] font-medium text-[#9A1C20]">1 kg • ₹820</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Hazelnut Ferrero Supreme" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATITdLMaM3hyXu4wc63nNN1WYLfJDKGY96WiFvdUA6omMCYSjVn57ASKeCSdyloyvTTkkkWaaW3l7ASXMA-W5WYrGH3jpDTRY6as84hdxX8Zh_UoABYH-Hiz_ADZl5NKroeUfTbx-69UktczD5yIzd9LdFJc_7rcDFGeYFRfpWWcICPk30PosTlz2c6SATCmCpDIJ8bUGimOTzOLCVJxJWjBIjPk9ROee2V2foJ8I" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Hazelnut Ferrero</h4><p className="text-[11px] font-medium text-[#9A1C20]">1.5 kg • ₹1100</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Tiramisu Velvet Gateau" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcORkmRchBqCQ637VNtuhjF3MgMZVJQLrPIsTpsYC2ZdFnJgKJ7A4r9TtQu6FumG5c6oSh5jgo6CWnHH9hVYMhYSgn30_mGPp76o6ZfTvGayJleE_Nq9K39gj-h5a89sVKI-rFLdXeyOLrsJnrgRmiNKGxrY-5sYpxRsWj3GdjYCDFhIdjCB0qLDogiEddiBfQ1CreOvUm_76Gjjc6aqy6RKlxfr7Yi18_8XrkyWA" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Tiramisu Velvet</h4><p className="text-[11px] font-medium text-[#9A1C20]">1 kg • ₹840</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Red Velvet Romance" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDplKcAwyL6K9cKEf4IdT_HFv-agCb6r4wBjDSQriIJptVllKicfXj5JeOP9Iya7JWfGluI_beKm1mykqnM-NA16dzcZWclguacsRBnL1NmjTgyZaVm37QzpeZ1ux_KEcPnQ6uazIKFWGo7Vgh52Qyqdzx1I-FBNEJUbfH1SH3LGaALSzO4yqfaHBv1yUZyEvrkqrgdBj9w8vKKD7k_DNeLuuoeXCT0ZoilUeXLY_0" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Red Velvet Romance</h4><p className="text-[11px] font-medium text-[#9A1C20]">1.5 kg • ₹900</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Dark Chocolate Opera" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuRinQauLcOunev2Vv8FPwj_JYvP6FRUwb087T6nEJnv713Db5r5m-CgfdPXcxTr9mc5m8BBp7B65tXKBcHxTGIfcXd9fragnV80-TEPWXL8hf2MnhXjZ8sP2-r82p7rtv_DYDo9GDdxyQ1t7I4mxh-mve94RWHVsFAn0zm2krgmXa7o6J2ip2sQZT-PrIb6FSFn3g0LDWFRmVB76pe_ctrhUBjo_Do5YoDSKtiaI" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Dark Chocolate Opera</h4><p className="text-[11px] font-medium text-[#9A1C20]">1 kg • ₹980</p></div></div><div className="gallery-card group flex-shrink-0 w-[150px] sm:w-auto snap-center cursor-pointer flex flex-col items-center" ><div className="w-[150px] sm:w-44 h-[200px] sm:h-56 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-lg relative bg-[#FDF2D8] transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#E3A04B]"><img alt="Golden Honey Almond" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy1in9b-sSDnS6arSUVCAMc0ragFeFLHH_CZh5mAD5ZPB6PogfmlpXjf-cTuoy6Lw6Ze9rIdlBE9qjMnVhW0s1aeECvCmh3HZKUNx9rLwk3Nb6b3fMeWPv5GewRljZk_7k7mJO-1njkcQlXcAWaxLw1FMpEC9ZNDhadFYdonpHMN00DCqVyi9mh6Hsh-Kdz_LWR5168u4m88ISHS2Ic6k82BPbfALZ0RMT8o5u7g8" /></div><div className="mt-2 text-center w-full px-1"><h4 className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm text-[#5C0302] truncate">Golden Honey Almond</h4><p className="text-[11px] font-medium text-[#9A1C20]">1.2 kg • ₹760</p></div></div></div>
</div>
<div className="flex items-center justify-center gap-2 mt-4 sm:mt-6" id="gallery-dots-container">
  {Array.from({ length: 15 }).map((_, i) => (
    <button
      key={i}
      onClick={() => {
        if (galleryTrackRef.current) {
          galleryTrackRef.current.scrollTo({ left: i * 190, behavior: 'smooth' });
        }
      }}
      aria-label={`Cake ${i + 1}`}
      className="w-2.5 h-2.5 rounded-full bg-[#5C0302]/30 hover:bg-[#5C0302] border border-[#CA8B4A] transition-all duration-300 cursor-pointer active:scale-125"
      type="button"
    />
  ))}
</div>
</div>
{/*  Lightbox Modal  */}
<div className="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-[#5C0302]/90 backdrop-blur-md transition-opacity duration-300" id="cake-lightbox" >
<div className="relative max-w-lg w-full bg-[#FDF2D8] border-2 border-[#CA8B4A] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center transform transition-transform duration-300 scale-95" id="lightbox-card" >
<button aria-label="Close lightbox" className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#5C0302] text-[#FDF2D8] hover:bg-[#9A1C20] flex items-center justify-center transition-colors shadow-md"  type="button">
<span className="material-symbols-outlined text-xl">close</span>
</button>
<div className="w-56 h-72 sm:w-64 sm:h-80 rounded-t-full rounded-b-2xl border-[1.5px] border-[#CA8B4A] overflow-hidden shadow-2xl relative mb-5 bg-[#5C0302]/10 ring-4 ring-[#E3A04B]/30">
<img alt="" className="w-full h-full object-cover object-center" id="lightbox-img" />
</div>
<h3 className="text-2xl sm:text-3xl font-['Playfair_Display',serif] font-bold text-[#5C0302] mb-1.5" id="lightbox-title"></h3>
<p className="text-xs sm:text-sm text-[#5C0302]/80 font-medium mb-1" id="lightbox-desc"></p>
<p className="text-[11px] font-mono uppercase tracking-wider text-[#9A1C20] mb-5 font-semibold" id="lightbox-ref"></p>
<div className="w-full flex items-center justify-between gap-3 pt-2 border-t border-[#CA8B4A]/40">
<button aria-label="Close" className="w-9 h-9 rounded-full border border-[#CA8B4A] bg-[#F2E4C9] text-[#5C0302] hover:bg-[#E3A04B]/30 flex items-center justify-center transition-colors shadow-sm"  type="button">
<span className="material-symbols-outlined text-base">close</span>
</button>
<button className="btn-shimmer flex-1 py-3 px-5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#9A1C20] text-[#FDF2D8] hover:bg-[#801418] transition-all shadow-lg flex items-center justify-center gap-2"  type="button">
<svg className="w-4 h-4 fill-current text-[#FDF2D8]" viewBox="0 0 24 24"><path d="M12.031 0C5.399 0 0 5.399 0 12.031c0 2.119.553 4.185 1.602 6.008L.069 24l6.133-1.609c1.765.962 3.766 1.47 5.829 1.47 6.632 0 12.031-5.399 12.031-12.03C24.062 5.399 18.663 0 12.031 0zm0 22.008c-1.802 0-3.568-.485-5.109-1.401l-.367-.218-3.797.997 1.014-3.702-.239-.381c-1.008-1.605-1.541-3.468-1.541-5.272 0-5.517 4.488-10.005 10.039-10.005 5.551 0 10.039 4.488 10.039 10.005 0 5.517-4.488 10.005-10.039 10.005zm5.503-7.519c-.302-.151-1.785-.88-2.062-.981-.277-.101-.479-.151-.681.151-.202.302-.782.981-.958 1.183-.176.202-.353.227-.655.076-.302-.151-1.275-.47-2.428-1.498-.898-.8-1.503-1.789-1.68-2.091-.176-.302-.019-.465.132-.616.136-.135.302-.353.454-.529.151-.176.202-.302.302-.504.101-.202.05-.378-.025-.529-.076-.151-.681-1.642-.933-2.25-.245-.592-.494-.512-.681-.521l-.579-.01c-.202 0-.529.076-.806.378-.277.302-1.058 1.033-1.058 2.52 0 1.486 1.083 2.922 1.234 3.124.151.202 2.132 3.256 5.166 4.566.721.312 1.284.498 1.723.637.724.23 1.383.197 1.904.12.581-.087 1.785-.73 2.037-1.436.252-.705.252-1.309.176-1.436-.076-.126-.277-.202-.579-.353z"></path></svg>
<span>Order a cake like this</span>
</button>
</div>
</div>
</div>
</section><footer className="relative overflow-hidden w-full bg-[#5C0302] text-[#FDF2D8] py-12 border-t border-[#E3A04B]/30 pb-20 sm:pb-12"><SectionDecor variant="footer" />
<div data-parallax-depth="0.055" data-reveal className="site-shell relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
<Link href="/" className="flex items-center gap-3 cursor-pointer group" aria-label="Paradise Bakes Home">
<img alt="Paradise Bakes Logo" className="h-7 w-auto object-contain group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC13_ykJiL_2E3uyosMHzqz2UXmZ0A60KimO_iEOYNfpNuWLMbfrYmL9IMWV4y8mEsTdYIyHDxwa5UjzsPwadOvmtT-gjbq4XlsnL8JZD25n1IoPE9qR-qNNB4pZdQHYnkYRdu1ga-HKFZWKJCuovAvXOCHrMnF-oDa1EtFlQDhf1yWInTCKLlRJS_6QLnGTxXkhptzaHDFpMWfMh7BcizxRnUVPLhRJw06t7fYU2FLf99v9BNAs_lA" />
<span className="font-['Playfair_Display',serif] text-lg font-bold text-[#FDF2D8] group-hover:text-[#E3A04B] transition-colors">Paradise Bakes</span>
</Link>
<p className="text-xs text-[#F2E4C9]/70 text-center">
        © 2024 Paradise Bakes. All rights reserved. Artisanal Pâtisserie &amp; Café.
      </p>
<div className="flex items-center gap-4 text-xs text-[#E3A04B]"><div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#E3A04B] text-center"><span><strong>Olavanna:</strong> Paradise Complex, Main Road | +91 97442 42477 | 10:00 AM - 12:00 PM Daily</span><span className="hidden md:inline">•</span><span><strong>Kattukulangara:</strong> Junction Arcade, Station Road | +91 98467 72424 | 10:00 AM - 12:00 PM Daily</span><span className="hidden md:inline">•</span><span><strong>Kulangarapeedika:</strong> Heritage Square, Highway Corner | +91 99466 77707 | 10:00 AM - 12:00 PM Daily</span></div></div>
</div>
</footer>
{/*  SCRIPT FOR STATE & WHATSAPP ORDERS  */}









    </div>
  );
}
