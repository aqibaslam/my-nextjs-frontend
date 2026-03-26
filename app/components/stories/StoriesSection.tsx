'use client';
import { useState } from 'react';
import './stories.css';

interface Review {
  id: number;
  video_vimeo_link: string;
  name: string;
  title: string;
}

interface StoriesSectionProps {
  stories_subtitle: string;
  stories_title: string;
  stories_cta: string;
  stories_cta_url: string;
  reviews: Review[];
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="review">
      <iframe
        className="stories-video"
        src={`${review.video_vimeo_link}?autoplay=0&controls=1`}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
      <div className="main-content-on-video">
        <div className="main-name-prof-svg">
          <span className="content-desc">{review.name}</span>
        </div>
        <div className="content-name">{review.title}</div>
      </div>
    </div>
  );
}

export default function StoriesSection({
  stories_subtitle,
  stories_title,
  stories_cta,
  stories_cta_url,
  reviews,
}: StoriesSectionProps) {
  const [desktopCount, setDesktopCount] = useState(8);
  const [mobileCount, setMobileCount] = useState(4);

  const desktopReviews = reviews.slice(0, desktopCount);
  const mobileReviews = reviews.slice(0, mobileCount);

  return (
    <>
      {/* Desktop */}
      <section className="stories-co-roi desktop-stories" id="reviews">
        <div className="page-width">
          <div className="main-wrapper-stories-co-roi">
            <div className="subtitle">{stories_subtitle}</div>
            <div className="title-with-btn">
              <h2 className="title">{stories_title}</h2>
              <div className="main-btn-stories">
                <a className="btn-stories" href={stories_cta_url}>
                  {stories_cta}
                  <img
                    className="arrow-btn-vid"
                    src="https://convertt.co/wp-content/uploads/2026/02/Arrow-Placeholder-1.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>

            <div className="column" id="storiesContainer">
              {desktopReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {desktopCount < reviews.length && (
              <div className="load-more-wrapper">
                <button
                  className="load-more-btn"
                  onClick={() => setDesktopCount(desktopCount + 4)}
                >
                  See More
                  <img
                    src="https://convertt.co/wp-content/uploads/2026/02/Arrow-Placeholder-3.svg"
                    alt=""
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="stories-co-roi mobile-stories">
        <div className="page-width">
          <div className="main-wrapper-stories-co-roi">
            <div className="subtitle">{stories_subtitle}</div>
            <div className="title-with-btn">
              <h2 className="title">{stories_title}</h2>
            </div>

            <div className="column mobile-column" id="storiesContainerMobile">
              {mobileReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {mobileCount < reviews.length && (
              <div className="load-more-wrapper">
                <button
                  className="load-more-btn"
                  onClick={() => setMobileCount(mobileCount + 2)}
                >
                  See More
                  <img
                    src="https://convertt.co/wp-content/uploads/2026/02/Arrow-Placeholder-3.svg"
                    alt=""
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}