// Ad-ready layout hook. Renders nothing unless NEXT_PUBLIC_ADS_ENABLED=true, so the default site has no ads and no layout shift.
// To use AdSense or a sponsor block later: render the provider's snippet inside, keep the reserved min-height, and
// update the Privacy and Cookie pages and the consent banner first (ads need consent in many regions).
export default function AdSlot({ id, minHeight = 250 }: { id: string; minHeight?: number }) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== "true") return null;
  return <aside aria-label="Advertisement" data-ad-slot={id} className="my-8 rounded-md border border-line" style={{ minHeight }} />;
}
