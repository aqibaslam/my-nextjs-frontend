import HeroSection from './components/hero/HeroSection';
import MarqueeSection from './components/hero/MarqueeSection';
import WhoWeAre from './components/whoweare/WhoWeAre';
import StoriesSection from './components/stories/StoriesSection';
import WaveSection from './components/wave/WaveSection';

async function getPageData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?populate[HeroListings]=*&populate[MarqueeImages][populate]=*&populate[slides][populate]=*&populate[brandslogo][populate]=*&populate[Review][fields][0]=video_vimeo_link&populate[Review][fields][1]=name&populate[Review][fields][2]=title&populate[wave_listing]=*`,
      { cache: 'no-store' }
    );
    const json = await res.json();
    return json.data?.[0] || null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function Home() {
  const page = await getPageData();

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  const marqueeImages = page?.MarqueeImages?.flatMap((item: any) =>
    item.MarqueeImage?.map((img: any) => ({
      url: img.url.startsWith('http') ? img.url : `${strapiUrl}${img.url}`,
      alternativeText: img.alternativeText || '',
    })) || []
  ) || [];

  const waveListing = page?.wave_listing
    ? [{ id: page.wave_listing.id, list_heading: page.wave_listing.list_heading }]
    : [];

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
        strapiUrl={strapiUrl}
      />
      <StoriesSection
        stories_subtitle={page?.stories_subtitle || "REAL STORIES"}
        stories_title={page?.stories_title || "Don't take our word for it."}
        stories_cta={page?.stories_cta || "Get Your FREE Audit Now!"}
        stories_cta_url={page?.stories_cta_url || "#"}
        reviews={page?.Review || []}
      />
      <WaveSection
        wave_title={page?.wave_title || "Wave goodbye to..."}
        wave_title_image={page?.wave_title_image?.url
          ? page.wave_title_image.url.startsWith('http')
            ? page.wave_title_image.url
            : `${strapiUrl}${page.wave_title_image.url}`
          : ""}
        wave_listing_block={waveListing}
        strapiUrl={strapiUrl}
      />
    </div>
  );
}