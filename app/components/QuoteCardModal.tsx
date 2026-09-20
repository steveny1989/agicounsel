'use client';

import { useEffect, useRef, useState } from 'react';

interface QuoteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: string;
  index: number;
  locale?: 'zh' | 'en';
}

export default function QuoteCardModal({ isOpen, onClose, quote, index, locale = 'en' }: QuoteCardModalProps) {
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

    const size = 1200;
    canvas.width = size;
    canvas.height = size;

    // Background
    ctx.fillStyle = '#071a2b';
    ctx.fillRect(0, 0, size, size);

    // Decorative ambient circles (orbits)
    ctx.save();
    ctx.strokeStyle = 'rgba(186, 147, 96, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 480, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 540, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Outer decorative border
    const pad = 64;
    ctx.strokeStyle = 'rgba(186, 147, 96, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(pad, pad, size - pad * 2, size - pad * 2);

    // Header: Logo and Brand
    const headerY = pad + 70;
    const logoX = pad + 50;
    const logoSize = 52;

    // Logo box
    ctx.strokeStyle = '#ba9360';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(logoX, headerY - logoSize / 2, logoSize, logoSize);

    // Logo "A"
    ctx.fillStyle = '#ba9360';
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', logoX + logoSize / 2, headerY);

    // Brand text
    ctx.textAlign = 'left';
    ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillStyle = '#faf9f5';
    ctx.fillText('AGI COUNSEL NETWORK', logoX + logoSize + 22, headerY);

    // Slide number pill on top right
    const numberText = `0${index + 1} / 05`;
    ctx.textAlign = 'right';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillStyle = '#ba9360';
    ctx.fillText(numberText, size - pad - 50, headerY);

    // Eyebrow tag
    const eyebrowY = headerY + 75;
    ctx.textAlign = 'left';
    ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillStyle = 'rgba(186, 147, 96, 0.9)';
    const eyebrowText = isZh ? '现场摘记 · 法律 AI 洞察' : 'FROM THE ROOM · LEGAL AI NOTES';
    ctx.fillText(eyebrowText, logoX, eyebrowY);

    // Top divider
    ctx.strokeStyle = 'rgba(113, 128, 139, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad + 50, eyebrowY + 28);
    ctx.lineTo(size - pad - 50, eyebrowY + 28);
    ctx.stroke();

    // Quote statement text
    const textMaxWidth = size - (pad + 60) * 2;
    const fontSize = quote.length > 35 ? 46 : 54;
    const lineHeight = fontSize * 1.5;

    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Sans SC", "Segoe UI", serif`;
    ctx.fillStyle = '#faf9f5';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Helper: wrap text
    const words = isZh ? quote.split('') : quote.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + (isZh ? words[i] : (currentLine ? ' ' : '') + words[i]);
      const metrics = ctx.measureText(testLine);
      if (metrics.width > textMaxWidth && currentLine !== '') {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }

    // Vertical centering of quote block
    const textBlockHeight = lines.length * lineHeight;
    const startY = (size - textBlockHeight) / 2 + 10;

    // Quote watermark
    ctx.font = 'bold 90px serif';
    ctx.fillStyle = 'rgba(186, 147, 96, 0.3)';
    ctx.fillText('“', pad + 50, startY - 70);

    // Draw lines
    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Serif SC", "Segoe UI", serif`;
    ctx.fillStyle = '#faf9f5';
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], pad + 50, startY + i * lineHeight);
    }

    // Footer divider
    const footerY = size - pad - 90;
    ctx.strokeStyle = 'rgba(113, 128, 139, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad + 50, footerY);
    ctx.lineTo(size - pad - 50, footerY);
    ctx.stroke();

    // Footer text
    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#71808b';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    const ruleText = isZh ? '遵循查塔姆研究所规则整理 · 观点仅代表个人思考' : 'Chatham House Rule · Perspectives reflect personal observations';
    ctx.fillText(ruleText, pad + 50, footerY + 42);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#ba9360';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('agicounsel.org', size - pad - 50, footerY + 42);

    // Save image URL
    try {
      const dataUrl = canvas.toDataURL('image/png');
      setImageUrl(dataUrl);
    } catch {
      // ignore
    }
  }, [isOpen, quote, index, isZh]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        } else {
          // Fallback to downloading if clipboard image write not supported
          handleDownload();
        }
      });
    } catch {
      handleDownload();
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `agi-counsel-quote-0${index + 1}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="quote-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Quote Card Preview">
      <div className="quote-modal-panel" onClick={(e) => e.stopPropagation()}>
        <header className="quote-modal-header">
          <h3>{isZh ? '金句分享卡片' : 'Quote Card Preview'}</h3>
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
          <button className="button button-gold" onClick={handleCopy}>
            {copied ? (isZh ? '✓ 已复制到剪贴板' : '✓ Copied to clipboard') : (isZh ? '复制图片' : 'Copy Image')}
          </button>
          <button className="button button-light" onClick={handleDownload}>
            {isZh ? '下载高清卡片' : 'Download PNG'}
          </button>
        </footer>
      </div>
    </div>
  );
}
