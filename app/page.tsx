import HeroSection from './components/hero/HeroSection';
import MarqueeSection from './components/hero/MarqueeSection';

async function getPageData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?populate[HeroListings]=*&populate[MarqueeImages][populate]=*`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function Home() {
  const page = await getPageData();

  // MarqueeImages se URLs nikaalo
  const marqueeImages = page?.MarqueeImages?.flatMap((item: any) =>
    item.MarqueeImage?.map((img: any) => ({
      url: img.url,
      alternativeText: img.alternativeText || '',
    })) || []
  ) || [];

  return (
    <div
      className="main-three-section-bg"
      style={{
        backgroundImage: `url(https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh'
      }}
    >
      <HeroSection
        title={page?.Title || ""}
        twenty_k_heading={page?.twenty_k_heading || "20K+"}
        project_managed_heading={page?.project_managed_heading || "Projects Managed"}
        hero_cta={page?.hero_cta || "Get Started Today"}
        hero_cta_url={page?.hero_cta_url || "#"}
        hero_rating_heading={page?.hero_rating_heading || ""}
        hero_listing={page?.HeroListings || []}
      />
      <MarqueeSection marqueeImages={marqueeImages} />
    </div>
  );
}