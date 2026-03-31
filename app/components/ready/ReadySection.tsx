import './ready.css';

interface ReadySectionProps {
  ready_subtitle: string;
  ready_title: string;
  available_image: string;
  available_heading: string;
  person_first_image: string;
  person_second_image: string;
  plus_image: string;
  you_image: string;
  quick_heading: string;
  pick_heading: string;
  ready_cta: string;
  ready_cta_url: string;
  strapiUrl: string;
}

function getUrl(url: string, strapiUrl: string) {
  if (!url) return '';
  return url.startsWith('http') ? url : `${strapiUrl}${url}`;
}

export default function ReadySection({
  ready_subtitle, ready_title, available_image, available_heading,
  person_first_image, person_second_image, plus_image, you_image,
  quick_heading, pick_heading, ready_cta, ready_cta_url, strapiUrl,
}: ReadySectionProps) {
  return (
    <section className="ready-to-roi">
      <div className="page-width">
        <div className="main-wrapper-ready-roi">
          <div className="main-wrapper-bg-img-start">
            <div className="left-content">
              <div className="subtitle-ready">{ready_subtitle}</div>
              <div className="title-ready">{ready_title}</div>
            </div>
            <div className="right-content">
              <div className="right-content-start">
                <div className="right-img-with-available">
                  {available_image && <img className="title-img" src={getUrl(available_image, strapiUrl)} alt="" />}
                  <div className="right-available">{available_heading}</div>
                </div>
                <div className="main-right-images-block-center">
                  <div className="main-images-blink">
                    {person_first_image && (
                      <img className="right-first-img" src={getUrl(person_first_image, strapiUrl)} alt="" />
                    )}
                    <div className="avatar-online-wrap">
                      {person_second_image && (
                        <img src={getUrl(person_second_image, strapiUrl)} alt="" />
                      )}
                      <div className="online-dot"></div>
                    </div>
                  </div>
                  {plus_image && <img className="right-plus-svg" src={getUrl(plus_image, strapiUrl)} alt="" />}
                  {you_image && <img className="right-you-svg" src={getUrl(you_image, strapiUrl)} alt="" />}
                </div>
                <div className="right-bottom-info-btn">
                  <div className="quick-heading">{quick_heading}</div>
                  <div className="pick-heading">{pick_heading}</div>
                  <a className="ready-to-btn" href={ready_cta_url}>
                    {ready_cta}
                    <img className="ready-btn-img"
                      src="https://convertt.co/wp-content/uploads/2026/02/Arrow-Placeholder-1.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}