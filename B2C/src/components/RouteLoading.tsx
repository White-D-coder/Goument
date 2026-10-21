import './route-loading.css';

type Variant = 'catalogue' | 'product' | 'cart' | 'account' | 'checkout' | 'builder';
const messages: Record<Variant, string> = {
  catalogue: 'Loading the collection…', product: 'Loading your gift…',
  cart: 'Loading your gift bag…', account: 'Loading your account…',
  checkout: 'Checking your account and gift…', builder: 'Loading your gift selection…',
};

function Lines() {
  return <div className="loading-lines"><span /><span /><span /></div>;
}

/** Decorative placeholders only: no invented products, amounts or enabled controls. */
export default function RouteLoading({ variant, embedded = false }: { variant?: Variant; embedded?: boolean }) {
  // Preserve the separate admin fallback and Home's existing loading boundary.
  if (!variant) return <div className="section empty" style={{ minHeight: 'calc(100svh - 76px)' }} role="status"><span className="spinner" /><p>Finding something lovely…</p></div>;
  const listing = variant === 'catalogue' || variant === 'builder';
  return <div className={`route-loading route-loading--${variant}${embedded ? ' route-loading--embedded' : ' section'}`} role="status" aria-live="polite" aria-atomic="true">
    <span className="route-loading-label">{messages[variant]}</span>
    <div aria-hidden="true">
      {!embedded && <div className="loading-intro"><span /><span /></div>}
      {listing ? <div className="loading-card-grid">{Array.from({ length: 6 }, (_, index) => <div className="loading-card" key={index}><div className="loading-photo" /><Lines /></div>)}</div>
        : variant === 'product' ? <div className="loading-layout"><div className="loading-photo" /><div className="loading-panel"><Lines /><span className="loading-control" /><span className="loading-control" /></div></div>
        : variant === 'account' ? <div className="loading-layout"><Lines /><div className="loading-panel"><Lines /><span className="loading-control" /><span className="loading-control" /><span className="loading-control" /></div></div>
        : <div className="loading-layout"><div className="loading-panel">{variant === 'cart' ? [0, 1].map(index => <div className="loading-cart-row" key={index}><div className="loading-photo" /><Lines /></div>) : <><Lines />{[0, 1, 2, 3].map(index => <span className="loading-control" key={index} />)}</>}</div><div className="loading-panel"><Lines /><span className="loading-control" /></div></div>}
    </div>
  </div>;
}
