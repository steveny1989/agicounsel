'use client';

import {
  Children,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type Props = {
  id: string;
  title: string;
  labels: string[];
  children: ReactNode;
  locale?: 'en' | 'zh';
};

type Gesture = {
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  lastTime: number;
  velocityX: number;
  axis: 'x' | 'y' | null;
};

const SWIPE_AXIS_THRESHOLD = 8;
const SWIPE_VELOCITY_THRESHOLD = 0.42;

export default function SectionCarousel({ id, title, labels, children, locale = 'en' }: Props) {
  const slides = Children.toArray(children);
  const [active, setActive] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [stageHeight, setStageHeight] = useState<number>();
  const stageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const gestureRef = useRef<Gesture | null>(null);
  const suppressClickRef = useRef(false);

  const copy = locale === 'zh'
    ? { previous: '上一页', next: '下一页', carousel: '轮播内容', slide: '幻灯片' }
    : { previous: 'Previous', next: 'Next', carousel: 'Carousel', slide: 'slide' };

  useEffect(() => {
    const finePointer = window.matchMedia('(min-width: 801px) and (hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateAutoplay = () => setCanAutoplay(finePointer.matches && !reducedMotion.matches);

    updateAutoplay();
    finePointer.addEventListener('change', updateAutoplay);
    reducedMotion.addEventListener('change', updateAutoplay);
    return () => {
      finePointer.removeEventListener('change', updateAutoplay);
      reducedMotion.removeEventListener('change', updateAutoplay);
    };
  }, []);

  useEffect(() => {
    if (!canAutoplay || hoverPaused || hasInteracted || slides.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [canAutoplay, hasInteracted, hoverPaused, slides.length]);

  useLayoutEffect(() => {
    const activeSlide = slideRefs.current[active];
    if (!activeSlide) return;

    const updateHeight = () => setStageHeight(activeSlide.offsetHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(activeSlide);
    window.addEventListener('resize', updateHeight);
    document.fonts?.ready.then(updateHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [active]);

  const goTo = (index: number) => {
    if (index < 0 || index >= slides.length || index === active) return;
    setHasInteracted(true);
    setActive(index);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocityX: 0,
      axis: null,
    };
    suppressClickRef.current = false;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (!gesture.axis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) >= SWIPE_AXIS_THRESHOLD) {
      gesture.axis = Math.abs(deltaX) > Math.abs(deltaY) * 1.15 ? 'x' : 'y';
      if (gesture.axis === 'x') {
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
        setHasInteracted(true);
        suppressClickRef.current = true;
      }
    }

    if (gesture.axis !== 'x') return;
    event.preventDefault();

    const elapsed = Math.max(event.timeStamp - gesture.lastTime, 1);
    const currentVelocity = (event.clientX - gesture.lastX) / elapsed;
    gesture.velocityX = gesture.velocityX * 0.7 + currentVelocity * 0.3;
    gesture.lastX = event.clientX;
    gesture.lastTime = event.timeStamp;

    const isPastStart = active === 0 && deltaX > 0;
    const isPastEnd = active === slides.length - 1 && deltaX < 0;
    setDragOffset((isPastStart || isPastEnd) ? deltaX * 0.28 : deltaX);
  };

  const finishGesture = (event: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - gesture.startX;
    const stageWidth = stageRef.current?.clientWidth ?? 0;
    const distanceThreshold = Math.min(76, stageWidth * 0.2);
    const isFastSwipe = Math.abs(gesture.velocityX) >= SWIPE_VELOCITY_THRESHOLD && Math.abs(deltaX) > 18;
    const shouldMove = !cancelled && gesture.axis === 'x' && (Math.abs(deltaX) >= distanceThreshold || isFastSwipe);

    if (shouldMove) {
      if (deltaX < 0 && active < slides.length - 1) setActive(active + 1);
      if (deltaX > 0 && active > 0) setActive(active - 1);
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    gestureRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  return <section
    className="section-carousel fade-in"
    data-dragging={isDragging}
    id={id}
    role="region"
    aria-roledescription={copy.carousel}
    onMouseEnter={() => setHoverPaused(true)}
    onMouseLeave={() => setHoverPaused(false)}
    onFocus={() => setHoverPaused(true)}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHoverPaused(false); }}
  >
    {title && <div className="carousel-bar">
      <h2>{title}</h2>
    </div>}
    <div
      className="carousel-stage"
      ref={stageRef}
      style={stageHeight ? { height: `${stageHeight}px` } : undefined}
      aria-live={isDragging ? 'off' : 'polite'}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishGesture(event)}
      onPointerCancel={(event) => finishGesture(event, true)}
      onClickCapture={(event) => {
        if (!suppressClickRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        suppressClickRef.current = false;
      }}
    >
      <div
        className="carousel-track"
        style={{ transform: `translate3d(calc(${-active * 100}% + ${dragOffset}px), 0, 0)` }}
      >
        {slides.map((slide, index) => <div
          className={`carousel-slide ${index === active ? 'is-active' : ''}`}
          key={labels[index]}
          ref={(element) => { slideRefs.current[index] = element; }}
          role="group"
          aria-roledescription={copy.slide}
          aria-label={`${index + 1} / ${slides.length}: ${labels[index]}`}
          data-active={index === active}
        >{slide}</div>)}
      </div>
    </div>
    <div className="carousel-controls">
      <button
        type="button"
        className="carousel-arrow"
        aria-label={`${copy.previous}: ${labels[Math.max(0, active - 1)]}`}
        disabled={active === 0}
        onClick={() => goTo(active - 1)}
      ><span aria-hidden="true">←</span></button>
      <div className="carousel-tabs" role="tablist" aria-label={title || copy.carousel}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={labels[index]}
            onClick={() => goTo(index)}
            className={`carousel-tab-dot ${index === active ? 'is-active' : ''}`}
          >
            <span className="carousel-tab-indicator" />
            <em className="carousel-tab-label">{`0${index + 1} · ${labels[index]}`}</em>
          </button>
        ))}
      </div>
      <span className="carousel-mobile-status" aria-hidden="true">
        {`0${active + 1} / 0${slides.length} · ${labels[active]}`}
      </span>
      <button
        type="button"
        className="carousel-arrow"
        aria-label={`${copy.next}: ${labels[Math.min(slides.length - 1, active + 1)]}`}
        disabled={active === slides.length - 1}
        onClick={() => goTo(active + 1)}
      ><span aria-hidden="true">→</span></button>
    </div>
  </section>;
}
