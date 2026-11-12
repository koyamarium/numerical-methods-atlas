import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {buildHomeSearchIndex,searchChapters,homeSearchPage} from '../home-search.js';
import {configureLocale} from '../i18n.js';
import {readingURL} from '../reading-urls.js';
const en={elliptic:{title:'Diffusion &amp; elliptic solvers',headings:[{id:'multigrid',title:'Geometric multigrid'}]},rk:{title:'Runge–Kutta families',headings:[{id:'stability',title:'Absolute stability'}]},english:{title:'English-only chapter',headings:[]}};
const ja={elliptic:{title:'拡散・楕円型方程式',headings:[{id:'multigrid',title:'幾何学的マルチグリッド'}]},rk:{title:'Runge–Kutta法',headings:[{id:'stability',title:'絶対安定性'}]}};
const index=buildHomeSearchIndex(en,ja,{items:[{chapter:'elliptic',label:'Poisson equation',group:'Fields'}]},{terms:[{chapter:'elliptic',en:'Conjugate gradient',ja:'共役勾配法',aliases:['CG']}]});
test('Japanese and English terms find the same logical chapter, without duplicate editions',()=>{
 for(const q of ['共役勾配法','ＣＧ','Poisson','conjugate gradient']){const results=searchChapters(index,q,'ja');assert.equal(results.length,1);assert.equal(results[0].id,'elliptic');assert.equal(results[0].title,'拡散・楕円型方程式');}
 assert.match(searchChapters(index,'共役勾配','ja')[0].detail,/共役勾配/);
 assert.equal(index.entries.length,3);assert.equal(index.entries[0].title.en,'Diffusion & elliptic solvers');
});
test('a heading hit opens the same section in the selected edition; missing translations use English',()=>{
 const r=searchChapters(index,'マルチグリッド','ja')[0];assert.equal(r.section,'multigrid');
 assert.equal(readingURL('https://example.org/numerical-methods-atlas/',r.id,r.locale,r.section),'https://example.org/numerical-methods-atlas/ja/read/elliptic/#multigrid');
 assert.equal(searchChapters(index,'English-only','ja')[0].locale,'en');
});
test('unicode dash variations and multiple terms work; empty and absent terms produce no results',()=>{
 assert.equal(searchChapters(index,'runge-kutta','en')[0].id,'rk');
 assert.equal(searchChapters(index,'poisson gradient','en')[0].id,'elliptic');
 for(const q of ['','  ','no-such-thing','<script>alert(1)</script>'])assert.deepEqual(searchChapters(index,q),[]);
});
test('homepage search has localized accessible controls and no external search form',()=>{
 for(const lang of ['en','ja']){configureLocale({},lang);const html=homeSearchPage();assert.match(html,/role="search"/);assert.match(html,/aria-live="polite"/);assert.doesNotMatch(html,/action=|https?:/);assert.ok(html.includes(lang==='ja'?'アトラスを検索':'Search the atlas'));}
});
test('all real glossary terms resolve to existing source chapters',()=>{
 const glossary=JSON.parse(readFileSync(new URL('../../catalog/glossary.json',import.meta.url),'utf8'));
 for(const term of glossary.terms.filter(t=>t.chapter))assert.ok(existsSync(new URL('../../docs/'+term.chapter+'.md',import.meta.url)),term.chapter);
});
