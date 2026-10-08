import Image from 'next/image';

export default function HomeHeroPhoto() {
  return <Image src="/images/pics/hero_slide2.webp"
    alt="An open lavender Gourmet Gifts hamper with tea, Indian snacks and thoughtful keepsakes"
    width={1448} height={1086} preload
    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 54vw, 740px" />;
}
