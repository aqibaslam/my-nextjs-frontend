// components/stories/StoriesSection.tsx
'use client';
import { useState } from 'react';
import './stories.css';

interface Review {
  id: number;
  video_vimeo_link: string;
  name?: string;
  title?: string;
}

function ReviewCard({ review }: { review: Review }) {
  const videoSrc = review.video_vimeo_link || "";
  return (
    <div className="review">
      <iframe
        className="stories-video"
        src={videoSrc.includes('?') ? `${videoSrc}&autoplay=0` : `${videoSrc}?autoplay=0`}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
      {review.name && (
        <div className="main-content-on-video">
          <div className="main-name-prof-svg">
            <span className="content-desc">{review.name}</span>
          </div>
          <div className="content-name">{review.title}</div>
        </div>
      )}
    </div>
  );
}

export default function StoriesSection({
  stories_subtitle,
  stories_title,
  stories_cta,
  stories_cta_url,
  reviews = [], 
}: any) {
  const [desktopCount, setDesktopCount] = useState(8);
  const [mobileCount, setMobileCount] = useState(4);

  const desktopReviews = Array.isArray(reviews) ? reviews.slice(0, desktopCount) : [];
  const mobileReviews = Array.isArray(reviews) ? reviews.slice(0, mobileCount) : [];

  return (
    <>
      <section className="stories-co-roi desktop-stories" id="reviews">
        <div className="page-width">
          <div className="subtitle">{stories_subtitle}</div>
          <div className="title-with-btn">
            <h2 className="title">{stories_title}</h2>
            <a className="btn-stories" href={stories_cta_url}>
              {stories_cta}
              <img className="arrow-btn-vid" src="https://convertt.co/wp-content/uploads/2026/02/Arrow-Placeholder-1.svg" alt="" />
            </a>
          </div>
          <div className="column">
            {desktopReviews.map((review: Review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="stories-co-roi mobile-stories">
        <div className="page-width">
          <div className="subtitle">{stories_subtitle}</div>
          <h2 className="title">{stories_title}</h2>
          <div className="column mobile-column">
            {mobileReviews.map((review: Review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}