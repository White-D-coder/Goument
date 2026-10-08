import Link from 'next/link';
import FooterWordmark from './FooterWordmark';
import './home/home-footer.css';

const corporateSiteUrl = process.env.NEXT_PUBLIC_CORPORATE_SITE_URL || 'https://thegourmetgifts.co/';

const homeFooterColumns = [
	{
		title: 'Shop',
		links: [
			['Hampers', '/shop/hampers'],
			['Envelopes', '/shop/envelopes'],
			['Laddoo Candles', '/shop?search=candles'],
		],
	},
	{
		title: 'Discover',
		links: [
			['Hampers', '/b2c#hampers'],
			['Our Story', '/b2c#our-story'],
			['FAQs', '/b2c#faq'],
			['Corporate Gifting', corporateSiteUrl],
		],
	},
];

function HomeFooter() {
	return <footer className="tgg-home-footer tgg-reference-footer">
		<div className="tgg-home-footer-inner">
			<div className="tgg-home-footer-heading">
				<FooterWordmark className="tgg-home-footer-wordmark" />
				<p>“Thoughtfully Curated, Beautifully Presented.”</p>
			</div>
			<div className="tgg-home-footer-grid">
				{homeFooterColumns.map(column => <nav className="tgg-home-footer-column" aria-label={`Footer ${column.title.toLowerCase()}`} key={column.title}>
					<h2>{column.title}</h2>
					<ul>{column.links.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul>
				</nav>)}
				<div className="tgg-home-footer-contact">
					<h2>Let’s find the right gift.</h2>
					<a href="mailto:hello@thegourmetgifts.co">hello@thegourmetgifts.co</a>
					<p>Mumbai, India</p>
					<div className="tgg-home-footer-entity"><span>House of Satra Pvt Ltd.</span><span>GST: 27AAICH9186M1ZP</span></div>
				</div>
			</div>
			<div className="tgg-home-footer-bottom"><span>© {new Date().getFullYear()} The Gourmet Gifts.</span><span>Luxury Artisanal Gifting &amp; Curations</span></div>
		</div>
	</footer>;
}

const footerColumns = [
	{
		title: 'Occasions',
		links: [
			['Employee Gifting', '/shop?search=corporate'],
			['Client Gifting', '/shop?search=corporate'],
			['Festive Gifting', '/shop?search=festive'],
			['Events & Conferences', '/shop?search=corporate'],
			['Milestones & Recognition', '/shop?search=keepsakes'],
			['Dealer & Partner Gifting', '/shop?search=corporate'],
			['Celebrations', '/shop?search=decor'],
			['CX Gifting', '/shop?search=corporate'],
		],
	},
	{
		title: 'Catalogue Categories',
		links: [
			['Gourmet Food', '/shop?search=gourmet'],
			['Beverages', '/shop?search=tea'],
			['Decor & Spiritual', '/shop?search=decor'],
			['Eternal Paper Co', '/shop?search=stationery'],
			['Wellness & Lifestyle', '/shop?search=wellness'],
			['3D Miniatures', '/shop?search=miniatures'],
			['Office & Travel Bags', '/shop?search=travel'],
			['Electronics', '/shop?search=electronics'],
			['Stationery & Desk', '/shop?search=stationery'],
			['Corporate Apparel', '/shop?search=apparel'],
			['Recognition & Trophies', '/shop?search=recognition'],
		],
	},
	{
		title: 'Quick Navigation',
		links: [
			['Home', '/'],
			['Contact Us', 'mailto:hello@thegourmetgifts.co'],
		],
	},
	{
		title: 'Concierge Direct',
		entity: {
			company: 'House of Satra Pvt Ltd.',
			gst: 'GST: 27AAICH9186M1ZP',
		},
		links: [
			['hello@thegourmetgifts.co', 'mailto:hello@thegourmetgifts.co'],
			['Mumbai, India', '/#our-story'],
		],
	},
];

export default function Footer({ home = false }: { home?: boolean }) {
	if (home) return <HomeFooter />;
	return (
		<footer className="b2b-store-footer tgg-reference-footer">
			<div className="b2b-footer-inner">
				<div className="b2b-footer-heading">
					<FooterWordmark className="b2b-footer-wordmark" />
					<p>“Thoughtfully Curated, Beautifully Presented.”</p>
				</div>

				<div className="b2b-footer-columns">
					{footerColumns.map((column) => (
						<div className="b2b-footer-column" key={column.title}>
							<h2>{column.title}</h2>
							<ul>
								{column.entity && (
									<li className="b2b-footer-entity">
										<span>{column.entity.company}</span>
										<span>{column.entity.gst}</span>
									</li>
								)}
								{column.links.map(([label, href]) => (
									<li key={label}>
										{href.startsWith('mailto:') ? (
											<a href={href}>{label}</a>
										) : (
											<Link href={href}>{label}</Link>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="b2b-footer-bottom">
					<span>© {new Date().getFullYear()} The Gourmet Gifts.</span>
					<span>Luxury Artisanal Gifting &amp; Curations</span>
				</div>
			</div>
		</footer>
	);
}
