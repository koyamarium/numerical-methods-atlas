import {currentLanguage} from './i18n.js';
import {readingURL} from './reading-urls.js';
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const normalizeSearch=value=>String(value).normalize('NFKC').toLocaleLowerCase().replace(/[‐‑‒–—−-]/g,' ').replace(/\s+/g,' ').trim();
const plain=value=>String(value).replace(/<[^>]*>/g,' ').replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g,c=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'",'&nbsp;':' '}[c])).replace(/\s+/g,' ').trim();

/** One logical chapter per record, with both editions and glossary aliases. */
export function buildHomeSearchIndex(english,japanese,coverage,glossary){
 return {version:1,scope:'chapter titles, section headings, model and method labels, glossary aliases',entries:Object.entries(english).map(([id,en])=>{
  const ja=japanese[id],items=coverage.items.filter(item=>item.chapter===id),terms=glossary.terms.filter(term=>term.chapter===id);
  return {id,title:{en:plain(en.title||id),ja:ja?plain(ja.title||en.title):null},headings:{en:en.headings.map(h=>({id:h.id,title:plain(h.title)})),ja:ja?ja.headings.map(h=>({id:h.id,title:plain(h.title)})):[]},keywords:[...new Set([...items.flatMap(item=>[item.label,item.group]),...terms.flatMap(term=>[term.en,term.ja,...(term.aliases||[])])].filter(Boolean))]};
 })};
}
export function searchChapters(index,query,language='en'){
 const q=normalizeSearch(query);if(!q)return [];
 const words=q.split(' ');
 return index.entries.flatMap(entry=>{
  const titles=[entry.title.en,entry.title.ja].filter(Boolean),headings=[...entry.headings.en,...entry.headings.ja],keys=entry.keywords;
  const hay=normalizeSearch([...titles,...headings.map(h=>h.title),...keys].join(' '));
  if(!words.every(word=>hay.includes(word)))return [];
  const titleHit=titles.some(title=>normalizeSearch(title).includes(q));
  const heading=headings.find(h=>normalizeSearch(h.title).includes(q))||headings.find(h=>words.every(word=>normalizeSearch(h.title).includes(word)));
  const score=(titleHit?100:0)+(heading?40:0)+(keys.some(key=>normalizeSearch(key)===q)?60:0);
  const locale=language==='ja'&&entry.title.ja?'ja':'en';
  const shownHeading=heading?(entry.headings[locale].find(h=>h.id===heading.id)||heading):null;
  return [{id:entry.id,title:entry.title[locale],locale,section:titleHit?'':heading?.id||'',detail:shownHeading?.title||(keys.filter(key=>words.every(word=>normalizeSearch(key).includes(word))).slice(0,3).join(' · ')||keys.slice(0,4).join(' · ')),score}];
 }).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
}
const copy={ja:{label:'アトラスを検索',placeholder:'例：衝撃波、Poisson、Runge–Kutta',hint:'章・見出し・方程式・手法名を日英で検索。検索語はこのブラウザ内で処理します。',button:'検索',empty:'キーワードを入力してください。',loading:'検索データを読み込んでいます…',none:'該当する章がありません。別の用語や英語名でもお試しください。',failed:'検索データを読み込めませんでした。もう一度「検索」を押してください。',english:'英語の解説',count:(n,m)=>`${n}章が該当${n>m?`（上位${m}章を表示）`:''}`},en:{label:'Search the atlas',placeholder:'e.g. shock waves, Poisson, Runge–Kutta',hint:'Search chapter titles, headings, equations and methods in English or Japanese. Search terms stay in this browser.',button:'Search',empty:'Enter a keyword to find a chapter.',loading:'Loading the search index…',none:'No chapters match. Try another term or its Japanese name.',failed:'The search index could not load. Press Search to try again.',english:'English chapter',count:(n,m)=>`${n} matching chapter${n===1?'':'s'}${n>m?` (showing ${m})`:''}`}};
export function homeSearchPage(){
 const c=copy[currentLanguage()];
 return `<section class="page-width home-search" data-localize="false" aria-labelledby="home-search-label"><form role="search" id="home-search-form"><label for="home-search-input" id="home-search-label">${c.label}</label><div class="home-search-controls"><input id="home-search-input" type="search" placeholder="${esc(c.placeholder)}" aria-describedby="home-search-hint" autocomplete="off"><button type="submit">${c.button}</button></div><p id="home-search-hint">${c.hint}</p></form><p id="home-search-status" role="status" aria-live="polite"></p><ol id="home-search-results" hidden></ol></section>`;
}
let indexPromise;
function loadIndex(){
 if(!indexPromise)indexPromise=fetch(new URL('home-search-index.json',import.meta.url)).then(r=>{if(!r.ok)throw Error('Search index unavailable');return r.json();}).catch(error=>{indexPromise=null;throw error;});
 return indexPromise;
}
export function wireHomeSearch(){
 const form=document.getElementById('home-search-form');if(!form)return;
 const input=form.querySelector('input'),status=document.getElementById('home-search-status'),list=document.getElementById('home-search-results'),language=currentLanguage(),c=copy[language];
 let version=0,timer,composing=false;
 async function update(){
  if(!form.isConnected)return;
  const ticket=++version,query=input.value.trim();list.hidden=true;list.replaceChildren();
  if(!query){status.textContent='';return;}
  status.textContent=c.loading;
  try{
   const index=await loadIndex();if(ticket!==version||!form.isConnected)return;
   const found=searchChapters(index,query,language),shown=found.slice(0,8);
   status.textContent=found.length?c.count(found.length,shown.length):c.none;
   for(const result of shown){
    const li=document.createElement('li'),a=document.createElement('a');a.href=readingURL(new URL('.',import.meta.url),result.id,result.locale,result.section);a.textContent=result.title;li.append(a);
    if(result.detail){const p=document.createElement('p');p.textContent=result.detail;li.append(p);}
    if(language==='ja'&&result.locale==='en'){const note=document.createElement('small');note.textContent=c.english;li.append(note);}
    list.append(li);
   }
   list.hidden=!shown.length;
  }catch{if(ticket===version&&form.isConnected)status.textContent=c.failed;}
 }
 const schedule=()=>{clearTimeout(timer);++version;if(!composing)timer=setTimeout(update,120);};
 input.addEventListener('input',schedule);
 input.addEventListener('compositionstart',()=>{composing=true;clearTimeout(timer);++version;});
 input.addEventListener('compositionend',()=>{composing=false;schedule();});
 form.addEventListener('submit',event=>{event.preventDefault();clearTimeout(timer);update();});
}
