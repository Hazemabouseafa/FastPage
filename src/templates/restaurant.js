import {h, svg, safeImageUrl, whatsappLink} from '../lib/utils.js';
import {pageShell, brandMark, ownerFooter, publicContact, previewBanner, starsHtml} from './layout.js';

export function restaurantPage(site, base, slug, preview=false) {
  const waNumber = site.whatsapp || process.env.CONTACT_WHATSAPP || '201550612361';

  const dishes = (site.products || []).slice(0,8).map((x,i) => {
    const img = safeImageUrl(x.image);
    const orderLink = whatsappLink(waNumber, `مرحبًا ${site.name}، أود طلب: ${x.name} (${x.price || ''})`);
    return `<article class="food-card">
      <div class="dish-pic dish-${i%4}">
        ${x.badge ? `<span class="dish-badge">${h(x.badge)}</span>` : ''}
        ${img ? `<img class="dish-photo" src="${h(img)}" alt="${h(x.name)}" loading="lazy"/>` : `<span class="dish-emoji">${h(x.emoji || '🍽️')}</span>`}
      </div>
      <div class="food-details">
        ${x.category ? `<span class="dish-category">${h(x.category)}</span>` : ''}
        <h3>${h(x.name)}</h3>
        <p>${h(x.description)}</p>
        <div class="food-card-footer">
          <span class="price-tag">${h(x.price)}</span>
          <a class="order-item-btn" href="${h(orderLink || '#contact')}" target="_blank" rel="noopener noreferrer">اطلب الآن +</a>
        </div>
      </div>
    </article>`;
  }).join('');

  const offer = site.specialOffer || {
    badge: 'عرض اليوم المميز 🔥',
    title: 'كومبو الصباح: قهوتك المفضلة + كروسان فرنسي طازج',
    description: 'استمتع بأي قهوة ساخنة أو باردة مع كروسان زبدة فرنسي مخبوز طازجاً صباح كل يوم.',
    price: '99 ج',
    oldPrice: '135 ج'
  };
  const offerWa = whatsappLink(waNumber, `مرحبًا ${site.name}، أود طلب (${offer.title}) بسعر ${offer.price}`);

  const defaultHighlights = [
    {title: 'مكونات طازجة يومياً', desc: 'نحضر كافة المشروبات والمخبوزات يومياً بأعلى معايير الجودة.'},
    {title: 'أجواء دافئة ومريحة', desc: 'جلسات داخلية وخارجية هادئة تناسب العمل أو اللقاءات العائلية.'},
    {title: 'توصيل سريع ومحكم', desc: 'تغليف حراري يحافظ على حرارة وجودة طلبك حتى باب المنزل.'}
  ];
  const highlights = (site.highlights && site.highlights.length ? site.highlights : defaultHighlights).slice(0,3).map(hl =>
    `<div class="cafe-highlight-item"><span class="cafe-hl-icon">${svg('check', 18)}</span><div><strong>${h(hl.title)}</strong><p>${h(hl.desc)}</p></div></div>`
  ).join('');

  const defaultReviews = [
    {name: 'سلمى هشام', role: 'زائرة دائمة', text: 'أحلى سبانيش لاتيه وكروسان جربتهم! المكان هادي جداً والتعامل راقي.'},
    {name: 'عمر عبد العزيز', role: 'عميل مميز', text: 'القهوة مضبوطة جداً والتشيز كيك خطيرة، والتوصيل دايماً سريع ومرتب.'},
    {name: 'مريم نبيل', role: 'مصممة جرافيك', text: 'مكاني المفضل كل يوم الصبح، الجودة ثابتة والأسعار ممتازة جداً مقارنة بالجودة.'}
  ];
  const reviews = (site.testimonials && site.testimonials.length ? site.testimonials : defaultReviews).slice(0,3).map(r =>
    `<article class="review-card food-review-card">${starsHtml(5)}<p class="review-text">“${h(r.text)}”</p><div class="reviewer"><strong>${h(r.name)}</strong><small>${h(r.role)}</small></div></article>`
  ).join('');

  const cover = safeImageUrl(site.heroImage);
  const foodHeroArt = cover
    ? `<div class="food-photo-frame"><img class="food-hero-image" src="${h(cover)}" alt="${h(site.name)}" loading="eager"/></div>`
    : `<div class="giant-dish">${h(site.heroEmoji || '☕')}</div>`;

  const body = `${previewBanner(slug, preview)}<div class="tenant food-tenant">
  <div class="cafe-infobar"><div class="container cafe-infobar-inner">
    <span>${svg('pin', 14)} ${h(site.address || 'القاهرة الجديدة - التجمع الخامس')}</span>
    <span>${svg('clock', 14)} ${h(site.hours || 'يومياً من 8:00 ص حتى 12:00 منتصف الليل')}</span>
    <span>${svg('bolt', 14)} ${h(site.deliveryInfo || 'متاح التوصيل السريع والاستلام من الفرع')}</span>
  </div></div>
  <header class="tenant-header sticky-header"><div class="container header-inner">${brandMark(site.name, site.logoLetter || 'F', site.subtitle || 'قهوة مختصة ومخبوزات')}<nav><a href="#menu">قائمة الطعام</a><a href="#offer">العروض</a><a href="#about">عن المكان</a><a href="#reviews">آراء الزوار</a><a href="#contact">الموقع والطلب</a></nav><div class="header-cta">${publicContact(site, site.cta || 'اطلب الآن', 'button primary btn-sm')}</div></div></header>
  <main>
    <section class="food-hero container">
      <div class="food-hero-copy">
        <span class="eyebrow badge-pill warm-pill">${svg('spark',16)} ${h(site.eyebrow || 'طعم يستاهل التجربة')}</span>
        <h1>${h(site.headline)}</h1>
        <p>${h(site.description)}</p>
        <div class="hero-actions">${publicContact(site, site.cta || 'اطلب على واتساب')}<a href="#menu" class="button outline">تصفح المنيو بالأسعار ${svg('arrow',18)}</a></div>
        <div class="food-caption">✨ ${h(site.trustLine || 'مكونات مختارة بعناية • تحضير طازج يومياً')}</div>
      </div>
      <div class="food-visual">
        <div class="food-glow"></div>
        <div class="float-tag tag-a warm-tag">${svg('star',18)}<div><strong>4.9/5 تقييم الزوار</strong><small>+600 طلب وتجربة مميزة</small></div></div>
        ${foodHeroArt}
        <div class="float-tag tag-b warm-tag">${svg('clock',18)}<div><strong>تحضير طازج يومياً</strong><small>توصيل سريع خلال 30 دقيقة</small></div></div>
      </div>
    </section>

    <section id="offer" class="container offer-banner-wrap">
      <div class="offer-banner">
        <div class="offer-copy">
          <span class="offer-badge">${h(offer.badge)}</span>
          <h2>${h(offer.title)}</h2>
          <p>${h(offer.description)}</p>
        </div>
        <div class="offer-price-box">
          <div class="offer-prices">
            ${offer.oldPrice ? `<del>${h(offer.oldPrice)}</del>` : ''}
            <strong>${h(offer.price)}</strong>
          </div>
          <a class="button primary" href="${h(offerWa || '#contact')}" target="_blank" rel="noopener noreferrer">اطلب العرض الآن ${svg('arrow', 17)}</a>
        </div>
      </div>
    </section>

    <section id="menu" class="food-menu">
      <div class="container">
        <div class="section-head"><span class="eyebrow">${svg('spark', 16)} اكتشف اختياراتنا</span><h2>قائمة المشروبات والمخبوزات</h2><p>محضّرة يومياً بحب من أجود المكونات الطازجة، اضغط على أي صنف لطلبه مباشرة عبر واتساب</p></div>
        <div class="food-grid">${dishes}</div>
      </div>
    </section>

    <section id="about" class="about-section container">
      <div class="about-copy">
        <span class="eyebrow">عن ${h(site.name)}</span>
        <h2>${h(site.aboutTitle || 'كل تفصيلة معمولة بحب')}</h2>
        <p>${h(site.about || 'نحب نقدم تجربة جميلة وخدمة مميزة لكل زائر.')}</p>
        <div class="cafe-highlights-list">${highlights}</div>
      </div>
      <div class="food-quote-card">
        <div class="quote-mark">“</div>
        <p class="food-quote-text">${h(site.quote || 'الاختيارات الحلوة بتبدأ من هنا')}</p>
        <div class="quote-footer">
          <strong>${h(site.name)}</strong>
          <span>${h(site.hours || 'نستقبلكم يومياً بكل حب')}</span>
        </div>
      </div>
    </section>

    <section id="reviews" class="reviews-section container">
      <div class="section-head"><span class="eyebrow">${svg('star', 16)} آراء زوارنا</span><h2>ماذا يقول عشاق القهوة عن ${h(site.name)}؟</h2></div>
      <div class="reviews-grid">${reviews}</div>
    </section>

    <section class="tenant-contact container" id="contact">
      <div class="contact-banner-inner warm-contact">
        <span class="eyebrow">أهلاً بك في ${h(site.name)}</span>
        <h2>جاهز تطلب مشروبك المفضل؟</h2>
        <p>${h(site.contactText || 'تواصل معنا مباشرة عبر واتساب للتوصيل السريع أو لتجهيز طلبك قبل وصولك.')}</p>
        <div class="contact-actions">${publicContact(site, 'اطلب الآن عبر واتساب')}</div>
        <div class="contact-info-pills">
          <span class="info-pill">${svg('pin', 15)} ${h(site.address || 'القاهرة الجديدة - التجمع الخامس')}</span>
          <span class="info-pill">${svg('clock', 15)} ${h(site.hours || 'يومياً 8:00 ص – 12:00 ص')}</span>
        </div>
      </div>
    </section>
  </main>${ownerFooter(site)}</div>`;

  return pageShell({title:`${site.name} | ${site.headline}`,description:site.description,body,theme:site.theme,noindex:preview,canonical:preview?'':`https://${slug}.${base}/`});
}
