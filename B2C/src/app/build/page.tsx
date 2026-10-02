import GiftBuilder from '@/components/GiftBuilder';
export const metadata = {title:'Make your gift'};
export default async function Build({searchParams}:{searchParams:Promise<{box?:string}>}) {const {box}=await searchParams;return <GiftBuilder selectedBox={box}/>;}
