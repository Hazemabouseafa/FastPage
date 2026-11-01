import {h, svg, safeImageUrl, whatsappLink} from '../lib/utils.js';
import {pageShell, publicContact, brandMark, ownerFooter, previewBanner, starsHtml} from './layout.js';

export function businessPage(site, base, slug, preview=false) {
  const icons = ['layers','shield','globe','bolt','award','check'];
  const waNumber = site.whatsapp || process.env.CONTACT_WHATSAPP || '201550612361';

  const services = (site.services || []).slice(0,6).map((s,i) => {
    const itemWa = whatsappLink(waNumber, `مرحبًا ${site.name}، أود الاستفسار عن خدمة: ${s.title}`);
    return `<article class="feature"><div class="feature-top"><span class="feature-icon">${svg(icons[i % icons.length], 24)}</span>${s.tag ? `<span class="feature-badge">${h(s.tag)}</span>` : ''}</div><h3>${h(s.title)}</h3><p>${h(s.description)}</p><a class="feature-link" href="${h(itemWa || '#contact')}" target="_blank" rel="noopener noreferrer">اطلب الخدمة الآن ${svg('arrow', 15)}</a></article>`;
  }).join('');

  const defaultStats = [
    {value: '+150', label: 'مشروع وعميل ناجح'},
    {value: '98%', label: 'نسبة رضا العملاء'},
    {value: '+7 سنوات', label: 'خبرة عملية بالسوق'},
    {value: '24/7', label: 'دعم ومتابعة مستمرة'}
  ];
  const stats = (site.stats && site.stats.length ? site.stats : defaultStats).slice(0,4).map(st =>
    `<div class="stat-box"><strong>${h(st.value)}</strong><span>${h(st.label)}</span></div>`
  ).join('');

  const defaultPillars = [
    'حلول عملية مفصلة خصيصاً لطبيعة نشاطك وأهدافك',
    'التزام تام بالمواعيد النهائية وجودة التسليم',
    'متابعة مستمرة وتقارير واضحة في كل مرحلة'
  ];
  const pillars = (site.pillars && site.pillars.length ? site.pillars : defaultPillars).map(p =>
    `<li><span class="pillar-check">${svg('check', 16)}</span><span>${h(p)}</span></li>`
  ).join('');

  const defaultSteps = [
    {num: '01', title: 'تواصل واستشارة أولية', desc: 'نفهم احتياجاتك وأهداف مشروعك بدقة لنحدد أفضل مسار للعمل.'},
    {num: '02', title: 'خطة عمل وتنفيذ احترافي', desc: 'نبدأ بتنفيذ الحلول المتفق عليها بخطوات منظمة وجودة عالية.'},
    {num: '03', title: 'التسليم والمتابعة', desc: 'نسلمك العمل جاهزاً مع دعم فني ومتابعة لضمان أفضل النتائج.'}
  ];
  const steps = (site.steps && site.steps.length ? site.steps : defaultSteps).slice(0,3).map(st =>
    `<div class="process-card"><span class="process-num">${h(st.num)}</span><h3>${h(st.title)}</h3><p>${h(st.desc)}</p></div>`
  ).join('');

  const defaultTestimonials = [
    {name: 'م. طارق المنشاوي', role: 'مدير تنفيذي', text: 'تجربة احترافية ومميزة جداً، التزموا بكل التفاصيل والمواعيد وحققنا نتائج ممتازة.'},
    {name: 'أ. نهى عبد الرحمن', role: 'مؤسسة مشروع', text: 'فريق متعاون ويفهم احتياج العميل بسرعة، أنصح بالتعامل معهم بشدة.'},
    {name: 'أ. كريم الشافعي', role: 'مدير تطوير أعمال', text: 'خدمة ممتازة ومتابعة مستمرة حتى بعد التسليم، شكراً لكم على الاحترافية.'}
  ];
  const reviews = (site.testimonials && site.testimonials.length ? site.testimonials : defaultTestimonials).slice(0,3).map(r =>
    `<article class="review-card">${starsHtml(5)}<p class="review-text">“${h(r.text)}”</p><div class="reviewer"><strong>${h(r.name)}</strong><small>${h(r.role)}</small></div></article>`
  ).join('');

  const heroImage = safeImageUrl(site.heroImage);
  const businessIllustration = heroImage
    ? `<div class="hero-photo-frame"><img class="client-hero-image" src="${h(heroImage)}" alt="${h(site.name)}" loading="eager"/></div>`
    : `<div class="mockup-browser"><div class="browser-bar"><span></span><span></span><span></span></div><div class="mockup-inner"><div class="brand-tiny">${h(site.name)}</div><div class="mock-heading"></div><div class="mock-heading short"></div><div class="mock-desc"></div><div class="mock-desc tiny"></div><div class="mock-cta"></div><div class="mock-cards"><i></i><i></i><i></i></div></div></div>`;

  const body = `${previewBanner(slug, preview)}<div class="tenant business-tenant">
  <header class="tenant-header sticky-header"><div class="container header-inner">${brandMark(site.name, site.logoLetter || 'B', site.subtitle || 'خدمات وحلول احترافية')}<nav><a href="#services">خدماتنا</a><a href="#about">لماذا نحن</a><a href="#process">طريقة العمل</a><a href="#reviews">آراء العملاء</a><a href="#contact">تواصل معنا</a></nav><div class="header-cta">${publicContact(site, site.cta || 'تواصل معنا', 'button primary btn-sm')}</div></div></header>
  <main>
    <section class="tenant-hero container">
      <div class="hero-copy">
        <span class="eyebrow badge-pill">${svg('spark',16)} ${h(site.eyebrow || 'حلول تصنع الفرق')}</span>
        <h1>${h(site.headline)}</h1>
        <p>${h(site.description)}</p>
        <div class="hero-actions">${publicContact(site, site.cta || 'ابدأ الآن')}<a class="button outline" href="#services">استكشف خدماتنا ${svg('arrow',17)}</a></div>
        <div class="trust-line"><span class="trusted-dot"></span><span>${h(site.trustLine || 'نهتم بالتفاصيل التي تهمك')}</span></div>
      </div>
      <div class="business-visual">
        <div class="float-tag tag-a">${svg('award',20)}<div><strong>جودة واحترافية معتمدة</strong><small>التزام كامل بأعلى المعايير</small></div></div>
        ${businessIllustration}
        <div class="float-tag tag-b">${svg('bolt',20)}<div><strong>نتائج سريعة وملموسة</strong><small>خطط عمل واضحة ومدروسة</small></div></div>
      </div>
    </section>

    <section class="stats-ribbon container"><div class="stats-grid">${stats}</div></section>

    <section class="services-section" id="services">
      <div class="container">
        <div class="section-head"><span class="eyebrow">${svg('layers', 16)} ماذا نقدم؟</span><h2>خدمات متكاملة تساعد مشروعك على النمو</h2><p>نقدم حلولاً مدروسة بعناية لتلبية احتياجات شركتك وتحقيق أهدافك بأعلى كفاءة.</p></div>
        <div class="features-grid">${services}</div>
      </div>
    </section>

    <section class="about-section container" id="about">
      <div class="about-copy">
        <span class="eyebrow">${svg('shield', 16)} من نحن ولماذا تختارنا؟</span>
        <h2>${h(site.aboutTitle || 'شريك استراتيجي تثق فيه')}</h2>
        <p>${h(site.about || 'نقدم خدمات عملية ونضع احتياجات العملاء في مقدمة أولوياتنا.')}</p>
        <ul class="pillars-list">${pillars}</ul>
      </div>
      <div class="about-card-showcase">
        <div class="exec-card">
          <div class="exec-card-header"><span class="exec-icon">${svg('shield', 28)}</span><div><strong>ضمان الجودة والالتزام</strong><small>${h(site.name)}</small></div></div>
          <p class="exec-quote">“هدفنا ليس فقط تقديم خدمة، بل بناء شراكة نجاح طويلة الأمد تضمن نمو أعمالك وثقة عملائك.”</p>
          <div class="exec-meta">
            ${site.hours ? `<div>${svg('clock', 16)} <span>${h(site.hours)}</span></div>` : `<div>${svg('clock', 16)} <span>متاحون للرد طوال أيام الأسبوع</span></div>`}
            ${site.address ? `<div>${svg('pin', 16)} <span>${h(site.address)}</span></div>` : `<div>${svg('globe', 16)} <span>نخدم عملاءنا في كافة المحافظات</span></div>`}
          </div>
        </div>
      </div>
    </section>

    <section class="process-section" id="process">
      <div class="container">
        <div class="section-head"><span class="eyebrow">${svg('bolt', 16)} خطوات واضحة</span><h2>كيف نعمل معك خطوة بخطوة؟</h2><p>منظومة عمل بسيطة وسريعة تضمن لك راحة البال وأفضل النتائج.</p></div>
        <div class="process-grid">${steps}</div>
      </div>
    </section>

    <section class="reviews-section container" id="reviews">
      <div class="section-head"><span class="eyebrow">${svg('users', 16)} ثقة عملائنا</span><h2>ماذا يقول العملاء عن تجربتهم معنا؟</h2></div>
      <div class="reviews-grid">${reviews}</div>
    </section>

    <section class="tenant-contact container" id="contact">
      <div class="contact-banner-inner">
        <span class="eyebrow">${svg('message', 16)} تواصل معنا الآن</span>
        <h2>جاهز لبدء خطوتك القادمة؟</h2>
        <p>${h(site.contactText || 'احكي لنا عن احتياجك ودعنا نساعدك بأفضل الحلول.')}</p>
        <div class="contact-actions">${publicContact(site, 'تحدث معنا عبر واتساب الآن')}</div>
        <div class="contact-info-pills">
          ${site.phoneDisplay ? `<span class="info-pill">${svg('phone', 15)} ${h(site.phoneDisplay)}</span>` : ''}
          ${site.contactEmail ? `<span class="info-pill">${svg('globe', 15)} ${h(site.contactEmail)}</span>` : ''}
          ${site.hours ? `<span class="info-pill">${svg('clock', 15)} ${h(site.hours)}</span>` : ''}
        </div>
      </div>
    </section>
  </main>${ownerFooter(site)}</div>`;

  return pageShell({title:`${site.name} | ${site.headline}`,description:site.description,body,theme:site.theme, noindex:preview,canonical:preview?'':`https://${slug}.${base}/`});
}
