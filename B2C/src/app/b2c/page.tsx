/* eslint-disable @next/next/no-img-element -- Existing local catalogue photography. */
import Link from 'next/link';
import { ArrowRight, Gift, Heart, Leaf, Gem } from 'lucide-react';
import HeroSlideshow from '@/components/HeroSlideshow';
import HeroTitle from '@/components/HeroTitle';
import GoldPopperSprinkle from '@/components/GoldPopperSprinkle';
import ShoppingRail from '@/components/ShoppingRail';

const collections = [
 ['Shagun Envelopes','/images/items/shagun_envelopes.webp','shagun'],
 ['Laddoo Candles','/images/items/laddoo_candles.webp','candles'],
 ['Bookmarks','/images/items/bookmarks.webp','bookmarks'],
 ['Diary & Pen Sets','/images/items/sustainable_diary_bottle_pen.webp','corporate'],
];

const occasions = [
 ['Weddings & Shagun','/images/items/shagun_envelopes.webp','shagun'],
 ['Festive & Celebrations','/images/items/laddoo_candles.webp','candles'],
 ['Thoughtful Keepsakes','/images/items/bookmarks.webp','bookmarks'],
 ['Corporate Branding','/images/items/sustainable_diary_bottle_pen.webp','corporate'],
];

const shop = (query:string) => `/shop${query ? `?search=${encodeURIComponent(query)}` : ''}`;

export default function Home() {
 return <div className="reference-home commerce-home">
  <GoldPopperSprinkle />
  <section className="gift-hero hero-editorial" aria-labelledby="hero-title">
   <HeroSlideshow/>
   <div className="gift-hero-shade" aria-hidden="true"/>
   <HeroTitle/>
  </section>
  <section className="home-section collection-section">
   <div className="section-heading" data-reveal>
    <h2>Shop Our Collections</h2>
    <Link className="text-link" href="/shop">View All <ArrowRight size={14}/></Link>
   </div>
   <ShoppingRail className="collection-circles" label="Collections">
    {collections.map(([title,image,query],index)=>(
     <Link data-reveal data-reveal-delay={index*50} key={title} href={shop(query)}>
      <div><img src={image} alt="" loading="lazy" decoding="async"/></div>
      <h3>{title}</h3>
     </Link>
    ))}
   </ShoppingRail>
  </section>
  <section className="home-section" id="occasions">
   <div className="section-heading" data-reveal>
    <h2>Gifts for Every Occasion</h2>
    <Link className="text-link" href="/shop">Explore All Gifts <ArrowRight size={14}/></Link>
   </div>
   <ShoppingRail className="occasion-grid" label="Occasions">
    {occasions.map(([title,image,query],index)=>(
     <Link data-reveal data-reveal-delay={index*50} href={shop(query)} key={title}>
      <img src={image} alt="" loading="lazy" decoding="async"/>
      <h3><span className="occasion-label">{title}</span></h3>
     </Link>
    ))}
   </ShoppingRail>
  </section>
  <section className="assurance-strip" aria-label="Our approach">
   {[[Gem,'Considered Details','The little things, beautifully chosen'],[Gift,'Beautiful Packaging','Made for the joy of unwrapping'],[Leaf,'Everyday Indulgence','A moment to savour'],[Heart,'A Personal Touch','For someone who matters']].map(([Icon,title,copy])=>{
    const Symbol=Icon as typeof Gift;
    return <div data-reveal key={String(title)}><Symbol size={30} strokeWidth={1}/><h3>{String(title)}</h3><p>{String(copy)}</p></div>;
   })}
  </section>
  <section className="brand-story" id="our-story" data-reveal>
   <p className="eyebrow">THE ART OF GIFTING</p>
   <h2>Thoughtfully Curated, Beautifully Given.</h2>
   <p>From artisanal flavours to handcrafted keepsakes, each gift is chosen to create an unforgettable moment.</p>
   <Link className="text-link" href="/shop">Explore the Collection <ArrowRight size={14}/></Link>
  </section>
 </div>;
}
