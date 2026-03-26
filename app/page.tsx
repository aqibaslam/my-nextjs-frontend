import HeroSection from './components/hero/HeroSection';
import MarqueeSection from './components/hero/MarqueeSection';
import WhoWeAre from './components/whoweare/WhoWeAre';
import StoriesSection from './components/stories/StoriesSection';

async function getPageData() {
  try {
    const res = await fetch(
      // 1. Added &populate[Review]=* to the URL to fetch the video component data
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?populate[HeroListings]=*&populate[MarqueeImages][populate]=*&populate[slides][populate]=*&populate[brandslogo][populate]=*&populate[Review]=*`,
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
  // 2. You only need to fetch the page data now
  const page = await getPageData();

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
      <WhoWeAre
        who_subtitle={page?.who_subtitle || ""}
        who_title={page?.who_title || ""}
        slides={page?.slides || []}
        brandslogo={page?.brandslogo || []}
        strapiUrl={process.env.NEXT_PUBLIC_STRAPI_URL || ''}
      />
      <StoriesSection
        stories_subtitle={page?.stories_subtitle || "CLIENT STORIES"}
        stories_title={page?.stories_title || "Real Brands. Real Results."}
        stories_cta={page?.stories_cta || "See All Stories"}
        stories_cta_url={page?.stories_cta_url || "#"}
        // 3. This matches the capital 'R' in your Strapi screenshot component
        reviews={page?.Review || []} 
      />
    </div>
  );
}