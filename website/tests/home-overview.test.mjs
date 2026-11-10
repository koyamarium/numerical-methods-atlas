import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {configureLocale} from '../i18n.js';
import {homeAreas} from '../home-overview-data.js';
import {homeAreaDetail,homeAreaURL,homeOverviewPage,resolveHomeArea} from '../home-overview.js';
import {rewriteReadingLinks} from '../reading-urls.js';
const read=path=>JSON.parse(readFileSync(new URL(path,import.meta.url),'utf8'));
const messages=read('../locales/messages.json'),coverage=read('../content/coverage.json');
const manifest=read('../../catalog/translations.json');
const translated=Object.keys(manifest.chapters).filter(id=>manifest.chapters[id].ja);

test('homepage area URLs keep the project subpath and language without creating invalid areas',()=>{
 assert.equal(new Set(homeAreas.map(a=>a.id)).size,6);
 assert.equal(resolveHomeArea('missing').id,'foundations');
 const url=new URL(homeAreaURL('https://example.org/numerical-methods-atlas/?lang=ja&x=1#/?other=kept','diffusion'));
 assert.equal(url.pathname,'/numerical-methods-atlas/');
 assert.equal(url.searchParams.get('lang'),'ja');assert.equal(url.searchParams.get('x'),'1');
 assert.equal(url.hash,'#/?other=kept&area=diffusion');
 assert.match(homeAreaURL(url.href,'<bad>'),/area=foundations$/);
});
test('all six homepage areas link to existing reading chapters and retain static language-aware URLs',()=>{
 for(const locale of ['en','ja']){
  configureLocale(messages,locale);
  for(const area of homeAreas){
   assert.ok(area.groups.flat().some(e=>e.kind==='interactive'),area.id);
   assert.ok(area.groups.flat().some(e=>e.kind==='reading'),area.id);
   const html=homeAreaDetail(area.id);
   assert.match(html,/id="home-detail-title"/);
   for(const match of html.matchAll(/href="#\/read\/([a-z0-9-]+)/g))assert.ok(existsSync(new URL('../../docs/'+match[1]+'.md',import.meta.url)),match[1]);
   const rewritten=rewriteReadingLinks(html,new URL('https://example.org/numerical-methods-atlas/'),locale,translated);
   assert.doesNotMatch(rewritten,/href="#\/read\//);
   for(const match of rewritten.matchAll(/href="(https:[^"]+)"/g)){
    const url=new URL(match[1]);assert.match(url.pathname,/^\/numerical-methods-atlas\/(en|ja)\/read\//);
    if(locale==='en')assert.ok(url.pathname.includes('/en/read/'));
   }
  }
 }
});
test('homepage counts come from the shared catalog and both languages expose one selected area',()=>{
 for(const locale of ['en','ja']){
  configureLocale(messages,locale);
  const html=homeOverviewPage(coverage,'coupled');
  assert.equal([...html.matchAll(/aria-pressed="true"/g)].length,1);
  assert.match(html,/data-area="coupled"/);
  for(const key of ['equations','methods','papers'])assert.ok(html.includes('<strong>'+coverage.counts[key]+'</strong>'));
  assert.ok(html.includes(String(coverage.counts.references)));
  assert.ok(html.includes(String(coverage.counts.reading_chapters)));
  assert.equal([...html.matchAll(/<h1>/g)].length,1);
  assert.doesNotMatch(html,/UNPUBLISHED PREVIEW|未公開プレビュー/);
 }
});
