'use client';

import { Children, ReactNode, useEffect, useState } from 'react';

type Props = {
  id: string;
  title: string;
  labels: string[];
  children: ReactNode;
};

export default function SectionCarousel({ id, title, labels, children }: Props) {
  const slides = Children.toArray(children);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return <section className="section-carousel fade-in" id={id} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    {title && <div className="carousel-bar">
      <h2>{title}</h2>
    </div>}
    <div className="carousel-stage" aria-live="polite">
      {slides.map((slide, index) => <div className={`carousel-slide ${index === active ? 'is-active' : ''}`} key={labels[index]} aria-hidden={index !== active}>{slide}</div>)}
    </div>
    <div className="carousel-tabs" role="tablist" aria-label={title || 'Carousel'}>
      {slides.map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === active}
          aria-label={labels[index]}
          onClick={() => setActive(index)}
          className={`carousel-tab-dot ${index === active ? 'is-active' : ''}`}
        />
      ))}
    </div>
  </section>;
}
