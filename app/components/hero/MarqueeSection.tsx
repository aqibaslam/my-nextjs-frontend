interface MarqueeImage {
  url: string;
  alternativeText?: string;
}

interface MarqueeSectionProps {
  marqueeImages: MarqueeImage[];
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

export default function MarqueeSection({ marqueeImages }: MarqueeSectionProps) {

  const images = marqueeImages.length > 0
    ? marqueeImages.map((img) => ({
        url: img.url?.startsWith('http') ? img.url : `${STRAPI_URL}${img.url}`,
        alt: img.alternativeText || '',
      }))
    : [
        { url: 'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp', alt: '' },
        { url: 'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp', alt: '' },
        { url: 'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp', alt: '' },
        { url: 'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp', alt: '' },
        { url: 'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp', alt: '' },
      ];

  return (
    <section className="marquee-section">
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-content">
            {images.map((img, i) => (
              <div className="product-card" key={i}>
                <img src={img.url} alt={img.alt} />
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {images.map((img, i) => (
              <div className="product-card" key={i}>
                <img src={img.url} alt={img.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}