import BoxCard from '@/components/BoxCard';
import boxes from '@/lib/boxes.json';
export const metadata = {title:'Choose your gift box'};
export default function Boxes() {return <section className="section boxes-edit"><p className="eyebrow">THE GOURMET SIGNATURE EDIT</p><h1>A beautiful beginning.</h1><p className="section-intro">Choose your box, then make it theirs.</p><div className="boxes-grid">{boxes.map(box=><BoxCard key={box.id} box={box}/>)}</div></section>;}
