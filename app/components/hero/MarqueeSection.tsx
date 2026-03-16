interface MarqueeImage {
  url: string;
  alternativeText?: string;
}

interface MarqueeSectionProps {
  marqueeImages: MarqueeImage[];
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

const fallbackImages = [
  { url: 'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp', alt: '' },
  { url: 'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp', alt: '' },
  { url: 'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp', alt: '' },
  { url: 'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp', alt: '' },
  { url: 'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp', alt: '' },
];

export default function MarqueeSection({ marqueeImages }: MarqueeSectionProps) {

  const baseImages = marqueeImages?.length > 0
    ? marqueeImages.map((img) => ({
        url: img.url.startsWith('http') ? img.url : `${STRAPI_URL}${img.url}`,
        alt: img.alternativeText || '',
      }))
    : fallbackImages;

  // 3 baar repeat karo seamless infinite loop ke liye
  const images = [...baseImages, ...baseImages, ...baseImages];

  return (
    <section className="marquee-section">
      <div className="marquee-container">
        <div className="marquee-track">
          {images.map((img, i) => (
            <div className="product-card" key={i}>
              <img src={img.url} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}