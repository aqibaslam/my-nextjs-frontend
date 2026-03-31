import './clutch.css';

interface ClutchReview {
  id: number;
  review_svg?: { url: string };
  clutch_svg?: { url: string };
  clutch_description: string;
  clutch_perosn_image?: { url: string };
  clutch_person_name: string;
  clutch_company_name: string;
}

interface ClutchSectionProps {
  clutch_title: string;
  clutch_title_image: string;
  clutch_review: ClutchReview[];
  strapiUrl: string;
}

function getUrl(url: string, strapiUrl: string) {
  if (!url) return '';
  return url.startsWith('http') ? url : `${strapiUrl}${url}`;
}

export default function ClutchSection({
  clutch_title, clutch_title_image, clutch_review, strapiUrl,
}: ClutchSectionProps) {
  return (
    <section className="clutch-reviews-roi">
      <div className="page-width">
        <div className="main-wrapper-reviews-roi">
          <div className="main-title-with-right-image">
            <div className="title-review">{clutch_title}</div>
            {clutch_title_image && (
              <a href="https://clutch.co/profile/converttco">
                <img className="title-right-image" src={getUrl(clutch_title_image, strapiUrl)} alt="" />
              </a>
            )}
          </div>
          <div className="reviews-grid">
            {clutch_review?.map((review) => (
              <div className="review-card" key={review.id}>
                <div>
                  <div className="main-review-clutch-svg">
                    {review.review_svg?.url && (
                      <img className="reviews-svg-block" src={getUrl(review.review_svg.url, strapiUrl)} alt="" />
                    )}
                    {review.clutch_svg?.url && (
                      <img className="clutch-svg-block" src={getUrl(review.clutch_svg.url, strapiUrl)} alt="" />
                    )}
                  </div>
                  <div className="desc-review-block">{review.clutch_description}</div>
                </div>
                <div className="main-person-info-svg">
                  {review.clutch_perosn_image?.url && (
                    <img className="reviewers-image" src={getUrl(review.clutch_perosn_image.url, strapiUrl)} alt="" />
                  )}
                  <div className="reviewers-info-name-company">
                    <div className="reviewer-name">{review.clutch_person_name}</div>
                    <div className="reviewer-company">{review.clutch_company_name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}