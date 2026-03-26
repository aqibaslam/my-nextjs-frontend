import './whoweare.css';

interface Slide {
  id: number;
  images: {
    url: string;
    alternativeText?: string;
  };
}

interface BrandLogo {
  id: number;
  brand_image: {
    url: string;
    alternativeText?: string;
  };
}

interface WhoWeAreProps {
  who_subtitle: string;
  who_title: string;
  slides: Slide[];
  brandslogo: BrandLogo[];
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

function getUrl(url: string) {
  if (!url) return '';
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

export default function WhoWeAre({
  who_subtitle,
  who_title,
  slides,
  brandslogo,
}: WhoWeAreProps) {
  return (
    <section className="who-we-are-roi">
      <div className="page-width">
        <div className="main-wrapper-who-are-we">

          <div className="subtitle-who">{who_subtitle}</div>
          <div className="desc-who">{who_title}</div>

          {slides?.length > 0 && (
            <div className="main-block-projects-images">
              {slides.map((slide) => (
                <div className="block-project-images" key={slide.id}>
                  {slide.images?.url && (
                    <img
                      className="project-img"
                      src={getUrl(slide.images.url)}
                      alt={slide.images.alternativeText || ''}
                    />
                  )}
                </div>
              ))}
              <div className="block-project-images">
                <a className="project-image-see-more">+ Many more</a>
              </div>
            </div>
          )}

          {brandslogo?.length > 0 && (
            <div className="main-bottom-agencies-images">
              {brandslogo.map((brand) => (
                brand.brand_image?.url && (
                  <img
                    key={brand.id}
                    className="agencies-images"
                    src={getUrl(brand.brand_image.url)}
                    alt={brand.brand_image.alternativeText || ''}
                  />
                )
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}