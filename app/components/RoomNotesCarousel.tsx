'use client';

import { useState } from 'react';
import SectionCarousel from './SectionCarousel';
import { downloadQuoteCard } from './QuoteCardModal';

interface RoomNotesCarouselProps {
  notes: string[];
  locale?: 'zh' | 'en';
}

export default function RoomNotesCarousel({ notes, locale = 'en' }: RoomNotesCarouselProps) {
  const [downloadedIdx, setDownloadedIdx] = useState<number | null>(null);
  const isZh = locale === 'zh';

  const handleBoxClick = (note: string, index: number) => {
    downloadQuoteCard(note, index, locale);
    setDownloadedIdx(index);
    setTimeout(() => {
      setDownloadedIdx((curr) => (curr === index ? null : curr));
    }, 2200);
  };

  return (
    <SectionCarousel
      id="room-notes"
      title=""
      labels={notes.map((_, index) => (isZh ? `法律 AI 观点 ${index + 1}` : `Legal AI note ${index + 1}`))}
      locale={locale}
    >
      {notes.map((note, index) => (
        <section
          className={`note-quote-slide clickable-quote-box ${index === 2 ? 'is-long' : ''}`}
          key={note}
          onClick={() => handleBoxClick(note, index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleBoxClick(note, index);
            }
          }}
          title={isZh ? '点击卡片即可直接下载高清金句图' : 'Click quote box to download shareable card'}
        >
          <div className="note-quote-meta">
            <p>{isZh ? '现场摘记 · 法律 AI 五则' : 'From the Room · Legal AI Notes'}</p>
            <span>
              {downloadedIdx === index
                ? isZh
                  ? '✓ 卡片已下载'
                  : '✓ Card downloaded'
                : `0${index + 1} / 05 · ${isZh ? '点击下载卡片 ↓' : 'Click to download ↓'}`}
            </span>
          </div>
          <p className="note-quote-statement">{note}</p>
        </section>
      ))}
    </SectionCarousel>
  );
}
