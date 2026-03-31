'use client';
import { useState } from 'react';
import './faq.css';

interface FaqItem {
  id: number;
  left_faq_question?: string;
  left_faq_answere?: string;
  right_faq_question?: string;
  right_faq_answere?: string;
}

interface FaqSectionProps {
  left_column_block: FaqItem[];
  right_column_block: FaqItem[];
}

function FaqItemComponent({ question, answer }: { question: string; answer: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className={`faq-item${active ? ' active' : ''}`} onClick={() => setActive(!active)}>
      <div className="faq-question">
        <span className="faq-title-block">{question}</span>
        <button className="faq-toggle">
          {active ? (
            <img src="https://convertt.co/wp-content/uploads/2026/02/Container-19.svg" alt="" />
          ) : (
            <img src="https://convertt.co/wp-content/uploads/2026/02/Container-20.svg" alt="" />
          )}
        </button>
      </div>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function FaqSection({ left_column_block, right_column_block }: FaqSectionProps) {
  return (
    <section className="faq-section">
      <div className="page-width">
        <h2 className="faq-title">FAQs</h2>
        <div className="faq-container">
          <div className="faq-column">
            {left_column_block?.map((item) => (
              item.left_faq_question && item.left_faq_answere && (
                <FaqItemComponent
                  key={item.id}
                  question={item.left_faq_question}
                  answer={item.left_faq_answere}
                />
              )
            ))}
          </div>
          <div className="faq-column">
            {right_column_block?.map((item) => (
              item.right_faq_question && item.right_faq_answere && (
                <FaqItemComponent
                  key={item.id}
                  question={item.right_faq_question}
                  answer={item.right_faq_answere}
                />
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}