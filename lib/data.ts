export interface Branch {
    id: string;
    name: string;
    address?: string;
    mapUrl?: string;
    phone?: string;
    whatsapp?: string;
    reviewUrl?: string;
}
export interface Cake {
    id: string;
    name: string;
    category: string;
    image: string;
    description: string;
    confirmedPricePerKg?: number;
    availability?: 'available' | 'unavailable';
    referenceOnly: boolean;
}
export interface GalleryItem {
    id: string;
    title: string;
    image?: string;
    verified: boolean;
}
export interface Review {
    id: string;
    author: string;
    text: string;
    sourceUrl: string;
}
export interface Category { id: string; name: string; }
export interface Contact { email?: string; instagram?: string; }
export const branches: Branch[] = [{ id: 'olavanna', name: 'Olavanna' }, { id: 'kattukulangara', name: 'Kattukulangara' }, { id: 'kulangarapeedika', name: 'Kulangarapeedika' }];
export const categories: Category[] = [{ id: 'all', name: 'All cakes' }, { id: 'sweet', name: 'Sweet Menu' }, { id: 'chocolate', name: 'Chocolate Dreams' }];
export const cakes: Cake[] = [
    { id: 'red-velvet', name: 'Red Velvet Rose', category: 'sweet', image: '/images/red-velvet.jpg', description: 'A red velvet cake design from the supplied showcase.', referenceOnly: true },
    { id: 'oreo', name: 'Oreo Chocolate', category: 'sweet', image: '/images/chocolate.jpg', description: 'A chocolate celebration cake reference.', referenceOnly: true },
    { id: 'berry', name: 'Royal Berry Gateau', category: 'sweet', image: '/images/berry.jpg', description: 'A berry-topped celebration cake reference.', referenceOnly: true },
    { id: 'ferrero', name: 'Ferrero Rocher', category: 'sweet', image: '/images/cake-placeholder.svg', description: 'A chocolate and hazelnut design reference.', referenceOnly: true },
    { id: 'belgian', name: 'Belgian Truffle', category: 'chocolate', image: '/images/chocolate.jpg', description: 'A dark chocolate cake design from the supplied showcase.', referenceOnly: true },
    { id: 'black-forest', name: 'Black Forest', category: 'chocolate', image: '/images/berry.jpg', description: 'A layered celebration cake design reference.', referenceOnly: true },
    { id: 'dark-truffle', name: 'Dark Truffle Noir', category: 'chocolate', image: '/images/chocolate.jpg', description: 'A chocolate-topped cake design reference.', referenceOnly: true },
    { id: 'caramel', name: 'Salted Caramel Crunch', category: 'chocolate', image: '/images/cake-placeholder.svg', description: 'A caramel cake design reference.', referenceOnly: true }
];
export const gallery: GalleryItem[] = [{ id: 'bakery', title: 'Bakery moments', verified: false }, { id: 'craft', title: 'Behind the bakes', verified: false }, { id: 'celebrate', title: 'Celebrations at Paradise', verified: false }];
export const previousCakes: GalleryItem[] = [{ id: 'birthday', title: 'Birthday celebrations', verified: false }, { id: 'wedding', title: 'Wedding moments', verified: false }, { id: 'unique', title: 'Something uniquely yours', verified: false }];
export const reviews: Review[] = [];
export const contact: Contact = {};
export const customOptions = { shape: ['Round', 'Square', 'Heart'], flavour: ['Vanilla', 'Chocolate', 'Red velvet', 'Butterscotch'], layers: ['1', '2', '3'], weight: ['0.5 kg', '1 kg', '2 kg', '3 kg'], theme: ['Cherry', 'Gold', 'Choco', 'Rose'], topper: ['None', 'Candles', 'Flowers', 'Name board'] };
export const repository = { getBranches: () => branches, getCakes: () => cakes, getCategories: () => categories, getGallery: () => gallery, getPreviousCakes: () => previousCakes, getReviews: () => reviews, getContact: () => contact };
