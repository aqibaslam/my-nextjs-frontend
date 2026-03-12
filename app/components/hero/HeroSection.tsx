import './hero.css';

interface HeroProps {
  title: string;
  contentText: string;
}

export default function HeroSection({ title, contentText }: HeroProps) {
  return (
    <section className="convertt-hero-roi">
      <div className="hero-page-width">

        {/* Badge */}
        <div className="top-twenty-project">
          <div className="twetnty-heading">20K+</div>
          <div className="project-heading">Projects Managed</div>
        </div>

        {/* Title — Strapi se */}
        <div className="hero-title">{title}</div>

        {/* Benefits — Static */}
        <div className="main-benefits-hero">
          <div className="block-benefits-hero">
            <img className="benefits-block-image"
              src="https://convertt.co/wp-content/uploads/2026/02/teenyicons_tick-circle-outline.svg"
              alt="" />
            {/* Content — Strapi se */}
            <div className="benefits-block-heading">{contentText}</div>
          </div>
          <div className="block-benefits-hero">
            <img className="benefits-block-image"
              src="https://convertt.co/wp-content/uploads/2026/02/teenyicons_tick-circle-outline.svg"
              alt="" />
            <div className="benefits-block-heading">High Converting Designs</div>
          </div>
          <div className="block-benefits-hero">
            <img className="benefits-block-image"
              src="https://convertt.co/wp-content/uploads/2026/02/teenyicons_tick-circle-outline.svg"
              alt="" />
            <div className="benefits-block-heading">Proven Results</div>
          </div>
        </div>

        {/* CTA Button — Static */}
        <a className="main-hero-btn" href="#">
          Get Started Today
          <img className="hero-btn-svg"
            src="https://convertt.co/wp-content/uploads/2026/02/Arrow-Placeholder-1.svg"
            alt="" />
        </a>

        {/* Rating — Static */}
        <div className="main-rating-image-info">
          <div className="rating-heading">⭐⭐⭐⭐⭐ Trusted by 1000+ brands</div>
        </div>

      </div>
    </section>
  );
}