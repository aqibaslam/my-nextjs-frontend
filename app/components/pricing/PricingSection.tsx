import './pricing.css';

interface PricingCardItem {
  id: number;
  listing?: { id: number; list_heading: string }[];
}

interface PricingCard {
  id: number;
  card_title: string;
  card_description: string;
  price_heading: string;
  price_subheading: string;
  cta_text: string;
  cta_url: string;
  listing?: { id: number; list_heading: string }[];
}

interface PricingSectionProps {
  pricing_title: string;
  pricing_cards: PricingCard[];
}

export default function PricingSection({ pricing_title, pricing_cards }: PricingSectionProps) {
  return (
    <section className="pricing-roi">
      <div className="page-width">
        <div className="main-wrapper-pricing-roi">
          <div className="title-pricing-roi">{pricing_title}</div>
          <div className="main-wrapper-pricing-block">
            {pricing_cards?.map((card) => (
              <div className="pricing-card" key={card.id}>
                <div className="card-top">
                  <div className="title-block">{card.card_title}</div>
                  <div className="title-desc">{card.card_description}</div>
                  <div className="main-price-one-time">
                    <div className="price-heading">{card.price_heading}</div>
                    <div className="one-heading">{card.price_subheading}</div>
                  </div>
                  <a className="price-block-btn" href={card.cta_url || '#'}>
                    {card.cta_text}
                    <img className="price-btn-image"
                      src="https://convertt.co/wp-content/uploads/2026/02/Arrow-Placeholder-1.svg"
                      alt="" />
                  </a>
                </div>
                {card.listing && card.listing.length > 0 && (
                  <div className="card-bottom">
                    <ul className="main-listing-price">
                      {card.listing.map((item) => (
                        <li className="listing-price" key={item.id}>
                          {item.list_heading}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}