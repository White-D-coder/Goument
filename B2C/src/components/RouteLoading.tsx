/** Shared route fallback; Home deliberately renders outside a loading boundary. */
export default function RouteLoading() {
  return <div className="section empty" role="status"><span className="spinner" /><p>Finding something lovely…</p></div>;
}
