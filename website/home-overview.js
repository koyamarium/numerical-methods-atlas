import {t} from './i18n.js';
import {homeAreas,homeCopy,homePaths} from './home-overview-data.js';
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=(key,values)=>esc(t(homeCopy[key],values));
const link=(route,key,cls='')=>`<a href="#${esc(route)}"${cls?` class="${cls}"`:''}>${esc(t(key))}</a>`;
export const resolveHomeArea=id=>homeAreas.find(area=>area.id===id)||homeAreas[0];
export function homeAreaURL(href,area){
 const url=new URL(href),parts=url.hash.slice(1).split('?'),query=new URLSearchParams(parts[1]||'');
 query.set('area',resolveHomeArea(area).id);url.hash='/?'+query.toString();return url.href;
}
export function homeAreaDetail(id){
 const area=resolveHomeArea(id),number=String(homeAreas.indexOf(area)+1).padStart(2,'0');
 return `<p class="eyebrow">${number} / ${esc(t(area.name))}</p><h3 id="home-detail-title">${esc(t(area.question))}</h3><p class="detail-description">${esc(t(area.description))}</p>${area.groups.map((group,i)=>`<div class="connection"><div class="connection-label">${text(['models-label','methods-label','verify-label'][i])}</div><ul>${group.map(entry=>`<li><a href="#${esc(entry.route)}"><span>${esc(t(entry.name))} <span aria-hidden="true">↗</span></span><span class="badge ${entry.kind}">${text(entry.kind)}</span></a></li>`).join('')}</ul></div>`).join('')}<div class="detail-footer">${link(area.entry,homeCopy['start-area'])}${link('/coverage',homeCopy['inspect-scope'])}</div>`;
}
export function homeOverviewPage(coverage,selected){
 const area=resolveHomeArea(selected),c=coverage.counts;
 return `<div class="home-overview" id="home-overview" data-area="${area.id}" data-localize="false">
 <section class="intro page-width"><div><p class="eyebrow">${text('eyebrow')}</p><h1>${text('title')}<br><em>${text('title-em')}</em></h1><p class="intro-description">${text('description')}</p></div><div class="intro-summary"><div><p class="summary-title">${text('coverage')}</p><div class="summary-counts">${[[c.equations,'models'],[c.methods,'methods'],[c.papers,'papers']].map(([n,key])=>`<div><strong>${n}</strong><span>${text(key)}</span></div>`).join('')}</div><p class="flow">${['equation','discretize','solve','verify'].map(key=>`<span>${text(key)}</span>`).join('<span class="flow-arrow" aria-hidden="true">→</span>')}</p></div>${link('/coverage',homeCopy.counting,'quiet-link')}</div></section>
 <section class="page-width overview" id="atlas-map" aria-labelledby="home-map-title"><div class="section-heading"><div><p class="eyebrow">THE MAP / 01–06</p><h2 id="home-map-title">${text('map-title')}</h2></div><p>${text('map-description')}</p></div><div class="map-layout"><div class="map-index"><div class="domain-grid" aria-label="${text('map-label')}">${homeAreas.map((entry,i)=>`<button class="domain-button" data-home-area="${entry.id}" aria-pressed="${entry.id===area.id}" aria-controls="home-domain-detail"><span class="domain-number">0${i+1}</span><strong>${esc(t(entry.name))}</strong><span class="domain-hint">${esc(t(entry.hint))}</span><span class="domain-arrow" aria-hidden="true">↗</span></button>`).join('')}</div><p>${text('scope')}</p></div><section class="domain-panel" id="home-domain-detail" aria-labelledby="home-detail-title">${homeAreaDetail(area.id)}</section></div><p class="home-selection-status" role="status" aria-live="polite"></p></section>
 <section class="page-width guided" aria-labelledby="home-start-title"><h2 id="home-start-title">${text('start-title')}</h2><p class="guided-intro">${text('start-description')}</p><div class="guided-list">${homePaths.map(path=>`<article class="guided-route"><p class="eyebrow">${esc(t(path.tag))}</p><h3>${esc(t(path.title))}</h3><p>${esc(t(path.description))}</p><ol>${path.links.map(([route,key])=>`<li>${link(route,key)}</li>`).join('')}</ol></article>`).join('')}</div></section>
 <section class="page-width evidence"><div class="evidence-inner"><div><p class="eyebrow">KEEP THE EVIDENCE CLOSE</p><h2>${text('evidence-title')}</h2><p>${text('evidence-description',{chapters:c.reading_chapters,sources:c.references,biology:c.biological_entries})}</p></div><div class="evidence-links">${link('/coverage',homeCopy.inventory)}${link('/gallery',homeCopy.gallery)}${link('/glossary',homeCopy.glossary)}</div></div></section>
 <aside class="page-width future"><p>${text('future')} ${link('/read/roadmap?section=planned-quantum-chemistry-and-dft',homeCopy.roadmap)}</p></aside>
 </div>`;
}
export function wireHomeOverview({rewriteLinks=html=>html}={}){
 const root=document.getElementById('home-overview');if(!root)return;
 for(const button of root.querySelectorAll('[data-home-area]'))button.addEventListener('click',()=>{
  const area=resolveHomeArea(button.dataset.homeArea);root.dataset.area=area.id;
  history.replaceState(null,'',homeAreaURL(location.href,area.id));
  root.querySelector('#home-domain-detail').innerHTML=rewriteLinks(homeAreaDetail(area.id));
  root.querySelectorAll('[data-home-area]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  root.querySelector('.home-selection-status').textContent=t(homeCopy.selected,{area:t(area.name)});
  if(matchMedia('(max-width:700px)').matches)root.querySelector('#home-domain-detail').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
 });
}
