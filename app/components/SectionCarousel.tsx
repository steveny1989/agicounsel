'use client';

import { Children, ReactNode, useEffect, useState } from 'react';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  labels: string[];
  children: ReactNode;
};

export default function SectionCarousel({ id, eyebrow, title, labels, children }: Props) {
  const slides = Children.toArray(children);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return <section className="section-carousel fade-in" id={id} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <div className="carousel-bar">
      <div><span>{eyebrow}</span><h2>{title}</h2></div>
      <div className="carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous slide">←</button>
        <span>{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => move(1)} aria-label="Next slide">→</button>
      </div>
    </div>
    <div className="carousel-stage" aria-live="polite">
      {slides.map((slide, index) => <div className={`carousel-slide ${index === active ? 'is-active' : ''}`} key={labels[index]} aria-hidden={index !== active}>{slide}</div>)}
    </div>
    <div className="carousel-tabs" role="tablist" aria-label={title}>{labels.map((label, index) => <button type="button" role="tab" aria-selected={index === active} onClick={() => setActive(index)} key={label}><span>0{index + 1}</span>{label}</button>)}</div>
  </section>;
}
