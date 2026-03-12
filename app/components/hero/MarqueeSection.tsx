const marqueeImages = [
  'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp',
  'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp',
  'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp',
  'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp',
  'https://convertt.co/wp-content/uploads/2026/02/Background_mask-group-scaled.webp',
];

export default function MarqueeSection() {
  return (
    <section className="marquee-section">
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-content">
            {marqueeImages.map((img, i) => (
              <div className="product-card" key={i}>
                <img src={img} alt="" />
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {marqueeImages.map((img, i) => (
              <div className="product-card" key={i}>
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}