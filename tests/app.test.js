import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {escapeHtml, whatsappLink} from '../src/lib/utils.js';
process.env.NODE_ENV = 'test';
const {server} = await import('../src/server.js');
let port;
test.before(async () => {
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  port = server.address().port;
});
test.after(async () => await new Promise(resolve => server.close(resolve)));
const request = (path, host='localhost') => new Promise((resolve, reject) => {
  const req=http.get({host:'127.0.0.1',port,path,headers:{Host:host}},res=>{
    let body='';res.setEncoding('utf8');res.on('data',x=>body+=x);res.on('end',()=>resolve({status:res.statusCode,body,headers:res.headers}));
  });req.on('error',reject);
});
test('main marketing home',async()=>{const r=await request('/');assert.equal(r.status,200);assert.match(r.body,/FastPage/);assert.match(r.body,/١٬٠٠٠/);});
test('preview templates available',async()=>{for(const slug of ['demo','coffee','portfolio']){const r=await request('/preview/'+slug);assert.equal(r.status,200);assert.match(r.body,/<html lang="ar" dir="rtl">/);}});
test('wildcard subdomain resolves client',async()=>{const r=await request('/','ahmed.fastpage.my');assert.equal(r.status,200);assert.match(r.body,/أحمد للخدمات/);});
test('unknown subdomain gets 404',async()=>{assert.equal((await request('/','notfound.fastpage.my')).status,404);});
test('no preview index',async()=>{const r=await request('/preview/coffee');assert.match(r.body,/noindex,nofollow/);});
test('css served',async()=>{const r=await request('/css/styles.css');assert.equal(r.status,200);assert.match(r.headers['content-type'],/text\/css/);});
test('escapes untrusted text and filters phone',()=>{assert.equal(escapeHtml('<script>'), '&lt;script&gt;');assert.equal(whatsappLink('javascript:alert(1)'),'');assert.match(whatsappLink('201012345678'),/^https:\/\/wa.me\//);});
