import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Cake World — Paradise Bakes & Patisserie',
  description:
    'Step into Our Cake World at Paradise Bakes. Browse our chilled 2-shelf vitrine refrigerator, discover 28 handcrafted artisanal cakes, and order directly on WhatsApp.',
};

export default function CakeWorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
