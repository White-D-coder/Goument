import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import ProductPhoto from '@/components/ProductPhoto';

export default function ShopCategoryLink({ href, label, image, active = false }: {
  href: string; label: string; image: string; active?: boolean;
}) {
  return <Link href={href} aria-current={active ? 'page' : undefined}>
    <span className="shop-category-photo">
      <ProductPhoto src={image} alt="" sizes="76px" />
      {active && <span className="shop-category-check"><Check size={12} strokeWidth={2} aria-hidden="true" /></span>}
    </span>
    <span className="shop-category-label">{label}</span>
    <ArrowRight size={13} aria-hidden="true" />
  </Link>;
}
