import {h, svg, safeImageUrl, whatsappLink} from '../lib/utils.js';
import {pageShell, publicContact, brandMark, ownerFooter, previewBanner, starsHtml} from './layout.js';

export function portfolioPage(site, base, slug, preview=false) {
  const waNumber = site.whatsapp || process.env.CONTACT_WHATSAPP || '201550612361';
  const icons = ['spark','layers','globe','bolt','award','briefcase'];

  const features = (site.services || []).slice(0,6).map((s,i) => {
    const svcWa = whatsappLink(waNumber, `مرحبًا ${site.name}، أود الاستفسار عن: ${s.title}`);
    return `<div class="portfolio-service">
      <div class="portfolio-service-top">
        <span class="portfolio-service-icon">${svg(icons[i % icons.length], 24)}</span>
        ${s.deliverables ? `<small class="service-deliverable">${h(s.deliverables)}</small>` : ''}
      </div>
      <h3>${h(s.title)}</h3>
      <p>${h(s.description)}</p>
      <a class="feature-link" href="${h(svcWa || '#contact')}" target="_blank" rel="noopener noreferrer">اطلب هذه الخدمة ${svg('arrow', 15)}</a>
    </div>`;
  }).join('');

  const defaultSkills = ['تصميم الهوية البصرية', 'تصميم العبوات', 'واجهات UI/UX', 'سوشيال ميديا', 'التوجيه الفني'];
  const skills = (site.skills && site.skills.length ? site.skills : defaultSkills).map(sk =>
    `<span class="skill-pill">${h(sk)}</span>`
  ).join('');

  const defaultStats = [
    {value: '+120', label: 'مشروع وهوية ناجحة'},
    {value: '+6 سنوات', label: 'خبرة احترافية'},
    {value: '+95', label: 'عميل في مصر والخليج'},
    {value: '5.0 ★', label: 'تقييم رضا العملاء'}
  ];
  const stats = (site.stats && site.stats.length ? site.stats : defaultStats).slice(0,4).map(st =>
    `<div class="stat-box portfolio-stat"><strong>${h(st.value)}</strong><span>${h(st.label)}</span></div>`
  ).join('');

  const defaultProjects = [
    {title: 'هوية وتغليف محمصة كِيف', category: 'هوية بصرية وتغليف', description: 'تصميم الشعار والنمط البصري وعبوات القهوة بطابع عصري فاخر.', image: '/media/work-1.jpg', result: '+40% نمو بالمبيعات'},
    {title: 'تصميم تطبيق ومنصة نُمو', category: 'UI/UX وتصميم رقمي', description: 'تصميم تجربة مستخدم سلسة ونظام بصري متكامل للموقع والتطبيق.', image: '/media/work-2.jpg', result: 'تجربة رقمية متكاملة'},
    {title: 'علامة أورا لمستحضرات التجميل', category: 'براندينج ودليل هوية', description: 'بناء الهوية اللونية والخطوط وتصميم عبوات المنتجات ودليل الهوية.', image: '/media/work-3.jpg', result: 'إطلاق ناجح بالأسواق'},
    {title: 'حملة إطلاق متجر ڤيلڤت', category: 'محتوى بصري وسوشيال ميديا', description: 'تصميم قوالب السوشيال ميديا والبنرات الإعلانية المتناسقة.', image: '/media/work-4.jpg', result: 'تفاعل مضاعف 3X'}
  ];
  const works = (site.projects && site.projects.length ? site.projects : defaultProjects).slice(0,4).map(p => {
    const pImg = safeImageUrl(p.image);
    const workWa = whatsappLink(waNumber, `مرحبًا ${site.name}، أعجبني مشروع (${p.title}) وأريد تنفيذ مشروع مشابه`);
    return `<article class="work-card">
      <div class="work-media">
        ${pImg ? `<img src="${h(pImg)}" alt="${h(p.title)}" loading="lazy"/>` : `<div class="work-placeholder">${svg('layers', 42)}</div>`}
        ${p.result ? `<span class="work-result-badge">${svg('bolt', 14)} ${h(p.result)}</span>` : ''}
      </div>
      <div class="work-body">
        <span class="work-category">${h(p.category)}</span>
        <h3>${h(p.title)}</h3>
        <p>${h(p.description)}</p>
        <a class="work-cta" href="${h(workWa || '#contact')}" target="_blank" rel="noopener noreferrer">اطلب مشروعاً مشابهاً ${svg('arrow', 15)}</a>
      </div>
    </article>`;
  }).join('');

  const defaultReviews = [
    {name: 'أ. فهد العتيبي', role: 'مؤسس محمصة كِيف — الرياض', text: 'فهمت رؤيتنا من أول اجتماع، الهوية والتغليف خطفوا أنظار العملاء من أول يوم افتتاح.'},
    {name: 'د. دينا الشربيني', role: 'مؤسسة براند أورا — القاهرة', text: 'ذوق رفيع جداً والتزام تام بالمواعيد، سلمتنا دليل هوية منظم سهل علينا كل شيء.'},
    {name: 'م. زياد الكيلاني', role: 'مدير تقني — دبي', text: 'تصميم الواجهات كان نقلة كبيرة لنا، مرتب وواضح وسهل جداً في التنفيذ.'}
  ];
  const reviews = (site.testimonials && site.testimonials.length ? site.testimonials : defaultReviews).slice(0,3).map(r =>
    `<article class="review-card portfolio-review-card">${starsHtml(5)}<p class="review-text">“${h(r.text)}”</p><div class="reviewer"><strong>${h(r.name)}</strong><small>${h(r.role)}</small></div></article>`
  ).join('');

  const photo = safeImageUrl(site.avatarImage);
  const portfolioAvatar = photo
    ? `<img class="avatar-photo" src="${h(photo)}" alt="${h(site.name)}"/>`
    : `<span class="avatar-initials">${h(site.avatarInitials || 'FP')}</span>`;

  const body = `${previewBanner(slug, preview)}<div class="tenant portfolio-tenant">
  <header class="tenant-header sticky-header"><div class="container header-inner">${brandMark(site.name, site.logoLetter || 'P', site.subtitle || site.role || 'معرض الأعمال')}<nav><a href="#works">أعمالي</a><a href="#services">الخدمات والباقات</a><a href="#about">نبذة عني</a><a href="#reviews">آراء العملاء</a><a href="#contact">تواصل معي</a></nav><div class="header-cta">${publicContact(site, site.cta || 'ابدأ مشروعك', 'button primary btn-sm')}</div></div></header>
  <main>
    <section class="portfolio-hero container">
      <div class="portfolio-copy">
        <div class="availability-pill"><span class="avail-dot"></span> ${h(site.availability || 'متاحة لاستقبال مشاريع جديدة')}</div>
        <span class="eyebrow">${svg('spark',16)} ${h(site.eyebrow || 'أهلًا، سعيد بزيارتك')}</span>
        <h1>${h(site.headline)}</h1>
        <p>${h(site.description)}</p>
        <div class="skills-row">${skills}</div>
        <div class="hero-actions">${publicContact(site, site.cta || 'خلينا نتكلم')}<a href="#works" class="button outline">تصفح معرض الأعمال ${svg('arrow',17)}</a></div>
      </div>
      <div class="portrait-box">
        <div class="float-tag tag-a">${svg('award', 18)}<div><strong>+120 مشروع مكتمل</strong><small>في مصر والخليج العربي</small></div></div>
        <div class="portrait-inner">
          ${portfolioAvatar}
          <div class="portrait-label">
            <strong>${h(site.name)}</strong>
            <small>${h(site.role || 'خدمات احترافية')}</small>
            <div class="portrait-stars">${starsHtml(5)} <span>5.0 تقييم العملاء</span></div>
          </div>
        </div>
        <div class="float-tag tag-b">${svg('check', 18)}<div><strong>ملفات أصلية 100%</strong><small>تسليم دقيق بالمواعيد</small></div></div>
      </div>
    </section>

    <section class="stats-ribbon container"><div class="stats-grid">${stats}</div></section>

    <section id="works" class="portfolio-works container">
      <div class="section-head"><span class="eyebrow">${svg('briefcase', 16)} مختارات من أعمالي</span><h2>مشاريع وهويات صنعت الفارق لأصحابها</h2><p>نماذج واقعية لمشاريع تم تنفيذها بعناية لتحقيق أهداف العملاء التجارية والبصرية</p></div>
      <div class="works-grid">${works}</div>
    </section>

    <section id="services" class="portfolio-services">
      <div class="container">
        <div class="section-head"><span class="eyebrow">${svg('layers', 16)} كيف أساعدك؟</span><h2>الخدمات والباقات المتاحة</h2><p>باقات مرنة ومفصلة لتغطية كافة احتياجات علامتك التجارية من البداية وحتى الإطلاق</p></div>
        <div class="portfolio-grid">${features}</div>
      </div>
    </section>

    <section id="about" class="about-section container">
      <div class="about-copy">
        <span class="eyebrow">عنّي وعن منهجيتي</span>
        <h2>${h(site.aboutTitle || 'شغفي إني أقدم لك الأفضل')}</h2>
        <p>${h(site.about || 'بقدم خدمات مصممة بناءً على احتياج كل عميل، مع اهتمام بالتفاصيل وجودة التسليم.')}</p>
        <ul class="pillars-list">
          <li><span class="pillar-check">${svg('check', 16)}</span><span>دراسة متعمقة لهوية مشروعك والمنافسين قبل البدء</span></li>
          <li><span class="pillar-check">${svg('check', 16)}</span><span>تعديلات مرنة لضمان رضاك التام عن النتيجة النهائية</span></li>
          <li><span class="pillar-check">${svg('check', 16)}</span><span>تسليم كافة الملفات المصدرية الجاهزة للطباعة والنشر</span></li>
        </ul>
      </div>
      <div class="portfolio-note">
        ${svg('spark',38)}
        <strong>أفكار استراتيجية واضحة.<br/>تنفيذ بصري متقن.<br/>نتائج تضاعف مبيعاتك.</strong>
        <p>كل تصميم يبدأ بفهم عميلك المستهدف وينتهي ببناء علامة تجارية يفخر بها مشروعك.</p>
      </div>
    </section>

    <section id="reviews" class="reviews-section container">
      <div class="section-head"><span class="eyebrow">${svg('users', 16)} شهادات العملاء</span><h2>ماذا قال أصحاب المشاريع عن العمل معي؟</h2></div>
      <div class="reviews-grid">${reviews}</div>
    </section>

    <section class="tenant-contact container" id="contact">
      <div class="contact-banner-inner portfolio-contact-banner">
        <span class="eyebrow">التواصل وحجز المشاريع</span>
        <h2>جاهز لتحويل فكرتك إلى علامة تجارية مميزة؟</h2>
        <p>${h(site.contactText || 'ابعتلي تفاصيل فكرتك على واتساب وسنحدد الباقة الأنسب لمشروعك.')}</p>
        <div class="contact-actions">${publicContact(site, 'ابدأ المحادثة عبر واتساب')}</div>
        <div class="contact-info-pills">
          <span class="info-pill">${svg('bolt', 15)} متوسط وقت الرد: أقل من ساعتين</span>
          <span class="info-pill">${svg('shield', 15)} استشارة مبدئية مجانية لمشروعك</span>
        </div>
      </div>
    </section>
  </main>${ownerFooter(site)}</div>`;

  return pageShell({title:`${site.name} | ${site.headline}`,description:site.description,body,theme:site.theme,noindex:preview,canonical:preview?'':`https://${slug}.${base}/`});
}
