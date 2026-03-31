import './conversion.css';

interface ListItem {
  id: number;
  pink_list_heading?: string;
  grey_list_heading?: string;
}

interface ConversionSectionProps {
  conversion_title: string;
  conversion_description: string;
  pink_card_title: string;
  pink_card_image: string;
  grey_card_title: string;
  grey_card_image: string;
  pink_listing: ListItem[];
  grey_listing: ListItem[];
  strapiUrl: string;
}

function getUrl(url: string, strapiUrl: string) {
  if (!url) return '';
  return url.startsWith('http') ? url : `${strapiUrl}${url}`;
}

export default function ConversionSection({
  conversion_title,
  conversion_description,
  pink_card_title,
  pink_card_image,
  grey_card_title,
  grey_card_image,
  pink_listing,
  grey_listing,
  strapiUrl,
}: ConversionSectionProps) {
  return (
    <section className="conversion-sec-roi">
      <div className="container">
        <div className="header-section">
          <div className="main-title">{conversion_title}</div>
          <div className="result-box">
            <div
              className="cont"
              dangerouslySetInnerHTML={{ __html: conversion_description }}
            />
          </div>
        </div>
        <div className="comparison-cards">
          {/* Pink Card */}
          <div className="card light-card">
            <div className="head">{pink_card_title}</div>
            <ul className="feature-list">
              {pink_listing?.map((item) => (
                <li key={item.id}>
                  <img src="https://convertt.co/wp-content/uploads/2026/02/Frame-22.svg" alt="" />
                  <div className="desc">{item.pink_list_heading}</div>
                </li>
              ))}
            </ul>
            <div className="conversion-table">
              {pink_card_image && (
                <img className="light-conversion-image" src={getUrl(pink_card_image, strapiUrl)} alt="" />
              )}
            </div>
          </div>
          {/* Grey Card */}
          <div className="card dark-card">
            <div className="head">{grey_card_title}</div>
            <ul className="feature-list">
              {grey_listing?.map((item) => (
                <li key={item.id}>
                  <img src="https://convertt.co/wp-content/uploads/2026/02/Group-1707479764.svg" alt="" />
                  <div className="desc">{item.grey_list_heading}</div>
                </li>
              ))}
            </ul>
            <div className="conversion-table">
              {grey_card_image && (
                <img className="dark-conversion-image" src={getUrl(grey_card_image, strapiUrl)} alt="" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}