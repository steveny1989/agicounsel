'use client';

import { useState } from 'react';
import SectionCarousel from './SectionCarousel';
import QuoteCardModal from './QuoteCardModal';

interface RoomNotesCarouselProps {
  notes: string[];
  locale?: 'zh' | 'en';
}

export default function RoomNotesCarousel({ notes, locale = 'en' }: RoomNotesCarouselProps) {
  const [modalState, setModalState] = useState<{ isOpen: boolean; quote: string; index: number }>({
    isOpen: false,
    quote: '',
    index: 0,
  });

  const isZh = locale === 'zh';

  return (
    <>
      <SectionCarousel
        id="room-notes"
        title=""
        labels={notes.map((_, index) => (isZh ? `法律 AI 观点 ${index + 1}` : `Legal AI note ${index + 1}`))}
        locale={locale}
      >
        {notes.map((note, index) => (
          <section className={`note-quote-slide ${index === 2 ? 'is-long' : ''}`} key={note}>
            <div className="note-quote-meta">
              <p>{isZh ? '现场摘记 · 法律 AI 五则' : 'From the Room · Legal AI Notes'}</p>
              <span>0{index + 1} / 05</span>
            </div>
            <p className="note-quote-statement">{note}</p>
            <div className="quote-slide-actions">
              <button
                type="button"
                className="quote-card-btn"
                onClick={() => setModalState({ isOpen: true, quote: note, index })}
              >
                {isZh ? '生成分享卡片' : 'Share Quote Card'} <span>↗</span>
              </button>
            </div>
          </section>
        ))}
      </SectionCarousel>

      <QuoteCardModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        quote={modalState.quote}
        index={modalState.index}
        locale={locale}
      />
    </>
  );
}
