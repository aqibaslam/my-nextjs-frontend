import HeroSection from './components/hero/HeroSection';
import MarqueeSection from './components/hero/MarqueeSection';

async function getPageData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const page = await getPageData();

  const title = page?.Title || "Achieved Over $1B+ In Revenue For Ecommerce Brands.";
  const contentText = page?.Content?.[0]?.children?.[0]?.text || "We specialize in building High Converting Websites.";

  return (
    <div className="main-three-section-bg" style={{
      backgroundImage: `url(https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh'
    }}>
      <HeroSection title={title} contentText={contentText} />
      <MarqueeSection />
      {/* Aage aur sections yahan add hote rahenge */}
      {/* <AboutSection /> */}
      {/* <ServicesSection /> */}
    </div>
  );
}