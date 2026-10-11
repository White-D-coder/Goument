'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Check, SlidersHorizontal, X } from 'lucide-react';

export default function ShopMobileFilters({ categories, action, search, sort, showSort }: {
  categories: { label: string; href: string; active: boolean }[];
  action: string;
  search?: string;
  sort: string;
  showSort: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width:641px)');
    const closeOnDesktop = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return <div className="shop-mobile-filters">
    <div className="shop-filter-bar">
      <button type="button" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
        <SlidersHorizontal size={17} aria-hidden="true" /> Filter
      </button>
    </div>
    <dialog ref={dialog} className="shop-filter-sheet" aria-label="Filter collection"
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="shop-filter-sheet-content">
        <div className="shop-filter-sheet-heading">
          <h2>Filter collection</h2>
          <button type="button" aria-label="Close filters" onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
        </div>
        <nav aria-label="Filter by collection">
          {categories.map(category => <Link key={category.href} href={category.href}
            aria-current={category.active ? 'page' : undefined} onClick={() => dialog.current?.close()}>
            {category.label}{category.active && <Check size={17} aria-hidden="true" />}
          </Link>)}
        </nav>
        {showSort && <form action={action} className="shop-filter-sort">
          {search !== undefined && <input type="hidden" name="search" value={search} />}
          <label>Sort by
            <select name="sort" defaultValue={sort}>
              <option value="newest">Latest additions</option>
              <option value="price_asc">Price: low to high</option>
              <option value="price_desc">Price: high to low</option>
            </select>
          </label>
          <button type="submit">Apply sort</button>
        </form>}
      </div>
    </dialog>
  </div>;
}
