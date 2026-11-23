'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';

export interface CoolerCake {
  id: string;
  name: string;
  sub: string;
  price: number;
  category:
    | 'sweet-menu'
    | 'fresh-joy'
    | 'chocolate-dreams'
    | 'classic-cakes'
    | 'gourmet-specials'
    | 'signature-pastries'
    | 'dessert-delights';
  img: string;
  desc?: string;
}

export const CAKE_MENU: CoolerCake[] = [
  // ================= 1. SWEET MENU =================
  {
    id: 'red-velvet',
    name: 'Red Velvet Rose',
    sub: 'Crimson Velvet & Cream Cheese',
    price: 750,
    category: 'sweet-menu',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDplKcAwyL6K9cKEf4IdT_HFv-agCb6r4wBjDSQriIJptVllKicfXj5JeOP9Iya7JWfGluI_beKm1mykqnM-NA16dzcZWclguacsRBnL1NmjTgyZaVm37QzpeZ1ux_KEcPnQ6uazIKFWGo7Vgh52Qyqdzx1I-FBNEJUbfH1SH3LGaALSzO4yqfaHBv1yUZyEvrkqrgdBj9w8vKKD7k_DNeLuuoeXCT0ZoilUeXLY_0',
    desc: 'Silky cream cheese frosting layered with crimson velvet sponge and candied rose petals.',
  },
  {
    id: 'oreo-chocolate',
    name: 'Oreo Chocolate Noir',
    sub: 'Crushed Oreo Cocoa Ganache',
    price: 720,
    category: 'sweet-menu',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    desc: 'Crushed Oreo cookies folded into airy dark cocoa cream and topped with cookie crunch.',
  },
  {
    id: 'royal-berry',
    name: 'Royal Berry Gateau',
    sub: 'Fresh Wild Berry Chantilly',
    price: 780,
    category: 'sweet-menu',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmkwJlOtwpTejVrfn6AOCsRYjXVIHX0EbIcnG-uKHM5jPqZd-E4QEwm2RkO8YIcaP2Bphjrp25pyIdDpsGnanUQHpogmwgOblQN75Dfc83AaY9rSD8TJIgxdbTlen-ePt662k-zCnbwR0WXLOI-jSbAaTyXEyGt43BxzdKQM8029fIkr4phW6k_zoJHlf2vdhkkjX4Ak64K61MOwF2A4JUHDx5RvtOFuQ2uT-15dA',
    desc: 'Fresh raspberries, blackberries, and light chantilly cream over vanilla sponge.',
  },
  {
    id: 'ferrero-rocher',
    name: 'Ferrero Rocher Supreme',
    sub: 'Roasted Hazelnut Praline',
    price: 850,
    category: 'sweet-menu',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATITdLMaM3hyXu4wc63nNN1WYLfJDKGY96WiFvdUA6omMCYSjVn57ASKeCSdyloyvTTkkkWaaW3l7ASXMA-W5WYrGH3jpDTRY6as84hdxX8Zh_UoABYH-Hiz_ADZl5NKroeUfTbx-69UktczD5yIzd9LdFJc_7rcDFGeYFRfpWWcICPk30PosTlz2c6SATCmCpDIJ8bUGimOTzOLCVJxJWjBIjPk9ROee2V2foJ8I',
    desc: 'Toasted roasted hazelnut praline ganache, crushed wafer, and pure milk chocolate drizzle.',
  },
  {
    id: 'white-choco-rose',
    name: 'White Choco Vanilla Blossom',
    sub: 'Bourbon Vanilla & White Curls',
    price: 720,
    category: 'sweet-menu',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr16didSxpZglgEBDAu49QDXuu6pPhactZPVs37UdT2-GMLsz5fxZd5sBeynL0JLMo5ip3PqButXbl0aSJQu9fhiumnbC0wLACmDfZTRl2ouaj26MAkGDWysz_kvHfiBEPkq3ioEIDdL3h1G2HN9x9fqPIunhTVi_-gMAF4sVLgNbJVeIMGVByv-U_2cZ_V2iL8-Dl2f5U4uPhkfQWuIjog8EiHrGbgFzl_3qSjew',
    desc: 'Bourbon vanilla bean mousse with white chocolate shavings and delicate sugar rose pearls.',
  },

  // ================= 2. FRESH JOY =================
  {
    id: 'strawberry-fraisier',
    name: 'Fresh Strawberry Fraisier',
    sub: 'Farm Strawberries & Diplomate',
    price: 820,
    category: 'fresh-joy',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfgj--7Rwkzc74K_wTEMoNn5FpXMilVx9oRSnvbsO-syAAXkwgMh6RKKgiWrB0C3lBl1pH7RcJoWYhjKJEr9i6MqH3BvwWAodtpTX-964T0DL9PbKmDl9FVQ5iHUlX0hJqsYFbA3r3z3LTjs77PFVNqeYvf09Nt3_WraavL1-cZ8wH9t3OZpXStehyLsw7C_ktK5z4qO__ADVPrAHFRhtMMz4t1We2FV_C5JdTWk8',
    desc: 'Fresh farm strawberries nestled in rich mousseline cream between airy genoise sponge layers.',
  },
  {
    id: 'mango-mascarpone',
    name: 'Mango Mascarpone Bliss',
    sub: 'Alphonso Mango & Italian Cream',
    price: 820,
    category: 'fresh-joy',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBquuVBtB3Uk9gzsTLfrHvJOX_xB57h_nH1YFHBDZOHf7z8eKJpC1_o4eRY_9-7N0T2toZdilkqY3EaZYT6FMyh7osezVBv-M1neVDjyxWvwWJRdReP3eV9JNzvNkmR4pbg14byYETP976K2WyWtNYXCwvCgnO1o6Mzr3KJ1QQnQnKGePBUG5_MBzSYQDE0xXabNjpMXsEp3HtzVhouGjRRz3hO8PlX_1D6uT4q2J4',
    desc: 'Sweet Alphonso mango coulis blended with silky Italian mascarpone over soft vanilla sponge.',
  },
  {
    id: 'red-velvet-romance',
    name: 'Red Velvet Romance',
    sub: 'Crimson Glaze & Fresh Berries',
    price: 800,
    category: 'fresh-joy',
    img: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    desc: 'Velvety crimson sponge layered with light mascarpone cream, raspberry reduction, and fresh red berries.',
  },
  {
    id: 'golden-honey-almond',
    name: 'Golden Honey Almond Gateau',
    sub: 'Organic Honey & Toasted Almond',
    price: 760,
    category: 'fresh-joy',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy1in9b-sSDnS6arSUVCAMc0ragFeFLHH_CZh5mAD5ZPB6PogfmlpXjf-cTuoy6Lw6Ze9rIdlBE9qjMnVhW0s1aeECvCmh3HZKUNx9rLwk3Nb6b3fMeWPv5GewRljZk_7k7mJO-1njkcQlXcAWaxLw1FMpEC9ZNDhadFYdonpHMN00DCqVyi9mh6Hsh-Kdz_LWR5168u4m88ISHS2Ic6k82BPbfALZ0RMT8o5u7g8',
    desc: 'Moist almond flour cake glazed with pure Malabar forest honey and toasted almond flakes.',
  },

  // ================= 3. CHOCLATES DREAMS =================
  {
    id: 'chocolate-dream',
    name: 'Chocolate Dream',
    sub: 'Rich Chocolate Cake',
    price: 450,
    category: 'chocolate-dreams',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    desc: 'Rich chocolate sponge layered with whipped cocoa cream, silky fudge frosting, and delicate chocolate curls.',
  },
  {
    id: 'belgian-truffle',
    name: 'Belgian Truffle Noir',
    sub: '70% Dark Belgian Chocolate',
    price: 850,
    category: 'chocolate-dreams',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    desc: '70% dark Belgian chocolate ganache melted into moist fudge sponge with gold leaf dusting.',
  },
  {
    id: 'dark-chocolate-opera',
    name: 'Dark Chocolate Opera',
    sub: 'Almond Joconde & Espresso',
    price: 980,
    category: 'chocolate-dreams',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuRinQauLcOunev2Vv8FPwj_JYvP6FRUwb087T6nEJnv713Db5r5m-CgfdPXcxTr9mc5m8BBp7B65tXKBcHxTGIfcXd9fragnV80-TEPWXL8hf2MnhXjZ8sP2-r82p7rtv_DYDo9GDdxyQ1t7I4mxh-mve94RWHVsFAn0zm2krgmXa7o6J2ip2sQZT-PrIb6FSFn3g0LDWFRmVB76pe_ctrhUBjo_Do5YoDSKtiaI',
    desc: 'French almond Joconde sponge soaked in espresso syrup, layered with dark chocolate ganache and coffee buttercream.',
  },
  {
    id: 'dark-truffle',
    name: 'Dark Truffle Noir',
    sub: '80% Single-Origin Cocoa',
    price: 760,
    category: 'chocolate-dreams',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    desc: 'Intense 80% single-origin dark cocoa, dense truffle layers, and velvety chocolate glaze.',
  },
  {
    id: 'molten-fudge-lava',
    name: 'Molten Belgian Fudge',
    sub: 'Flowing Dark Cocoa Core',
    price: 790,
    category: 'chocolate-dreams',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    desc: 'Warm Belgian dark chocolate cake with a molten truffle ganache center.',
  },

  // ================= 4. CLASSIC CAKES =================
  {
    id: 'black-forest',
    name: 'Black Forest Classic',
    sub: 'Kirsch Cherries & Fresh Cream',
    price: 680,
    category: 'classic-cakes',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmkwJlOtwpTejVrfn6AOCsRYjXVIHX0EbIcnG-uKHM5jPqZd-E4QEwm2RkO8YIcaP2Bphjrp25pyIdDpsGnanUQHpogmwgOblQN75Dfc83AaY9rSD8TJIgxdbTlen-ePt662k-zCnbwR0WXLOI-jSbAaTyXEyGt43BxzdKQM8029fIkr4phW6k_zoJHlf2vdhkkjX4Ak64K61MOwF2A4JUHDx5RvtOFuQ2uT-15dA',
    desc: 'Classic Kirsch-soaked cherries, whipped fresh dairy cream, and shaved bitter chocolate.',
  },
  {
    id: 'butterscotch-praline',
    name: 'Butterscotch Praline',
    sub: 'Caramelised Nut Crunch',
    price: 680,
    category: 'classic-cakes',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6ZgdjbRHd00azo2QU_GUCN2jXgmrHHHH0KpICxYroBMkHqvo2BdezRIjpP6it5q_OltftWGNZP5gDpwAKXwRBBiecmzebe7TBaIDgqCpD_KC6XSiACmB0U2k92zVSs58tx0DQZhcu-SAVi5GMK-nlRSHXHNZoRyqxHTVO4Qu1e0Al33D7qdjc7ry0elW71iPeIUXHvR95bcCk-cr-IIPWF3-qRNUIPfwgngfIK2M',
    desc: 'Handcrafted golden caramel crunch folded into velvety butterscotch cream and moist vanilla sponge.',
  },
  {
    id: 'vanilla-bean-chiffon',
    name: 'Vanilla Bean Chiffon',
    sub: 'Pure Madagascar Vanilla',
    price: 640,
    category: 'classic-cakes',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr16didSxpZglgEBDAu49QDXuu6pPhactZPVs37UdT2-GMLsz5fxZd5sBeynL0JLMo5ip3PqButXbl0aSJQu9fhiumnbC0wLACmDfZTRl2ouaj26MAkGDWysz_kvHfiBEPkq3ioEIDdL3h1G2HN9x9fqPIunhTVi_-gMAF4sVLgNbJVeIMGVByv-U_2cZ_V2iL8-Dl2f5U4uPhkfQWuIjog8EiHrGbgFzl_3qSjew',
    desc: 'Airy chiffon sponge perfumed with natural Madagascar vanilla beans and whipped cream.',
  },
  {
    id: 'caramel-crunch-gateau',
    name: 'Caramel Crunch Gateau',
    sub: 'Toffee Butter Pearls',
    price: 690,
    category: 'classic-cakes',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd7-7ocmbChhPNwMMhwrxko-iORhWM_hiEfytvT8TbpWon9taKSdOgO5xm1fYYkC_tkBgA1bTOuhnRUHx6YgxeHg7AArht0tKiDLB0YJdNRu6DT-G3PuWynYYtpNCoPiC3vQtMd-uN9qJtUjgjekhRSCDuyGJUpI1K8dascwauqAiyUm8QzjWTKauu1k1WoaVUntVYNZCqi6hJbgK_LA9sDfo9Qbswq0w0g0sJH2E',
    desc: 'Slow-simmered caramel sponge with crunchy toffee pearls and dairy buttercream.',
  },

  // ================= 5. GOURMET SPECIALS =================
  {
    id: 'lotus-biscoff',
    name: 'Lotus Biscoff Crunch',
    sub: 'Spiced Speculoos Cookie Butter',
    price: 950,
    category: 'gourmet-specials',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD__69QRCD_hN1fEkrEgm6DzMKi3MbTTsJmGkUplVrFd_QhsmW7GNRehvYAfsbj0kq4doz95kd10zXZ2KDB7PLIKBxFGnm86Q7lYGZJf_mE8z6fAMQi2Ry_wkA0JTfJkcqt6s4U8VJiAmOg-4EDJEZ0R1iaEub6DvF8uz4qOe_XZic0Dr2PjLLxqqZofe8hRqz1lU-0aXzKFIShAHfRFZ_R3EL-6koongt21yd8sNM',
    desc: 'Spiced Belgian speculoos cookie spread layered with whipped dairy cream and crunchy Biscoff crumbs.',
  },
  {
    id: 'salted-caramel',
    name: 'Salted Caramel Crunch',
    sub: 'Himalayan Salt & Amber Caramel',
    price: 720,
    category: 'gourmet-specials',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd7-7ocmbChhPNwMMhwrxko-iORhWM_hiEfytvT8TbpWon9taKSdOgO5xm1fYYkC_tkBgA1bTOuhnRUHx6YgxeHg7AArht0tKiDLB0YJdNRu6DT-G3PuWynYYtpNCoPiC3vQtMd-uN9qJtUjgjekhRSCDuyGJUpI1K8dascwauqAiyUm8QzjWTKauu1k1WoaVUntVYNZCqi6hJbgK_LA9sDfo9Qbswq0w0g0sJH2E',
    desc: 'Slow-simmered artisanal amber caramel, Himalayan sea salt flakes, and butter crisp pearls.',
  },
  {
    id: 'pistachio-paris-brest',
    name: 'Pistachio Paris-Brest',
    sub: 'Bronte Pistachio Praline',
    price: 890,
    category: 'gourmet-specials',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL2r9f86h-iQHp_VPqWF44kIS8aijkzQ_AB-gYUhdA_tFcW0CL-hNNKr_Ajw9XHNLGkvTbrcAimLGWFQiWMgAuBk0uT_Bj73I0pZJkKnXLr-JebPCC8bfutWwWrl3P7Xnz_iLWNpPvlqC-nn6MqvsXosp5StDDqDxZUD95fTGL76DFhKHYK2M0Z2-FCfyj9OsxFtf7U-80Zu7TUxQLh_VSeEJ67SH5HrhqOA-vl3c',
    desc: 'Choux pastry ring filled with roasted Sicilian pistachio praline cream and dusted with powdered gold.',
  },

  // ================= 6. SIGNATURE PASTRIES =================
  {
    id: 'tiramisu-velvet',
    name: 'Tiramisu Velvet Gateau',
    sub: 'Italian Mascarpone & Espresso',
    price: 840,
    category: 'signature-pastries',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcORkmRchBqCQ637VNtuhjF3MgMZVJQLrPIsTpsYC2ZdFnJgKJ7A4r9TtQu6FumG5c6oSh5jgo6CWnHH9hVYMhYSgn30_mGPp76o6ZfTvGayJleE_Nq9K39gj-h5a89sVKI-rFLdXeyOLrsJnrgRmiNKGxrY-5sYpxRsWj3GdjYCDFhIdjCB0qLDogiEddiBfQ1CreOvUm_76Gjjc6aqy6RKlxfr7Yi18_8XrkyWA',
    desc: 'Espresso-soaked savoiardi biscuits layered with authentic Italian zabaione mascarpone and bitter cocoa.',
  },
  {
    id: 'belgian-truffle-pastry',
    name: 'Belgian Truffle Slice',
    sub: 'Dark Cocoa Pastry Slice',
    price: 180,
    category: 'signature-pastries',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    desc: 'Rich individual gateau slice glazed with dark mirror chocolate and gold leaf.',
  },
  {
    id: 'red-velvet-pastry',
    name: 'Red Velvet Rose Cupcake',
    sub: 'Crimson Sponge Cream Cheese',
    price: 140,
    category: 'signature-pastries',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDplKcAwyL6K9cKEf4IdT_HFv-agCb6r4wBjDSQriIJptVllKicfXj5JeOP9Iya7JWfGluI_beKm1mykqnM-NA16dzcZWclguacsRBnL1NmjTgyZaVm37QzpeZ1ux_KEcPnQ6uazIKFWGo7Vgh52Qyqdzx1I-FBNEJUbfH1SH3LGaALSzO4yqfaHBv1yUZyEvrkqrgdBj9w8vKKD7k_DNeLuuoeXCT0ZoilUeXLY_0',
    desc: 'Individual scarlet cupcake crowned with whipped cream cheese swirl and candied petals.',
  },
  {
    id: 'strawberry-tart',
    name: 'Strawberry Chantilly Tart',
    sub: 'Vanilla Sable & Glazed Berries',
    price: 190,
    category: 'signature-pastries',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfgj--7Rwkzc74K_wTEMoNn5FpXMilVx9oRSnvbsO-syAAXkwgMh6RKKgiWrB0C3lBl1pH7RcJoWYhjKJEr9i6MqH3BvwWAodtpTX-964T0DL9PbKmDl9FVQ5iHUlX0hJqsYFbA3r3z3LTjs77PFVNqeYvf09Nt3_WraavL1-cZ8wH9t3OZpXStehyLsw7C_ktK5z4qO__ADVPrAHFRhtMMz4t1We2FV_C5JdTWk8',
    desc: 'Crisp butter tart shell filled with Madagascar vanilla pastry cream and fresh strawberries.',
  },

  // ================= 7. DESSERT DELIGHTS =================
  {
    id: 'french-macarons-box',
    name: 'Assorted French Macarons',
    sub: 'Six Delicate Parisian Shells',
    price: 380,
    category: 'dessert-delights',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL2r9f86h-iQHp_VPqWF44kIS8aijkzQ_AB-gYUhdA_tFcW0CL-hNNKr_Ajw9XHNLGkvTbrcAimLGWFQiWMgAuBk0uT_Bj73I0pZJkKnXLr-JebPCC8bfutWwWrl3P7Xnz_iLWNpPvlqC-nn6MqvsXosp5StDDqDxZUD95fTGL76DFhKHYK2M0Z2-FCfyj9OsxFtf7U-80Zu7TUxQLh_VSeEJ67SH5HrhqOA-vl3c',
    desc: 'Box of 6 Parisian almond meringue macarons filled with ganache and fruit coulis.',
  },
  {
    id: 'molten-choco-cup',
    name: 'Warm Choco Lava Cup',
    sub: 'Flowing Belgian Ganache',
    price: 190,
    category: 'dessert-delights',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    desc: 'Warm individual chocolate pudding cup with molten liquid chocolate fudge center.',
  },
  {
    id: 'caramel-custard-flan',
    name: 'Velvety Caramel Flan',
    sub: 'Steamed Milk & Amber Syrup',
    price: 160,
    category: 'dessert-delights',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd7-7ocmbChhPNwMMhwrxko-iORhWM_hiEfytvT8TbpWon9taKSdOgO5xm1fYYkC_tkBgA1bTOuhnRUHx6YgxeHg7AArht0tKiDLB0YJdNRu6DT-G3PuWynYYtpNCoPiC3vQtMd-uN9qJtUjgjekhRSCDuyGJUpI1K8dascwauqAiyUm8QzjWTKauu1k1WoaVUntVYNZCqi6hJbgK_LA9sDfo9Qbswq0w0g0sJH2E',
    desc: 'Silky smooth baked egg and milk custard drenched in deep bittersweet amber caramel syrup.',
  },
];

