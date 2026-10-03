import Link from 'next/link';

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

export default function Footer() {
	return (
		<footer className="b2b-store-footer">
			<div className="b2b-footer-inner">
				<div className="b2b-footer-heading">
					<Link href="/b2c" className="b2b-footer-wordmark" aria-label="The Gourmet Gifts home">
						<span>THE</span>
						<span>GOURMET</span>
						<span>GIFTS</span>
					</Link>
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
