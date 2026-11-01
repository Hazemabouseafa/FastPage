import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {getPublicSites, getSite, subdomainFromHost} from './lib/sites.js';
import {businessPage} from './templates/business.js';
import {restaurantPage} from './templates/restaurant.js';
import {portfolioPage} from './templates/portfolio.js';
import {homePage} from './pages/home.js';
import {pageShell} from './templates/layout.js';
const cssFile = fileURLToPath(new URL('../public/css/styles.css', import.meta.url));
const mediaDir = fileURLToPath(new URL('../public/media/', import.meta.url));
const baseDomain = process.env.BASE_DOMAIN || 'fastpage.my';
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';
const renderers = {business:businessPage, restaurant:restaurantPage,portfolio:portfolioPage};
function send(res, code, body, type='text/html; charset=utf-8') {
  res.writeHead(code,{'Content-Type':type,'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'SAMEORIGIN'});
  res.end(body);
}
function errorPage(msg, status=404) {return pageShell({title:'الصفحة غير موجودة | FastPage',description:'',noindex:true,body:`<main class="error-page" dir="rtl"><div class="error-box"><span class="error-number">${status}</span><h1>${msg}</h1><p>تأكد من الرابط أو ارجع إلى الصفحة الرئيسية.</p><a class="button primary" href="https://${baseDomain}/">العودة إلى FastPage</a></div></main>`});}
export const server = http.createServer(async (req,res) => {
 try {
  if (!['GET','HEAD'].includes(req.method)) return send(res,405,'Method Not Allowed','text/plain; charset=utf-8');
  const hostHeader = String(req.headers['x-forwarded-host'] || req.headers.host || 'localhost').split(',')[0].trim();
  const url = new URL(req.url || '/',`http://${hostHeader}`);
  if (url.pathname === '/css/styles.css') return send(res,200,await readFile(cssFile),'text/css; charset=utf-8');
  if (/^\/media\/[a-zA-Z0-9_-]+\.(png|jpe?g|webp|gif)$/.test(url.pathname)) {
    const ext = url.pathname.split('.').at(-1).toLowerCase();
    const types = {png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',gif:'image/gif'};
    try { return send(res,200,await readFile(resolve(mediaDir,url.pathname.split('/').at(-1))),types[ext]); }
    catch { return send(res,404,'Not found','text/plain; charset=utf-8'); }
  }
  if (url.pathname === '/health') return send(res,200,JSON.stringify({ok:true}),'application/json; charset=utf-8');
  if (url.pathname === '/favicon.ico') return send(res,204,'','image/x-icon');
  const slug = subdomainFromHost(hostHeader,baseDomain);
  if (slug) {
   const site=await getSite(slug);
   return site && url.pathname === '/' ? send(res,200,renderers[site.template](site,baseDomain,slug)) : send(res,404,errorPage('الصفحة المطلوبة غير موجودة'));
  }
  if (/^\/preview\/[a-z0-9-]+\/?$/.test(url.pathname)) {
   const previewSlug=url.pathname.split('/')[2];const site=await getSite(previewSlug);
   return site ? send(res,200,renderers[site.template](site,baseDomain,previewSlug,true)) : send(res,404,errorPage('القالب غير موجود'));
  }
  if (url.pathname === '/') return send(res,200,homePage(await getPublicSites(),baseDomain));
  if (url.pathname === '/robots.txt') return send(res,200,`User-agent: *\nAllow: /\nDisallow: /preview/\n`,'text/plain; charset=utf-8');
  return send(res,404,errorPage('الصفحة المطلوبة غير موجودة'));
 } catch(err) {console.error(err); return send(res,500,errorPage('حدث خطأ غير متوقع',500));}
});
if (process.env.NODE_ENV !== 'test') {
  server.listen(port, host, () => console.log(`FastPage running at http://localhost:${port}`));
  const shutdown = () => server.close(() => process.exit(0));
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}
