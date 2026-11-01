import {h, cleanColor, svg, whatsappLink} from '../lib/utils.js';
export function pageShell({title, description, body, theme='#2563eb', noindex=false, canonical='', extraCss=''}) {
  const safeCanonical = canonical.startsWith('https://') ? canonical : '';
  return `<!doctype html><html lang="ar" dir="rtl"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${h(title)}</title><meta name="description" content="${h(description)}"/>
<meta name="theme-color" content="${cleanColor(theme)}"/>
${noindex ? '<meta name="robots" content="noindex,nofollow"/>' : ''}
${safeCanonical ? `<link rel="canonical" href="${h(safeCanonical)}"/>` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="/css/styles.css"/>
<style>:root{--tenant-accent:${cleanColor(theme)}}${extraCss}</style></head><body>${body}</body></html>`;
}
export function linkButton(text, href, klass='button primary') {
  return `<a class="${h(klass)}" href="${h(href)}"${/^https?:\/\//.test(href) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${h(text)} ${svg('arrow', 18)}</a>`;
}
export function publicContact(site, label='تواصل الآن', klass='button primary', customMsg='') {
  const msg = customMsg || `مرحبًا، وصلت إليكم عن طريق موقع ${site.name}`;
  const wa = whatsappLink(site.whatsapp || process.env.CONTACT_WHATSAPP || '201550612361', msg);
  return linkButton(label, wa || '#contact', klass);
}
export function brandMark(name, symbol='F', subtitle='') {
  return `<a class="brandmark" href="#"><span class="brand-symbol">${h(symbol)}</span><span class="brand-text"><strong>${h(name)}</strong>${subtitle ? `<small>${h(subtitle)}</small>` : ''}</span></a>`;
}
export function starsHtml(count = 5) {
  return `<span class="stars-row" aria-label="تقييم 5 نجوم">${Array.from({length: count}, () => svg('star', 15)).join('')}</span>`;
}
export function previewBanner(slug, preview = false) {
  if (!preview) return '';
  const waOrder = whatsappLink(process.env.CONTACT_WHATSAPP || '201550612361', `مرحبًا، أعجبني قالب (${slug}) على FastPage وأريد طلب صفحة مماثلة لمشروعي بسعر 1000 جنيه`);
  const tabs = [
    {id: 'demo', label: '🏢 الشركات والخدمات'},
    {id: 'coffee', label: '☕ المطاعم والكافيهات'},
    {id: 'portfolio', label: '🎨 البراند الشخصي'}
  ].map(t => `<a class="preview-tab${slug === t.id ? ' active' : ''}" href="/preview/${t.id}">${t.label}</a>`).join('');
  return `<div class="preview-topbar"><div class="container preview-topbar-inner"><div class="preview-topbar-right"><a class="preview-back" href="/">← الرئيسية</a><span class="preview-divider">|</span><div class="preview-tabs">${tabs}</div></div><div class="preview-topbar-left"><span class="preview-price-tag">شامل التصميم واستضافة سنتين بـ ١٬٠٠٠ ج</span><a class="preview-order-btn" href="${h(waOrder)}" target="_blank" rel="noopener noreferrer">${svg('message', 15)} اطلب هذا التصميم لمشروعك</a></div></div></div>`;
}
export function floatingWhatsapp(site) {
  const wa = whatsappLink(site.whatsapp || process.env.CONTACT_WHATSAPP || '201550612361', `مرحبًا، أود الاستفسار من خلال موقع ${site.name}`);
  if (!wa) return '';
  return `<a class="floating-wa" href="${h(wa)}" target="_blank" rel="noopener noreferrer" aria-label="تواصل عبر واتساب">${svg('message', 22)}<span>تواصل عبر واتساب</span></a>`;
}
export function ownerFooter(site) {
  return `<footer class="site-footer"><div class="site-footer-main"><span>© ${new Date().getFullYear()} <strong>${h(site.name)}</strong> — جميع الحقوق محفوظة.</span>${site.address ? `<span class="footer-meta">${svg('pin', 14)} ${h(site.address)}</span>` : ''}</div><a class="fastpage-credit" href="/" target="_blank" rel="noopener noreferrer">صُمم باحترافية عبر <strong>FastPage</strong></a></footer>${floatingWhatsapp(site)}`;
}
