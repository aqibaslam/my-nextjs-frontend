// components/stories/StoriesSection.tsx
'use client';
import { useState } from 'react';
import './stories.css';

interface Review {
  id: number;
  video_vimeo_link: string;
  name: string;
  title: string;
}

function ReviewCard({ review }: { review: Review }) {
  // Use the link directly from the API
  const videoSrc = review.video_vimeo_link;

  return (
    <div className="review">
      <iframe
        className="stories-video"
        src={videoSrc}
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
  reviews = [], 
}: any) {
  // Show all reviews since you want to display all of them
  const allReviews = Array.isArray(reviews) ? reviews : [];

  return (
    <>
      <section className="stories-co-roi desktop-stories" id="reviews">
        <div className="page-width">
          <div className="subtitle">{stories_subtitle}</div>
          <div className="title-with-btn">
            <h2 className="title">{stories_title}</h2>
            <a className="btn-stories" href={stories_cta_url}>
              {stories_cta}
              <img src="https://convertt.co/wp-content/uploads/2026/02/Arrow-Placeholder-1.svg" alt="" />
            </a>
          </div>
          <div className="column">
            {allReviews.map((review: Review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="stories-co-roi mobile-stories">
        <div className="page-width">
          <div className="subtitle">{stories_subtitle}</div>
          <h2 className="title">{stories_title}</h2>
          <div className="column mobile-column">
            {allReviews.map((review: Review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}