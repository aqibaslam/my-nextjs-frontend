'use client';
import { useEffect, useRef } from 'react';
import './wave.css';

interface WaveItem {
  id: number;
  list_heading: string;
}

interface WaveSectionProps {
  wave_title: string;
  wave_title_image: string;
  wave_listing_block: WaveItem[];
  strapiUrl: string;
}

export default function WaveSection({
  wave_title,
  wave_title_image,
  wave_listing_block,
  strapiUrl,
}: WaveSectionProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const imageUrl = wave_title_image
    ? wave_title_image.startsWith('http')
      ? wave_title_image
      : `${strapiUrl}${wave_title_image}`
    : '';

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const items = [...wrap.querySelectorAll<HTMLElement>('.item')];
    const TOTAL = items.length;
    const VISIBLE = 5;
    let ACTIVE = 2;
    const STEP = 2200;
    const ANIM = 480;
    let order = [...items];
    let ROW = 0;
    let loopId: ReturnType<typeof setInterval> | null = null;

    function measure() {
      items.forEach(el => {
        el.style.transition = 'none';
        el.style.transform = 'translateY(0)';
      });
      void wrap!.offsetHeight;
      ROW = items[0].offsetHeight * 1.25;
      let maxW = 0;
      items.forEach(el => { if (el.offsetWidth > maxW) maxW = el.offsetWidth; });
      wrap!.style.width = maxW + 'px';
      wrap!.style.height = (VISIBLE * ROW) + 'px';
    }

    function place() {
      order.forEach((el, i) => {
        el.style.transition = 'none';
        el.style.transform = `translateY(${i * ROW}px)`;
      });
      void wrap!.offsetHeight;
      highlight();
    }

    function highlight() {
      order.forEach((el, i) => el.classList.toggle('active', i === ACTIVE));
    }

    function startLoop() {
      loopId = setInterval(() => {
        const isMobile = window.innerWidth <= 480;
        if (isMobile) {
          const toWrap = order[0];
          toWrap.style.transition = 'none';
          toWrap.style.transform = `translateY(${(TOTAL - 1) * ROW}px)`;
          void wrap!.offsetHeight;
          order.push(order.shift()!);
        } else {
          const toWrap = order[order.length - 1];
          toWrap.style.transition = 'none';
          toWrap.style.transform = `translateY(${-1 * ROW}px)`;
          void wrap!.offsetHeight;
          order.unshift(order.pop()!);
        }
        order.forEach((el, i) => {
          el.style.transition = `transform ${ANIM}ms cubic-bezier(.4,0,.2,1)`;
          el.style.transform = `translateY(${i * ROW}px)`;
        });
        highlight();
      }, STEP);
    }

    function reset() {
      ACTIVE = window.innerWidth <= 480 ? 0 : 2;
      if (loopId) clearInterval(loopId);
      loopId = null;
      order = [...items];
      measure();
      place();
      startLoop();
    }

    document.fonts.ready.then(reset);

    let rT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rT);
      rT = setTimeout(reset, 200);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    return () => {
      if (loopId) clearInterval(loopId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [wave_listing_block]);

  return (
    <section className="wave-goodby">
      <div className="page-width">
        <div className="card">
          <div className="left">
            <h2>{wave_title}</h2>
            {imageUrl && (
              <img
                className="title-svg-wave"
                src={imageUrl}
                alt=""
              />
            )}
          </div>
          <div className="list-wrap" ref={wrapRef}>
            {wave_listing_block?.map((item) => (
              <div className="item" key={item.id}>
                {item.list_heading}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}