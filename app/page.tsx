import HeroSection from './components/hero/HeroSection';
import MarqueeSection from './components/hero/MarqueeSection';
import WhoWeAre from './components/whoweare/WhoWeAre';
import StoriesSection from './components/stories/StoriesSection';
import WaveSection from './components/wave/WaveSection';
import ConversionSection from './components/conversion/ConversionSection';
import PricingSection from './components/pricing/PricingSection';
import CalculatorSection from './components/calculator/CalculatorSection';
import ReadySection from './components/ready/ReadySection';
import ClutchSection from './components/clutch/ClutchSection';
import FaqSection from './components/faq/FaqSection';

// Fallback ensures images always load even if env var is missing
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://my-strapi-backend-production-d272.up.railway.app';

function imgUrl(url?: string): string {
  if (!url) return '';
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

async function getPageData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?populate[HeroListings]=*&populate[MarqueeImages][populate]=*&populate[slides][populate]=*&populate[brandslogo][populate]=*&populate[Review][fields][0]=video_vimeo_link&populate[Review][fields][1]=name&populate[Review][fields][2]=title&populate[wave_listing]=*`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      console.error('Strapi fetch failed:', res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    return json.data?.[0] || null;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

export default async function Home() {
  const page = await getPageData();

  const marqueeImages = page?.MarqueeImages?.flatMap((item: any) =>
    item.MarqueeImage?.map((img: any) => ({
      url: imgUrl(img.url),
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
        strapiUrl={STRAPI_URL}
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
        wave_title_image={imgUrl(page?.wave_title_image?.url)}
        wave_listing_block={page?.wave_listing || []}
        strapiUrl={STRAPI_URL}
      />

      <ConversionSection
        conversion_title={page?.conversion_title || ""}
        conversion_description={page?.conversion_description || ""}
        pink_card_title={page?.pink_card_title || ""}
        pink_card_image={imgUrl(page?.pink_card_image?.url)}
        grey_card_title={page?.grey_card_title || ""}
        grey_card_image={imgUrl(page?.grey_card_image?.url)}
        pink_listing={page?.pink_listing || []}
        grey_listing={page?.grey_listing || []}
        strapiUrl={STRAPI_URL}
      />

      <PricingSection
        pricing_title={page?.pricing_title || ""}
        pricing_cards={page?.pricing_cards || []}
      />

      <CalculatorSection
        calculator_title={page?.calculator_title || ""}
        the_number_heading={page?.the_number_heading || ""}
        fint_out_heading={page?.fint_out_heading || ""}
        left_title={page?.left_title || ""}
        left_desc={page?.left_desc || ""}
        monthly_heading={page?.monthly_heading || ""}
        average_heading={page?.average_heading || ""}
        current_conversion_heading={page?.current_conversion_heading || ""}
        current_monthly_heading={page?.current_monthly_heading || ""}
        right_title={page?.right_title || ""}
        right_description={page?.right_description || ""}
        new_conversion_heading={page?.new_conversion_heading || ""}
        extra_revenue_heading={page?.extra_revenue_heading || ""}
        last_desc={page?.last_desc || ""}
        calculator_cta={page?.calculator_cta || ""}
        calculator_cta_url={page?.calculator_cta_url || "#"}
      />

      <ReadySection
        ready_subtitle={page?.ready_subtitle || ""}
        ready_title={page?.ready_title || ""}
        available_image={imgUrl(page?.available_image?.url)}
        available_heading={page?.available_heading || ""}
        person_first_image={imgUrl(page?.person_first_image?.url)}
        person_second_image={imgUrl(page?.person_second_image?.url)}
        plus_image={imgUrl(page?.plus_image?.url)}
        you_image={imgUrl(page?.you_image?.url)}
        quick_heading={page?.quick_heading || ""}
        pick_heading={page?.pick_heading || ""}
        ready_cta={page?.ready_cta || ""}
        ready_cta_url={page?.ready_cta_url || "#"}
        strapiUrl={STRAPI_URL}
      />

      <ClutchSection
        clutch_title={page?.clutch_title || ""}
        clutch_title_image={imgUrl(page?.clutch_title_image?.url)}
        clutch_review={page?.clutch_review || []}
        strapiUrl={STRAPI_URL}
      />

      <FaqSection
        left_column_block={page?.left_column_block || []}
        right_column_block={page?.right_column_block || []}
      />
    </div>
  );
}
