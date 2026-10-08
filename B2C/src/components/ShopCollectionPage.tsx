/* eslint-disable @next/next/no-img-element -- Reuse existing local collection photography. */
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { catalogue } from '@/lib/catalogue';
import { shopCollections, type ShopCollection } from '@/lib/shop-collections';
import '@/app/shop/shop.css';

export type CollectionSearchParams = Promise<{ sort?: string; page?: string }>;

export default async function ShopCollectionPage({ collection, searchParams }: {
  collection: ShopCollection;
  searchParams: CollectionSearchParams;
}) {
  const edit = shopCollections[collection];
  const params = await searchParams;
  const sort = typeof params.sort === 'string' && ['newest', 'price_asc', 'price_desc'].includes(params.sort)
    ? params.sort : 'newest';
  const page = Math.max(1, Number.parseInt(typeof params.page === 'string' ? params.page : '1', 10) || 1);
  const data = await catalogue(edit.search, sort, page);
  const pageHref = (number: number) => `${edit.href}?${new URLSearchParams({ sort, page: String(number) })}`;

  return (
    <section className="section shop shop-edit shop-collection-page" data-collection={collection}>
      <nav className="shop-breadcrumb" aria-label="Breadcrumb">
        <Link href="/b2c">Home</Link><span>/</span>
        <Link href="/shop">Shop</Link><span>/</span>
        <span aria-current="page">{edit.title}</span>
      </nav>
      <header className="shop-intro">
        <div className="shop-intro-copy">
          <p className="eyebrow">THE COLLECTION</p>
          <h1>{edit.title}</h1>
          <p className="shop-intro-description">{edit.description}</p>
          <Link className="shop-intro-action" href="/build">
            Build your gift <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="shop-intro-visual">
          <img src={edit.image} alt={edit.imageAlt} width={1254} height={1254} />
        </div>
      </header>
      <div className="shop-catalogue-layout">
        <aside className="shop-collections">
          <p className="eyebrow">EXPLORE THE EDIT</p>
          <nav aria-label="Explore collections">
            <Link href="/shop">All gifts <ArrowRight size={13} aria-hidden="true" /></Link>
            {Object.values(shopCollections).map(item => (
              <Link key={item.href} href={item.href} aria-current={item.href === edit.href ? 'page' : undefined}>
                {item.title} <ArrowRight size={13} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <Link className="shop-all-boxes" href="/build">Curate your gift <ArrowRight size={14} aria-hidden="true" /></Link>
        </aside>
        <div className="shop-results">
          {data.products.length > 0 ? (
            <>
              <div className="shop-toolbar">
                <div className="shop-results-meta"><p>{data.total} {data.total === 1 ? 'find' : 'finds'}</p></div>
                {!data.preview && (
                  <form className="shop-sort" action={edit.href}>
                    <label htmlFor="collection-sort" className="collection-sort-label">Sort by</label>
                    <select id="collection-sort" name="sort" defaultValue={sort} aria-label="Sort collection">
                      <option value="newest">Latest additions</option>
                      <option value="price_asc">Price: low to high</option>
                      <option value="price_desc">Price: high to low</option>
                    </select>
                    <button type="submit" className="text-link">Apply</button>
                  </form>
                )}
              </div>
              <div className="product-grid shop-product-grid">
                {data.products.map(product => <ProductCard key={product._id} product={product} compact />)}
              </div>
            </>
          ) : (
            <div className="shop-empty">
              <p className="eyebrow">{edit.title}</p>
              <h2>{page > 1 ? 'Nothing on this page.' : 'More lovely things to come.'}</h2>
              <p>{page > 1 ? 'Return to the beginning of this collection.' : `No ${edit.title.toLowerCase()} to show right now. Explore all gifts or curate your own.`}</p>
              <Link href={page > 1 ? edit.href : '/shop'} className="text-link">
                {page > 1 ? `Back to ${edit.title.toLowerCase()}` : 'Explore all gifts'} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          )}
          {data.pages > 1 && data.products.length > 0 && (
            <nav className="shop-pagination" aria-label={`${edit.title} pages`}>
              {page > 1 ? <Link href={pageHref(page - 1)}><ArrowLeft size={16} aria-hidden="true" /> Previous</Link> : <span />}
              <span>{page} / {data.pages}</span>
              {page < data.pages ? <Link href={pageHref(page + 1)}>Next <ArrowRight size={16} aria-hidden="true" /></Link> : <span />}
            </nav>
          )}
          {data.preview && <p className="shop-preview-note">Collection preview · pricing coming soon.</p>}
        </div>
      </div>
    </section>
  );
}