export type CategoryKey =
  | 'all'
  | 'sweet-menu'
  | 'fresh-joy'
  | 'chocolate-dreams'
  | 'classic-cakes'
  | 'gourmet-specials'
  | 'signature-pastries'
  | 'dessert-delights';

interface CategoryTab {
  key: CategoryKey;
  label: string;
  icon: string;
}

const CATEGORIES: CategoryTab[] = [
  { key: 'all', label: 'All Cakes', icon: 'cake' },
  { key: 'sweet-menu', label: 'Sweet Menu', icon: 'bakery_dining' },
  { key: 'fresh-joy', label: 'Fresh Joy', icon: 'nutrition' },
  { key: 'chocolate-dreams', label: 'Choclates Dreams', icon: 'cookie' },
  { key: 'classic-cakes', label: 'Classic Cakes', icon: 'local_cafe' },
  { key: 'gourmet-specials', label: 'Gourmet Specials', icon: 'auto_awesome' },
  { key: 'signature-pastries', label: 'Signature Pastries', icon: 'star' },
  { key: 'dessert-delights', label: 'Dessert Delights', icon: 'icecream' },
];

interface CakeDisplayCoolerProps {
  onSelectCake?: (cakeKey: string) => void;
  selectedCakeKey?: string;
}

export default function CakeDisplayCooler({ onSelectCake, selectedCakeKey }: CakeDisplayCoolerProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chartSearchQuery, setChartSearchQuery] = useState('');
  const [chartCategory, setChartCategory] = useState<CategoryKey>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCakeId, setHoveredCakeId] = useState<string | null>('chocolate-dream');
  const [isMobile, setIsMobile] = useState(false);
  const coolerChamberRef = useRef<HTMLDivElement>(null);
  const chartListRef = useRef<HTMLDivElement>(null);

  // Responsive check for items per shelf
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Items per shelf: 3 on desktop, 2 on mobile (total per page: 6 on desktop, 4 on mobile)
  const itemsPerShelf = isMobile ? 2 : 3;
  const pageSize = itemsPerShelf * 2; // Exactly 2 shelves visible

  // Filter cakes by category and search query
  const filteredCakes = useMemo(() => {
    return CAKE_MENU.filter((cake) => {
      const matchesCategory =
        activeCategory === 'all' || cake.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        cake.name.toLowerCase().includes(q) ||
        cake.sub.toLowerCase().includes(q) ||
        (cake.desc && cake.desc.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Total pages based on filtered count and 2 shelves
  const totalPages = Math.max(1, Math.ceil(filteredCakes.length / pageSize));

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Safe current page clamp
  const safePage = Math.min(currentPage, totalPages);

  // Slices for the two visible shelves
  const startIndex = (safePage - 1) * pageSize;
  const currentVisibleCakes = filteredCakes.slice(startIndex, startIndex + pageSize);

  // Shelf 1 (Top Shelf) & Shelf 2 (Bottom Shelf)
  const shelf1Cakes = currentVisibleCakes.slice(0, itemsPerShelf);
  const shelf2Cakes = currentVisibleCakes.slice(itemsPerShelf, itemsPerShelf * 2);

  const prevPage = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  const nextPage = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  };

  const handleCakeHover = (cakeId: string) => {
    setHoveredCakeId(cakeId);
  };

  const handleCakeTap = (cake: CoolerCake) => {
    if (hoveredCakeId === cake.id) {
      onSelectCake?.(cake.id);
    } else {
      setHoveredCakeId(cake.id);
    }
  };

  // Quick select a cake directly from the side chart
  const handleSelectFromChart = (cake: CoolerCake) => {
    // If the cake is not in the active category, switch to its category or 'all'
    if (activeCategory !== 'all' && cake.category !== activeCategory) {
      setActiveCategory('all');
    }
    // Clear main search if it was hiding this cake
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!cake.name.toLowerCase().includes(q) && !cake.sub.toLowerCase().includes(q)) {
        setSearchQuery('');
      }
    }

    // Find page number in CAKE_MENU (or filtered list)
    const cakeIndex = CAKE_MENU.findIndex((c) => c.id === cake.id);
    if (cakeIndex !== -1) {
      const targetPage = Math.floor(cakeIndex / pageSize) + 1;
      setCurrentPage(targetPage);
    }

    setHoveredCakeId(cake.id);
    onSelectCake?.(cake.id);

    // Scroll smoothly to cooler if on mobile
    if (window.innerWidth < 1024 && coolerChamberRef.current) {
      coolerChamberRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Filtered list for the Side Directory Chart (Supports category filter + search query)
  const chartCakes = useMemo(() => {
    return CAKE_MENU.filter((c) => {
      const matchesCat = chartCategory === 'all' || c.category === chartCategory;
      const q = chartSearchQuery.trim().toLowerCase();
      const matchesQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.sub.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [chartCategory, chartSearchQuery]);

  const scrollChart = (direction: 'up' | 'down') => {
    if (!chartListRef.current) return;
    const offset = direction === 'down' ? 220 : -220;
    chartListRef.current.scrollBy({ top: offset, behavior: 'smooth' });
  };

  return (
    <section
      id="cake-display-cooler"
      className="relative w-full bg-[#5C0302] text-[#FDF2D8] py-10 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient Patisserie Warm Backlight Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-b from-[#C9A34E]/15 via-[#9A1C20]/25 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#9A1C20]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* =========================================================================
            HEADER: Eyebrow, Title & Real-time Cake Search
            ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 w-full">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <span className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-[#C9A34E]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#C9A34E]">
              PARADISE BAKES
            </span>
            <span className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-[#C9A34E]" />
          </div>

          {/* Headline */}
          <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FDF2D8] tracking-tight drop-shadow-md">
            Our Cake World
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#ffd7c9]/80 font-medium max-w-md mx-auto">
            Browse through our authentic 2-shelf patisserie refrigerator. Search or pick your favourite cake.
          </p>

          {/* Real-time Cake Search Bar */}
          <div className="relative max-w-md w-full mx-auto mt-6">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#E3A04B] text-xl pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by cake name (e.g. Chocolate, Velvet, Truffle)..."
              className="w-full h-12 pl-12 pr-11 rounded-full bg-[#180a0f]/90 border border-[#C9A34E]/40 focus:border-[#E3A04B] text-[#FDF2D8] placeholder-[#ffd7c9]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E3A04B]/50 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills (Generated from the Exact Menu) */}
          <div
            role="tablist"
            aria-label="Filter cakes by menu category"
            className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 mt-6 overflow-x-auto pb-2 px-2 max-w-full no-scrollbar snap-x snap-mandatory"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count =
                cat.key === 'all'
                  ? CAKE_MENU.length
                  : CAKE_MENU.filter((c) => c.category === cat.key).length;

              return (
                <button
                  key={cat.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`group relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 flex-shrink-0 cursor-pointer snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A34E] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F59E0B] via-[#E3A04B] to-[#D97706] text-[#1f060a] font-bold shadow-[0_0_20px_rgba(245,158,11,0.5)] border border-[#FFE088]'
                      : 'bg-[#180a0f]/80 backdrop-blur-md text-[#FDF2D8]/80 hover:text-white border border-[#C9A34E]/30 hover:border-[#C9A34E]/70 shadow-sm'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[15px] sm:text-[17px] transition-transform duration-300 ${
                      isActive ? 'text-[#1f060a] scale-110' : 'text-[#C9A34E] group-hover:scale-110'
                    }`}
                  >
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-[#1f060a]/20 text-[#1f060a]' : 'bg-white/10 text-[#C9A34E]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            MAIN SECTION: DUAL-COLUMN LAYOUT (COOLER + SIDE CAKE NAME CHART)
            ========================================================================= */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: 2-SHELF REFRIGERATED CAKE COOLER (lg:col-span-8)
              ========================================================================= */}
          <div className="lg:col-span-8 flex flex-col w-full">
            {/* Main Exterior Cooler Shell */}
            <div className="relative w-full rounded-[24px] sm:rounded-[36px] p-2.5 sm:p-5 lg:p-6 shadow-[0_35px_90px_rgba(0,0,0,0.95)] border-4 sm:border-[6px] border-[#1f1b20] bg-gradient-to-b from-[#1c181d] via-[#100d11] to-[#070508] transition-all">
              
              {/* Top Cooling Header & Status Strip */}
              <div className="relative flex items-center justify-between px-3 sm:px-6 py-2 sm:py-2.5 mb-2.5 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#141015] via-[#1a151b] to-[#141015] border border-white/10 shadow-inner">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#34D399] animate-pulse" />
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-[#E3A04B] tracking-wider uppercase">
                    PARADISE CHILLED VITRINE • 4°C
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] sm:text-xs text-[#ffd7c9]/70 font-mono">
                  <span className="hidden sm:inline">DUAL HORIZONTAL SHELVES</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:inline" />
                  <span className="text-[#FFE088]">
                    {filteredCakes.length} {filteredCakes.length === 1 ? 'Cake' : 'Cakes'} Available
                  </span>
                </div>
              </div>

              {/* The Main Cooler Chamber (Transparent Glass, Dual Shelves, No Middle Line) */}
              <div
                ref={coolerChamberRef}
                onMouseLeave={() => setHoveredCakeId(null)}
                className="relative rounded-2xl sm:rounded-3xl overflow-visible border-2 sm:border-[3px] border-[#29252c] bg-gradient-to-b from-[#141014] via-[#0d090d] to-[#060406] shadow-[inset_0_10px_35px_rgba(0,0,0,0.95)] min-h-[380px] sm:min-h-[500px] flex flex-col justify-between"
              >
                {/* Top Interior Continuous LED Light Beam */}
                <div className="absolute top-0 inset-x-0 h-2 sm:h-3 bg-gradient-to-b from-white via-[#E3A04B]/60 to-transparent opacity-90 z-20 pointer-events-none rounded-t-2xl sm:rounded-t-3xl" />

                {/* Seamless Panoramic Glass Reflection Sheen (No central divider line) */}
                <div
                  className="absolute inset-0 pointer-events-none z-30 opacity-30 mix-blend-screen transition-opacity duration-500 rounded-2xl sm:rounded-3xl"
                  style={{
                    background:
                      'linear-gradient(118deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 25%, transparent 45%, rgba(227,160,75,0.14) 65%, transparent 85%)',
                  }}
                />

                {/* Empty Search State */}
                {filteredCakes.length === 0 ? (
                  <div className="relative z-40 flex flex-col items-center justify-center p-8 sm:p-14 text-center my-auto">
                    <div className="w-14 h-14 rounded-full bg-[#E3A04B]/15 border border-[#E3A04B]/40 flex items-center justify-center text-[#E3A04B] mb-3 shadow-lg">
                      <span className="material-symbols-outlined text-2xl">search_off</span>
                    </div>
                    <h3 className="font-['Playfair_Display',serif] text-lg sm:text-2xl font-bold text-[#FDF2D8]">
                      No cakes found matching &ldquo;{searchQuery}&rdquo;
                    </h3>
                    <p className="text-xs sm:text-sm text-[#ffd7c9]/70 mt-1 max-w-sm">
                      Try searching for another flavour like Chocolate, Velvet, or Berry, or browse All Cakes.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                      className="mt-4 px-5 py-2 rounded-full bg-[#E3A04B] text-[#5C0302] font-bold text-xs uppercase tracking-wider hover:bg-[#CA8B4A] transition-colors shadow-md cursor-pointer"
                    >
                      Reset &amp; View All Cakes
                    </button>
                  </div>
                ) : (
                  /* The Two Visible Horizontal Shelves */
                  <div className="flex flex-col justify-around flex-1 py-4 sm:py-6">
                    {/* ================= SHELF 1 (TOP SHELF) ================= */}
                    <div className="relative w-full flex flex-col pt-3 sm:pt-4 pb-2">
                      <div className="flex items-end justify-around w-full px-2 sm:px-8 relative z-10">
                        {shelf1Cakes.map((cake) => {
                          const isHovered = hoveredCakeId === cake.id;
                          const hasHoverActive = hoveredCakeId !== null;

                          return (
                            <div
                              key={cake.id}
                              onMouseEnter={() => handleCakeHover(cake.id)}
                              onClick={() => handleCakeTap(cake)}
                              className={`relative flex flex-col items-center justify-end min-h-[130px] sm:min-h-[175px] lg:min-h-[200px] pb-1 cursor-pointer transition-all duration-300 ${
                                isHovered
                                  ? 'z-40'
                                  : hasHoverActive
                                  ? 'opacity-40 scale-95 z-10'
                                  : 'opacity-100 z-10'
                              }`}
                            >
                              {/* Soft Golden Ambient Spotlight (NO glass crack lines) */}
                              {isHovered && (
                                <div
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 lg:w-72 aspect-square rounded-full pointer-events-none z-0 animate-in fade-in duration-300"
                                  style={{
                                    background:
                                      'radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(227, 160, 75, 0.20) 45%, transparent 72%)',
                                    filter: 'blur(20px)',
                                  }}
                                />
                              )}

                              {/* Cake Image and Stand — Only Hovered Cake Pops Forward ('porthkk vann nikkanm') */}
                              <div
                                className={`relative z-10 flex flex-col items-center transition-all duration-300 ease-out transform ${
                                  isHovered
                                    ? 'scale-125 sm:scale-130 lg:scale-135 -translate-y-4 sm:-translate-y-6'
                                    : 'scale-100 hover:scale-105'
                                }`}
                              >
                                <div className="relative w-20 h-20 sm:w-32 sm:h-32 lg:w-36 lg:h-36 flex items-center justify-center">
                                  <img
                                    src={cake.img}
                                    alt={cake.name}
                                    className={`w-full h-full object-contain transition-all duration-300 ${
                                      isHovered
                                        ? 'drop-shadow-[0_24px_35px_rgba(0,0,0,0.98)] drop-shadow-[0_0_25px_rgba(245,158,11,0.7)]'
                                        : 'drop-shadow-[0_12px_14px_rgba(0,0,0,0.7)]'
                                    }`}
                                    loading="lazy"
                                  />
                                </div>
                                <div
                                  className={`h-2.5 sm:h-3.5 rounded-full bg-gradient-to-r from-[#6b7280] via-[#e5e7eb] to-[#4b5563] border border-white/50 -mt-1 sm:-mt-2 relative transition-all duration-300 ${
                                    isHovered
                                      ? 'w-20 sm:w-32 lg:w-40 shadow-[0_12px_22px_rgba(0,0,0,0.95)]'
                                      : 'w-16 sm:w-28 lg:w-32 shadow-[0_6px_12px_rgba(0,0,0,0.85)]'
                                  }`}
                                >
                                  <div className="absolute inset-x-2 top-0 h-0.5 bg-white/70 rounded-full" />
                                </div>
                              </div>

                              {/* Floating Glassmorphism Info Pill */}
                              {isHovered && (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectCake?.(cake.id);
                                  }}
                                  className="absolute z-50 left-1/2 -translate-x-1/2 bottom-[-22px] sm:bottom-[-28px] w-[180px] sm:w-[220px] lg:w-[240px] bg-[#140e12]/95 backdrop-blur-xl border border-[#C9A34E]/90 rounded-2xl p-2.5 sm:p-3.5 shadow-[0_25px_50px_rgba(0,0,0,0.98),0_0_30px_rgba(201,163,78,0.5)] flex items-center justify-between text-left transition-all duration-300 animate-in fade-in zoom-in-95"
                                >
                                  <div className="flex-1 pr-2">
                                    <h4 className="font-['Playfair_Display',serif] text-xs sm:text-sm lg:text-base font-bold text-[#FDF2D8] leading-tight line-clamp-1">
                                      {cake.name}
                                    </h4>
                                    <p className="text-[9px] sm:text-[11px] text-[#ffd7c9]/80 font-medium leading-tight mt-0.5 line-clamp-1">
                                      {cake.sub}
                                    </p>
                                    <div className="text-xs sm:text-base font-bold text-[#E3A04B] font-mono mt-1">
                                      ₹{cake.price}
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    aria-label={`Select ${cake.name}`}
                                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#E3A04B]/20 border border-[#E3A04B] text-[#E3A04B] hover:bg-[#E3A04B] hover:text-[#5C0302] flex items-center justify-center transition-all shadow-md active:scale-90 cursor-pointer flex-shrink-0"
                                  >
                                    <span className="material-symbols-outlined text-base sm:text-xl font-bold">+</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Shelf 1 Glass & LED Strip Light Bar */}
                      <div className="w-full mt-2 sm:mt-3 relative">
                        <div className="w-full h-2 sm:h-3 bg-gradient-to-r from-[#d1d5db] via-white to-[#d1d5db] shadow-[0_0_14px_rgba(255,255,255,0.95),0_0_26px_rgba(227,160,75,0.45),0_4px_10px_rgba(0,0,0,0.9)] relative rounded-sm z-15">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffe088]/40 to-transparent" />
                        </div>
                        <div className="w-full h-1 sm:h-1.5 bg-[#1f2937]/90 border-t border-cyan-200/40 opacity-80" />
                      </div>
                    </div>

                    {/* ================= SHELF 2 (BOTTOM SHELF) ================= */}
                    <div className="relative w-full flex flex-col pt-3 sm:pt-4 pb-2">
                      <div className="flex items-end justify-around w-full px-2 sm:px-8 relative z-10">
                        {shelf2Cakes.map((cake) => {
                          const isHovered = hoveredCakeId === cake.id;
                          const hasHoverActive = hoveredCakeId !== null;

                          return (
                            <div
                              key={cake.id}
                              onMouseEnter={() => handleCakeHover(cake.id)}
                              onClick={() => handleCakeTap(cake)}
                              className={`relative flex flex-col items-center justify-end min-h-[130px] sm:min-h-[175px] lg:min-h-[200px] pb-1 cursor-pointer transition-all duration-300 ${
                                isHovered
                                  ? 'z-40'
                                  : hasHoverActive
                                  ? 'opacity-40 scale-95 z-10'
                                  : 'opacity-100 z-10'
                              }`}
                            >
                              {/* Soft Golden Ambient Spotlight (NO glass crack lines) */}
                              {isHovered && (
                                <div
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 lg:w-72 aspect-square rounded-full pointer-events-none z-0 animate-in fade-in duration-300"
                                  style={{
                                    background:
                                      'radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(227, 160, 75, 0.20) 45%, transparent 72%)',
                                    filter: 'blur(20px)',
                                  }}
                                />
                              )}

                              {/* Cake Image and Stand — Only Hovered Cake Pops Forward ('porthkk vann nikkanm') */}
                              <div
                                className={`relative z-10 flex flex-col items-center transition-all duration-300 ease-out transform ${
                                  isHovered
                                    ? 'scale-125 sm:scale-130 lg:scale-135 -translate-y-4 sm:-translate-y-6'
                                    : 'scale-100 hover:scale-105'
                                }`}
                              >
                                <div className="relative w-20 h-20 sm:w-32 sm:h-32 lg:w-36 lg:h-36 flex items-center justify-center">
                                  <img
                                    src={cake.img}
                                    alt={cake.name}
                                    className={`w-full h-full object-contain transition-all duration-300 ${
                                      isHovered
                                        ? 'drop-shadow-[0_24px_35px_rgba(0,0,0,0.98)] drop-shadow-[0_0_25px_rgba(245,158,11,0.7)]'
                                        : 'drop-shadow-[0_12px_14px_rgba(0,0,0,0.7)]'
                                    }`}
                                    loading="lazy"
                                  />
                                </div>
                                <div
                                  className={`h-2.5 sm:h-3.5 rounded-full bg-gradient-to-r from-[#6b7280] via-[#e5e7eb] to-[#4b5563] border border-white/50 -mt-1 sm:-mt-2 relative transition-all duration-300 ${
                                    isHovered
                                      ? 'w-20 sm:w-32 lg:w-40 shadow-[0_12px_22px_rgba(0,0,0,0.95)]'
                                      : 'w-16 sm:w-28 lg:w-32 shadow-[0_6px_12px_rgba(0,0,0,0.85)]'
                                  }`}
                                >
                                  <div className="absolute inset-x-2 top-0 h-0.5 bg-white/70 rounded-full" />
                                </div>
                              </div>

                              {/* Floating Glassmorphism Info Pill */}
                              {isHovered && (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectCake?.(cake.id);
                                  }}
                                  className="absolute z-50 left-1/2 -translate-x-1/2 bottom-[-22px] sm:bottom-[-28px] w-[180px] sm:w-[220px] lg:w-[240px] bg-[#140e12]/95 backdrop-blur-xl border border-[#C9A34E]/90 rounded-2xl p-2.5 sm:p-3.5 shadow-[0_25px_50px_rgba(0,0,0,0.98),0_0_30px_rgba(201,163,78,0.5)] flex items-center justify-between text-left transition-all duration-300 animate-in fade-in zoom-in-95"
                                >
                                  <div className="flex-1 pr-2">
                                    <h4 className="font-['Playfair_Display',serif] text-xs sm:text-sm lg:text-base font-bold text-[#FDF2D8] leading-tight line-clamp-1">
                                      {cake.name}
                                    </h4>
                                    <p className="text-[9px] sm:text-[11px] text-[#ffd7c9]/80 font-medium leading-tight mt-0.5 line-clamp-1">
                                      {cake.sub}
                                    </p>
                                    <div className="text-xs sm:text-base font-bold text-[#E3A04B] font-mono mt-1">
                                      ₹{cake.price}
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    aria-label={`Select ${cake.name}`}
                                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#E3A04B]/20 border border-[#E3A04B] text-[#E3A04B] hover:bg-[#E3A04B] hover:text-[#5C0302] flex items-center justify-center transition-all shadow-md active:scale-90 cursor-pointer flex-shrink-0"
                                  >
                                    <span className="material-symbols-outlined text-base sm:text-xl font-bold">+</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Shelf 2 Glass & LED Strip Light Bar */}
                      <div className="w-full mt-2 sm:mt-3 relative">
                        <div className="w-full h-2 sm:h-3 bg-gradient-to-r from-[#d1d5db] via-white to-[#d1d5db] shadow-[0_0_14px_rgba(255,255,255,0.95),0_0_26px_rgba(227,160,75,0.45),0_4px_10px_rgba(0,0,0,0.9)] relative rounded-sm z-15">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffe088]/40 to-transparent" />
                        </div>
                        <div className="w-full h-1 sm:h-1.5 bg-[#1f2937]/90 border-t border-cyan-200/40 opacity-80" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Chilled Patisserie Glass Floor Glow */}
                <div className="w-full h-4 sm:h-6 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none rounded-b-2xl sm:rounded-b-3xl" />
              </div>

              {/* Navigation & Pagination Controls (Browse across additional cakes) */}
              {totalPages > 1 && (
                <div className="mt-3.5 sm:mt-5 flex items-center justify-between px-3 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#141116] via-[#1f1a22] to-[#141116] border border-white/5">
                  {/* Previous Shelf Button */}
                  <button
                    onClick={prevPage}
                    disabled={safePage === 1}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      safePage === 1
                        ? 'opacity-35 cursor-not-allowed text-white/40'
                        : 'bg-[#E3A04B]/20 hover:bg-[#E3A04B] text-[#E3A04B] hover:text-[#5C0302] border border-[#E3A04B]/50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
                    <span className="hidden sm:inline">Prev Shelf</span>
                  </button>

                  {/* Page Indicator & Dots */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] sm:text-xs font-mono text-[#ffd7c9]/80 font-medium">
                      Shelf Page <strong className="text-[#E3A04B]">{safePage}</strong> of {totalPages}
                    </span>
                    <div className="flex items-center gap-1.5 ml-1">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`transition-all rounded-full cursor-pointer ${
                            i + 1 === safePage
                              ? 'w-5 sm:w-6 h-2 bg-[#E3A04B] shadow-[0_0_8px_#E3A04B]'
                              : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                          }`}
                          aria-label={`Go to shelf page ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Next Shelf Button */}
                  <button
                    onClick={nextPage}
                    disabled={safePage === totalPages}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      safePage === totalPages
                        ? 'opacity-35 cursor-not-allowed text-white/40'
                        : 'bg-[#E3A04B]/20 hover:bg-[#E3A04B] text-[#E3A04B] hover:text-[#5C0302] border border-[#E3A04B]/50'
                    }`}
                  >
                    <span className="hidden sm:inline">Next Shelf</span>
                    <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: ALL CAKE NAMES DIRECTORY & FLAVOUR CHART (lg:col-span-4)
              "pinne coolerinte oru sidil ella cake name chart vekkanm costemor entha per areelangilo"
              ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col w-full">
            <div
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              className="w-full rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 lg:p-6 bg-gradient-to-b from-[#181216] via-[#100b0e] to-[#0a0709] border-2 sm:border-[3px] border-[#C9A34E]/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col"
            >
              {/* Header: Title & Total Count Badge */}
              <div className="flex items-center justify-between pb-3.5 mb-2.5 border-b border-[#C9A34E]/20">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#E3A04B]/20 border border-[#E3A04B]/40 flex items-center justify-center text-[#E3A04B]">
                    <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
                  </span>
                  <div>
                    <h3 className="font-['Playfair_Display',serif] text-base sm:text-lg font-bold text-[#FDF2D8] leading-tight">
                      Cake Name Chart
                    </h3>
                    <p className="text-[10px] text-[#ffd7c9]/60 font-medium">
                      All Varieties &amp; Quick Lookup
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#E3A04B]/15 border border-[#E3A04B]/30 text-[#FFE088] font-mono text-[10px] font-bold">
                    {chartCakes.length} / {CAKE_MENU.length} Items
                  </span>
                </div>
              </div>

              {/* Informative Help Tag for Customers */}
              <div className="mb-2.5 px-3 py-2 rounded-xl bg-[#26131c]/70 border border-[#C9A34E]/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#E3A04B] text-base flex-shrink-0">
                  lightbulb
                </span>
                <p className="text-[11px] text-[#ffd7c9]/80 leading-snug">
                  Don&rsquo;t know the cake name? Tap any cake below to locate and pop it out inside the showcase!
                </p>
              </div>

              {/* Chart Live Filter Input */}
              <div className="relative w-full mb-2.5">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A34E] text-base pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={chartSearchQuery}
                  onChange={(e) => setChartSearchQuery(e.target.value)}
                  placeholder="Quick lookup by name (e.g. Truffle, Velvet)..."
                  className="w-full h-9 pl-9 pr-8 rounded-lg bg-[#0d070b] border border-white/10 focus:border-[#E3A04B] text-[#FDF2D8] placeholder-[#ffd7c9]/40 text-xs focus:outline-none transition-all"
                />
                {chartSearchQuery && (
                  <button
                    onClick={() => setChartSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Quick Category Chips inside the Chart for Immediate Filtering */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar">
                {[
                  { key: 'all' as CategoryKey, label: 'All (28)' },
                  { key: 'sweet-menu' as CategoryKey, label: 'Sweet (5)' },
                  { key: 'fresh-joy' as CategoryKey, label: 'Fresh (4)' },
                  { key: 'chocolate-dreams' as CategoryKey, label: 'Choc (5)' },
                  { key: 'classic-cakes' as CategoryKey, label: 'Classic (4)' },
                  { key: 'gourmet-specials' as CategoryKey, label: 'Gourmet (3)' },
                  { key: 'signature-pastries' as CategoryKey, label: 'Pastry (4)' },
                  { key: 'dessert-delights' as CategoryKey, label: 'Dessert (3)' },
                ].map((chip) => {
                  const isSel = chartCategory === chip.key;
                  return (
                    <button
                      key={chip.key}
                      onClick={() => setChartCategory(chip.key)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                        isSel
                          ? 'bg-[#E3A04B] text-[#1c080e] font-bold shadow-sm'
                          : 'bg-white/5 text-[#ffd7c9]/70 hover:bg-white/10 hover:text-white border border-white/5'
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              {/* Scrollable Cake List with Lenis Prevention & Native Scroll */}
              <div
                ref={chartListRef}
                data-lenis-prevent="true"
                data-lenis-prevent-wheel="true"
                data-lenis-prevent-touch="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#E3A04B #180a0f',
                  overscrollBehavior: 'contain',
                  touchAction: 'pan-y',
                }}
                className="flex flex-col gap-1.5 max-h-[440px] sm:max-h-[500px] lg:max-h-[540px] overflow-y-auto pr-1.5 custom-scrollbar"
              >
                {chartCakes.map((cake, idx) => {
                  const isHovered = hoveredCakeId === cake.id;
                  const isSelected = selectedCakeKey === cake.id;

                  return (
                    <div
                      key={cake.id}
                      onClick={() => handleSelectFromChart(cake)}
                      onMouseEnter={() => handleCakeHover(cake.id)}
                      className={`group relative flex items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isHovered || isSelected
                          ? 'bg-gradient-to-r from-[#2e121d] to-[#1c0c14] border-[#E3A04B] shadow-[0_0_15px_rgba(227,160,75,0.25)]'
                          : 'bg-[#120a10]/60 hover:bg-[#1a0e16] border-white/5 hover:border-[#C9A34E]/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        {/* Index Number */}
                        <span className="font-mono text-[10px] text-[#ffd7c9]/40 w-4 text-right flex-shrink-0">
                          {idx + 1}
                        </span>

                        {/* Cake Mini Thumbnail */}
                        <div className="w-8 h-8 rounded-lg bg-[#1f1018] border border-white/10 p-0.5 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          <img
                            src={cake.img}
                            alt={cake.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                            loading="lazy"
                          />
                        </div>

                        {/* Name and Subtitle */}
                        <div className="min-w-0">
                          <h4
                            className={`font-medium text-xs truncate transition-colors ${
                              isHovered || isSelected ? 'text-[#FFE088] font-bold' : 'text-[#FDF2D8]'
                            }`}
                          >
                            {cake.name}
                          </h4>
                          <p className="text-[10px] text-[#ffd7c9]/60 truncate">
                            {cake.sub}
                          </p>
                        </div>
                      </div>

                      {/* Price & Action Pill */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-mono font-bold text-xs text-[#E3A04B]">
                          ₹{cake.price}
                        </span>
                        <span
                          className={`material-symbols-outlined text-sm transition-transform ${
                            isHovered || isSelected
                              ? 'text-[#FFE088] translate-x-0.5'
                              : 'text-white/20 group-hover:text-white/60'
                          }`}
                        >
                          chevron_right
                        </span>
                      </div>
                    </div>
                  );
                })}

                {chartCakes.length === 0 && (
                  <div className="py-8 text-center text-xs text-[#ffd7c9]/60">
                    No cakes match &ldquo;{chartSearchQuery}&rdquo;
                  </div>
                )}
              </div>

              {/* Bottom Footer Note with Scroll Quick Buttons */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-[#ffd7c9]/60 font-mono">
                <span>Showing {chartCakes.length} items</span>
                
                {/* Scroll Quick Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => scrollChart('up')}
                    className="w-6 h-6 rounded bg-white/5 hover:bg-[#E3A04B] hover:text-[#1c080e] flex items-center justify-center text-xs transition-colors cursor-pointer"
                    aria-label="Scroll chart up"
                    title="Scroll Up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollChart('down')}
                    className="w-6 h-6 rounded bg-white/5 hover:bg-[#E3A04B] hover:text-[#1c080e] flex items-center justify-center text-xs transition-colors cursor-pointer"
                    aria-label="Scroll chart down"
                    title="Scroll Down"
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}