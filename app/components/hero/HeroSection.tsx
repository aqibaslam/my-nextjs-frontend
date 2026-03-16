import './hero.css';

interface ListItem {
  id: number;
  list_title: string;
}

interface HeroProps {
  title: string;
  twenty_k_heading: string;
  project_managed_heading: string;
  hero_cta: string;
  hero_cta_url: string;
  hero_rating_heading: string;
  hero_listing: ListItem[];
}

export default function HeroSection({
  title,
  twenty_k_heading,
  project_managed_heading,
  hero_cta,
  hero_cta_url,
  hero_rating_heading,
  hero_listing,
}: HeroProps) {
  return (
    <section className="convertt-hero-roi">
      <div className="hero-page-width">

        {/* Badge */}
        <div className="top-twenty-project">
          <div className="twetnty-heading">{twenty_k_heading}</div>
          <div className="project-heading">{project_managed_heading}</div>
        </div>

        {/* Title */}
        <div className="hero-title">{title}</div>

        {/* Benefits */}
        <div className="main-benefits-hero">
          {hero_listing?.map((item, i) => (
            <div className="block-benefits-hero" key={item.id || i}>
              <img
                className="benefits-block-image"
                src="https://convertt.co/wp-content/uploads/2026/02/teenyicons_tick-circle-outline.svg"
                alt=""
              />
              <div className="benefits-block-heading">{item.list_title}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <a className="main-hero-btn" href={hero_cta_url}>
          {hero_cta}
          <img
            className="hero-btn-svg"
            src="https://convertt.co/wp-content/uploads/2026/02/Arrow-Placeholder-1.svg"
            alt=""
          />
        </a>

        {/* Rating */}
        <div className="main-rating-image-info">
          <div className="rating-heading">{hero_rating_heading}</div>
        </div>

      </div>
    </section>
  );
}