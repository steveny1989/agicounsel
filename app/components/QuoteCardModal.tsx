'use client';

import { useEffect, useRef, useState } from 'react';

interface QuoteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: string;
  index: number;
  locale?: 'zh' | 'en';
}

export default function QuoteCardModal({
  isOpen,
  onClose,
  quote,
  index,
  locale = 'en',
}: QuoteCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const isZh = locale === 'zh';

  useEffect(() => {
    if (!isOpen || !quote) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = 840;
    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = '#071a2b';
    ctx.fillRect(0, 0, width, height);

    // Subtle decorative ambient circles (orbits)
    ctx.save();
    ctx.strokeStyle = 'rgba(186, 147, 96, 0.1)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 370, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 425, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Outer decorative border
    const pad = 44;
    ctx.strokeStyle = 'rgba(186, 147, 96, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

    const innerX = pad + 44;
    const innerRight = width - pad - 44;

    // Header: Logo and Brand
    const headerY = pad + 56;
    const logoSize = 44;

    ctx.strokeStyle = '#ba9360';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(innerX, headerY - logoSize / 2, logoSize, logoSize);

    ctx.fillStyle = '#ba9360';
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', innerX + logoSize / 2, headerY);

    ctx.textAlign = 'left';
    ctx.font = '600 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '2.5px';
    ctx.fillStyle = '#faf9f5';
    ctx.fillText('AGI COUNSEL NETWORK', innerX + logoSize + 18, headerY);

    const numberText = `0${index + 1}`;
    ctx.textAlign = 'right';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillStyle = '#ba9360';
    ctx.fillText(numberText, innerRight, headerY);

    // Eyebrow tag
    const eyebrowY = headerY + 54;
    ctx.textAlign = 'left';
    ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillStyle = 'rgba(186, 147, 96, 0.92)';
    const eyebrowText = isZh ? '现场摘记 · 法律 AI 洞察' : 'FROM THE ROOM · LEGAL AI NOTES';
    ctx.fillText(eyebrowText, innerX, eyebrowY);

    // Top divider
    const topDividerY = eyebrowY + 22;
    ctx.strokeStyle = 'rgba(113, 128, 139, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(innerX, topDividerY);
    ctx.lineTo(innerRight, topDividerY);
    ctx.stroke();

    // Footer divider & metadata
    const footerY = height - pad - 74;
    ctx.strokeStyle = 'rgba(113, 128, 139, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(innerX, footerY);
    ctx.lineTo(innerRight, footerY);
    ctx.stroke();

    ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#8b99a4';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    const ruleText = isZh
      ? '遵循查塔姆研究所规则整理 · 观点仅代表个人思考'
      : 'Chatham House Rule · Perspectives reflect personal observations';
    ctx.fillText(ruleText, innerX, footerY + 36);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#ba9360';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('agicounsel.org', innerRight, footerY + 36);

    // Dynamic Auto-Fit Quote Typography within the central zone
    const cleanQuote = quote.replace(/^[“"「『]+|[”"」』]+$/g, '').trim();
    const zoneTop = topDividerY + 24;
    const zoneBottom = footerY - 24;
    const zoneHeight = zoneBottom - zoneTop; // ~480px
    const textMaxWidth = innerRight - innerX; // ~904px

    const wrapQuoteLines = (testFontSize: number): string[] => {
      ctx.font = `500 ${testFontSize}px -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Serif SC", "Georgia", serif`;
      ctx.letterSpacing = '0px';
      const tokens = isZh ? Array.from(cleanQuote) : cleanQuote.split(/\s+/);
      const wrapped: string[] = [];
      let current = '';

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const candidate = current + (isZh ? token : (current ? ' ' : '') + token);
        const isTrailingPunct = isZh && /^[，。！？；：、）”》」』]/.test(token);

        if (ctx.measureText(candidate).width > textMaxWidth && current !== '' && !isTrailingPunct) {
          wrapped.push(current);
          current = token;
        } else {
          current = candidate;
        }
      }
      if (current) wrapped.push(current);
      return wrapped;
    };

    // Start large for short quotes, step down automatically for longer quotes
    const maxFont = isZh ? 68 : 64;
    const minFont = 28;
    let chosenFontSize = minFont;
    let chosenLines: string[] = [];
    const lineHeightRatio = isZh ? 1.46 : 1.38;

    for (let sz = maxFont; sz >= minFont; sz -= 2) {
      const candidateLines = wrapQuoteLines(sz);
      const lh = sz * lineHeightRatio;
      const quoteMarkSpace = Math.round(sz * 0.85);
      const totalNeededHeight = quoteMarkSpace + candidateLines.length * lh;

      if (totalNeededHeight <= zoneHeight * 0.88) {
        chosenFontSize = sz;
        chosenLines = candidateLines;
        break;
      }
    }

    if (chosenLines.length === 0) {
      chosenLines = wrapQuoteLines(minFont);
      chosenFontSize = minFont;
    }

    const lineHeight = chosenFontSize * lineHeightRatio;
    const quoteMarkOffset = Math.round(chosenFontSize * 0.82);
    const totalContentHeight = quoteMarkOffset + chosenLines.length * lineHeight;
    const blockTopY = zoneTop + (zoneHeight - totalContentHeight) / 2;
    const textStartY = blockTopY + quoteMarkOffset;

    // Decorative Opening Quote Mark anchored directly above the first line
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = `bold ${Math.round(chosenFontSize * 1.45)}px Georgia, serif`;
    ctx.fillStyle = 'rgba(186, 147, 96, 0.42)';
    ctx.fillText('“', innerX - 4, blockTopY - Math.round(chosenFontSize * 0.25));

    // Render Quote Lines
    ctx.font = `500 ${chosenFontSize}px -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Serif SC", "Georgia", serif`;
    ctx.fillStyle = '#faf9f5';
    for (let i = 0; i < chosenLines.length; i++) {
      ctx.fillText(chosenLines[i], innerX, textStartY + i * lineHeight);
    }

    try {
      const dataUrl = canvas.toDataURL('image/png');
      setImageUrl(dataUrl);
    } catch {
      // ignore
    }
  }, [isOpen, quote, index, isZh]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `agi-counsel-quote-0${index + 1}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2200);
        } else {
          handleDownload();
        }
      });
    } catch {
      handleDownload();
    }
  };

  return (
    <div className="quote-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Quote Card">
      <div className="quote-modal-panel" onClick={(e) => e.stopPropagation()}>
        <header className="quote-modal-header">
          <div>
            <h3>{isZh ? '保存或分享洞察卡片' : 'Save or Share This Insight'}</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#71808b' }}>
              {isZh
                ? '您可以下载高清图片卡片，或复制到剪贴板直接分享。'
                : 'Download the high-resolution card or copy it to share with peers.'}
            </p>
          </div>
          <button className="quote-modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </header>

        <div className="quote-modal-canvas-wrap">
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {imageUrl && (
            <img
              src={imageUrl}
              alt={quote}
              className="quote-card-preview-image"
            />
          )}
        </div>

        <footer className="quote-modal-actions">
          <button
            type="button"
            className="quote-modal-btn quote-modal-btn-primary"
            onClick={handleDownload}
          >
            {isZh ? '下载高清卡片' : 'Download Card'}
          </button>
          <button
            type="button"
            className="quote-modal-btn quote-modal-btn-secondary"
            onClick={handleCopy}
          >
            {copied ? (isZh ? '✓ 已复制到剪贴板' : '✓ Copied to Clipboard') : (isZh ? '复制图片' : 'Copy Card')}
          </button>
        </footer>
      </div>
    </div>
  );
}
