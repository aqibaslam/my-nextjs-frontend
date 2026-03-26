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
  strapiUrl: string;
}

function getUrl(url: string, strapiUrl: string) {
  if (!url) return '';
  return url.startsWith('http') ? url : `${strapiUrl}${url}`;
}

export default function WhoWeAre({
  who_subtitle,
  who_title,
  slides,
  brandslogo,
  strapiUrl,
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
                      src={getUrl(slide.images.url, strapiUrl)}
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
                    src={getUrl(brand.brand_image.url, strapiUrl)}
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