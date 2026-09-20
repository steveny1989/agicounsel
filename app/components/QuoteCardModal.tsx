'use client';

export function downloadQuoteCard(quote: string, index: number, locale: 'zh' | 'en' = 'en') {
  if (typeof document === 'undefined' || !quote) return;

  const isZh = locale === 'zh';
  const canvas = document.createElement('canvas');
  const size = 1200;
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

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

  ctx.strokeStyle = '#ba9360';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(logoX, headerY - logoSize / 2, logoSize, logoSize);

  ctx.fillStyle = '#ba9360';
  ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A', logoX + logoSize / 2, headerY);

  ctx.textAlign = 'left';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillStyle = '#faf9f5';
  ctx.fillText('AGI COUNSEL NETWORK', logoX + logoSize + 22, headerY);

  const numberText = `0${index + 1}`;
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

  const textBlockHeight = lines.length * lineHeight;
  const startY = (size - textBlockHeight) / 2 + 10;

  ctx.font = 'bold 90px serif';
  ctx.fillStyle = 'rgba(186, 147, 96, 0.3)';
  ctx.fillText('“', pad + 50, startY - 70);

  ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Serif SC", "Segoe UI", serif`;
  ctx.fillStyle = '#faf9f5';
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], pad + 50, startY + i * lineHeight);
  }

  const footerY = size - pad - 90;
  ctx.strokeStyle = 'rgba(113, 128, 139, 0.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad + 50, footerY);
  ctx.lineTo(size - pad - 50, footerY);
  ctx.stroke();

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

  // Also copy image to clipboard if browser supports it
  try {
    canvas.toBlob(async (blob) => {
      if (blob && navigator.clipboard && window.ClipboardItem) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        } catch {
          // ignore clipboard error
        }
      }
    });
  } catch {
    // ignore
  }

  // Trigger immediate PNG download
  const link = document.createElement('a');
  link.download = `agi-counsel-quote-0${index + 1}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export default downloadQuoteCard;
