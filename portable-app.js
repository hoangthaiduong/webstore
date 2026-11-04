(() => {
  'use strict';
  const WEBSITES = Array.isArray(window.WEBSTORE_DATA) ? window.WEBSTORE_DATA : [];
  const CATEGORIES = [
    ['ai','AI & Machine Learning','brain','#6558E8'],['social','Social Media','users','#D65A86'],['games','Games','gamepad','#E18C35'],['development','Development','code','#248C83'],['education','Education','graduation-cap','#3D7BCB'],['design','Design & Media','palette','#B46BC8'],['productivity','Productivity','layers','#4F8B68'],['entertainment','Entertainment','clapperboard','#C65D53'],['research','Search & Research','search','#477BAA'],['utilities','Utilities','wrench','#7B8494'],['business','Business & Finance','briefcase','#B28A3D'],['technology','Technology','cpu','#64748B']
  ].map(([id,name,icon,color])=>({id,name,icon,color,count:WEBSITES.filter(w=>w.category===id).length}));
  const $ = (s,root=document) => root.querySelector(s);
  const $$ = (s,root=document) => [...root.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const iconPaths = {
    house:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',sparkles:'<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z"/>',trending:'<path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/>',brain:'<path d="M12 18V5a3 3 0 0 0-5.8-1A4 4 0 0 0 4 11a4 4 0 0 0 3 7h2"/><path d="M12 18V5a3 3 0 0 1 5.8-1A4 4 0 0 1 20 11a4 4 0 0 1-3 7h-2"/><path d="M8 10a3 3 0 0 0 3 3M16 10a3 3 0 0 1-3 3"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',gamepad:'<path d="M6 12h4m-2-2v4"/><path d="M15 11h.01M18 13h.01"/><path d="M7 7h10a4 4 0 0 1 3.9 3.1l1 5A2.5 2.5 0 0 1 17.7 18l-2.2-2H8.5l-2.2 2A2.5 2.5 0 0 1 2.1 15l1-5A4 4 0 0 1 7 7Z"/>',code:'<path d="m8 17-5-5 5-5m8 10 5-5-5-5m-2-7-4 14"/>','graduation-cap':'<path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c4 3 8 3 12 0v-5m4-2v6"/>',palette:'<path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1.5-3.3 1.8 1.8 0 0 1 1.4-3h1.6A4.5 4.5 0 0 0 22 10.2C22 6.2 17.5 3 12 3Z"/><path d="M7.5 10h.01M11 7h.01M15.5 8h.01"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',clapperboard:'<path d="M4 7h16v14H4zM4 7l3-4h13l-3 4M10 3l-3 4m9-4-3 4m9-4-3 4"/>',search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',wrench:'<path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L14 12l-3-3 3.7-2.7Z"/>',briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2"/>',cpu:'<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4"/>',heart:'<path d="M20.8 8.7c0 5.1-8.8 10.3-8.8 10.3S3.2 13.8 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z"/>',bookmark:'<path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4V4Z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"/>',columns:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a7.8 7.8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a7.8 7.8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8L6.3 12l1.4-2.4 1.7.6a7.8 7.8 0 0 1 1.5-.9l.3-1.8H14l.3 1.8a7.8 7.8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1-.1 1.9Z"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 5-4.9 2 2-4.9 5-2.1Z"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',x:'<path d="m18 6-12 12M6 6l12 12"/>',moon:'<path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',external:'<path d="M14 3h7v7m0-7-9 9"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',plus:'<path d="M12 5v14M5 12h14"/>',trash:'<path d="M3 6h18m-2 0-.9 14H5.9L5 6m3 0V4h8v2m-7 4v6m4-6v6"/>',download:'<path d="M12 3v12m-5-5 5 5 5-5M4 20h16"/>',upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 20h16"/>',arrow:'<path d="M7 17 17 7M7 7h10v10"/>',filter:'<path d="M4 6h16M7 12h10m-7 6h4"/>',check:'<path d="m5 12 4 4L19 6"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.5-3"/>',shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',list:'<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>'
  };
  const icon = (name,cls='') => `<span class="ico ${cls}"><svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name]||iconPaths.globe}</svg></span>`;
  const defaults = {favorites:[],saved:[],recent:[],compare:[],collections:[],verification:{},theme:'system',sort:'featured',density:'comfortable',historyOn:true};
  const loadState = () => { try { return {...defaults,...JSON.parse(localStorage.getItem('webstore-state')||'{}')}; } catch { return {...defaults}; } };
  let state = loadState();
  let filter = {q:'',category:'all',subcategory:'all',tag:'all',pricing:'all',platform:'all',sort:'featured',limit:30};
  let searchIndex = -1;
  let toastTimer;
  const byId = id => WEBSITES.find(w=>w.id===id);
  const saveState = () => { try { localStorage.setItem('webstore-state',JSON.stringify(state)); } catch { toast('Could not save local data. Storage may be full.','error'); } updateCounts(); };
  const cat = id => CATEGORIES.find(c=>c.id===id);
  const pricingText = p => ({free:'Free',freemium:'Freemium',paid:'Paid','usage-based':'Usage-based',commercial:'Commercial'}[p]||'Not stated');
  window.WEBSTORE_FAVICON_ERROR = img => {
    const host = img.dataset.host || '';
    const stage = Number(img.dataset.fallbackStage || 0);
    if (stage === 0) {
      img.dataset.fallbackStage = '1';
      img.src = `https://icons.duckduckgo.com/ip3/${encodeURIComponent(host)}.ico`;
      return;
    }
    if (stage === 1) {
      img.dataset.fallbackStage = '2';
      img.src = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(`https://${host}`)}&sz=128`;
      return;
    }
    const fallback = document.createElement('span');
    fallback.className = 'favicon-fallback favicon-initial';
    fallback.setAttribute('aria-hidden', 'true');
    fallback.textContent = (host.replace(/^www\./, '').split('.')[0]?.[0] || 'W').toUpperCase();
    img.replaceWith(fallback);
  };
  const favicon = w => `<div class="favicon-box"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" data-host="${esc(w.domain)}" data-fallback-stage="0" src="https://${esc(w.domain)}/favicon.ico" alt="" onerror="window.WEBSTORE_FAVICON_ERROR(this)"></div>`;
  const categoryNavHtml = () => `<div class="category-nav">${CATEGORIES.map(c=>`<a class="nav-item" href="#/category/${c.id}" data-nav="category:${c.id}"><span class="category-dot" style="background:${c.color}"></span><span>${esc(c.name)}</span><span class="nav-count">${c.count}</span></a>`).join('')}</div>`;
  const updateCounts = () => { $('#count-favorites').textContent=state.favorites.length;$('#count-saved').textContent=state.saved.length;$('#count-compare').textContent=state.compare.length; };
  const pageFromHash = () => {
    let route=(location.hash.replace(/^#\/?/, '')||'overview').split('/');
    return {name:route[0],param:route[1]||''};
  };
  const navigate = path => { location.hash='#/'+path.replace(/^\//,''); };
  const titleFor = (name,param) => {
    if(name==='category') return cat(param)?.name||'Category';
    if(name==='website') return byId(param)?.name||'Website details';
    return ({overview:'Overview',websites:'All websites',featured:'Featured',trending:'Trending',favorites:'Favorites',saved:'Saved websites',recent:'Recently viewed',collections:'Collections',collection:'Collection',compare:'Compare websites',settings:'Settings',about:'About WEBSTORE',privacy:'Privacy Policy',terms:'Terms of Use',disclaimer:'Disclaimer'}[name]||'Overview');
  };
  function toast(message,type='success') { const el=document.createElement('div');el.className='toast'+(type==='error'?' error':'');el.textContent=message;$('#toast-region').appendChild(el);setTimeout(()=>el.remove(),2800); }
  function emptyState(title,desc,action='',actionLabel='Explore websites') { return `<div class="empty-state"><div class="empty-icon">${icon('compass')}</div><h3>${esc(title)}</h3><p>${esc(desc)}</p>${action?`<button class="btn btn-primary" data-action="${action}">${esc(actionLabel)}</button>`:''}</div>`; }
  function card(w) {
    const fav=state.favorites.includes(w.id), saved=state.saved.includes(w.id), cmp=state.compare.includes(w.id), c=cat(w.category);
    return `<article class="website-card" data-card="${w.id}" data-action="details"><div class="card-top">${favicon(w)}<div class="card-title"><strong>${esc(w.name)}</strong><span>${esc(w.domain)}</span></div><div class="card-actions"><button class="mini-action ${fav?'active':''}" data-action="favorite" data-id="${w.id}" title="${fav?'Remove favorite':'Add to favorites'}" aria-label="Favorite ${esc(w.name)}">${icon('heart')}</button><button class="mini-action ${saved?'saved':''}" data-action="save" data-id="${w.id}" title="${saved?'Unsave website':'Save website'}" aria-label="Save ${esc(w.name)}">${icon('bookmark')}</button></div></div><p class="card-description">${esc(w.description)}</p><div class="tag-row">${w.tags.slice(0,3).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="card-footer"><div class="badge-row"><span class="badge badge-category">${esc(c?.name||'Other')}</span><span class="badge badge-price">${esc(pricingText(w.pricing))}</span></div><div class="card-footer-actions"><button class="card-link" data-action="add-collection" data-id="${w.id}" title="Add to collection">${icon('folder')}</button><button class="card-link" data-action="compare-toggle" data-id="${w.id}" title="${cmp?'Remove from comparison':'Compare'}">${icon('columns')}${cmp?'Added':'Compare'}</button><a class="card-link" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer" data-external="true">View ${icon('external')}</a></div></div></article>`;
  }
  function sectionHead(title,sub='',link='',label='View all') { return `<div class="section-head"><div><h2>${title}</h2>${sub?`<div class="section-sub">${sub}</div>`:''}</div>${link?`<a class="text-link" href="#/${link}">${label} ${icon('arrow')}</a>`:''}</div>`; }
  function cardsGrid(items,cls='website-grid') { return items.length?`<div class="${cls}">${items.map(card).join('')}</div>`:emptyState('Nothing here yet','Add websites to your library or adjust your filters.','go-websites'); }
  function overview() {
    const featured=WEBSITES.filter(w=>w.featured).slice(0,6);
    const trendIds=['chatgpt','figma','notion','perplexity','github','canva','spotify','unsplash'];
    const trending=trendIds.map(byId).filter(Boolean).slice(0,6);
    const recently=WEBSITES.slice(-6).reverse();
    const favCats=[...new Set(state.favorites.map(byId).filter(Boolean).map(w=>w.category))];
    const recommended=(favCats.length?WEBSITES.filter(w=>favCats.includes(w.category)&&!state.favorites.includes(w.id)):['claude','duolingo','photopea','spotify','github','khan-academy'].map(byId).filter(Boolean)).slice(0,6);
    return `<div class="hero"><div class="hero-orbit"></div><div class="hero-content"><div class="eyebrow">A better way to explore the internet</div><h1>Discover your next<br><span>favorite website.</span></h1><p class="lead">Explore useful tools, creative platforms and digital resources from across the Internet — thoughtfully organized in one place.</p><div class="hero-actions"><a class="btn btn-primary" href="#/websites">Explore library ${icon('arrow')}</a><a class="btn" href="#/category/ai">Discover categories</a></div></div></div>
      <div class="stat-row"><div class="stat-card"><div class="stat-icon">${icon('grid')}</div><div class="stat-text"><strong>300</strong><span>Curated websites</span></div></div><div class="stat-card"><div class="stat-icon">${icon('layers')}</div><div class="stat-text"><strong>12</strong><span>Discovery categories</span></div></div><div class="stat-card"><div class="stat-icon">${icon('bookmark')}</div><div class="stat-text"><strong>${state.saved.length}</strong><span>Saved by you</span></div></div><div class="stat-card"><div class="stat-icon">${icon('heart')}</div><div class="stat-text"><strong>${state.favorites.length}</strong><span>Your favorites</span></div></div></div>
      <section class="section-block">${sectionHead('Explore categories','Find the right starting point for whatever you want to do.','websites','Browse all')}<div class="category-grid">${CATEGORIES.map(c=>`<a class="category-tile" href="#/category/${c.id}"><div class="tile-icon" style="background:${c.color}16;color:${c.color}">${icon(c.icon)}</div><strong>${esc(c.name)}</strong><small>${c.count} websites</small></a>`).join('')}</div></section>
      <section class="section-block">${sectionHead('Featured websites','A hand-picked selection worth exploring.','featured')} ${cardsGrid(featured)}</section>
      <section class="section-block">${sectionHead('Trending discoveries','Curated picks from the WEBSTORE library — not live popularity rankings.','trending')} ${cardsGrid(trending)}</section>
      <section class="section-block">${sectionHead('Recently added','The latest entries in this directory.','websites')} ${cardsGrid(recently)}</section>
      <section class="section-block">${sectionHead('Recommended websites','A deterministic selection based on your saved interests.')} ${cardsGrid(recommended)}</section>
      <section class="section-block">${sectionHead('Your personal library','Keep useful places close at hand.')}<div class="category-grid"><a class="category-tile" href="#/favorites"><div class="tile-icon" style="background:#fff0f2;color:#d75b75">${icon('heart')}</div><strong>Favorites</strong><small>${state.favorites.length} websites</small></a><a class="category-tile" href="#/saved"><div class="tile-icon" style="background:#edf2ff;color:#526ed1">${icon('bookmark')}</div><strong>Saved websites</strong><small>${state.saved.length} websites</small></a><a class="category-tile" href="#/collections"><div class="tile-icon" style="background:#f2edff;color:#8a69ce">${icon('folder')}</div><strong>Collections</strong><small>${state.collections.length} collections</small></a><a class="category-tile" href="#/compare"><div class="tile-icon" style="background:#eef7f3;color:#43866c">${icon('columns')}</div><strong>Compare</strong><small>${state.compare.length} selected</small></a></div></section>`;
  }
  function listing(items,title,description,categoryId='all',mode='all') {
    const categoryOptions=CATEGORIES.map(c=>`<option value="${c.id}" ${filter.category===c.id?'selected':''}>${esc(c.name)}</option>`).join('');
    const selectedCategory=categoryId!=='all'?categoryId:filter.category;
    let matched=items.filter(w=>{
      const q=filter.q.trim().toLowerCase();
      const searchFields=[w.name,w.domain,w.description,w.category,w.subcategory,...w.tags].join(' ').toLowerCase();
      return (!q||searchFields.includes(q))&&(selectedCategory==='all'||w.category===selectedCategory)&&(filter.subcategory==='all'||w.subcategory===filter.subcategory)&&(filter.tag==='all'||w.tags.includes(filter.tag))&&(filter.pricing==='all'||w.pricing===filter.pricing)&&(filter.platform==='all'||w.platform===filter.platform);
    });
    const sort=filter.sort;
    matched.sort((a,b)=> sort==='az'?a.name.localeCompare(b.name):sort==='za'?b.name.localeCompare(a.name):sort==='featured'?(Number(b.featured)-Number(a.featured)||a.name.localeCompare(b.name)):sort==='recent'?b.addedOrder-a.addedOrder:a.name.localeCompare(b.name));
    const shown=matched.slice(0,filter.limit);
    let scoped=items.filter(w=>selectedCategory==='all'||w.category===selectedCategory);
    let subcategories=[...new Set(scoped.map(w=>w.subcategory))].sort();
    let tags=[...new Set(scoped.flatMap(w=>w.tags))].sort();
    const active=[];
    if(filter.q)active.push(`Search: ${filter.q}`);if(selectedCategory!=='all')active.push(cat(selectedCategory)?.name||selectedCategory);if(filter.subcategory!=='all')active.push(filter.subcategory);if(filter.tag!=='all')active.push('Tag: '+filter.tag);if(filter.pricing!=='all')active.push(pricingText(filter.pricing));if(filter.platform!=='all')active.push(filter.platform);
    return `<div class="page-heading"><div><div class="eyebrow">Explore the directory</div><h1>${esc(title)}</h1><p class="lead">${esc(description)}</p></div><div class="heading-meta">${matched.length} matching websites</div></div>
      <div class="list-toolbar"><input class="filter-input" id="listing-search" placeholder="Search by name, domain, tags or description..." value="${esc(filter.q)}" aria-label="Filter websites"/><select class="filter-select" id="filter-category" ${categoryId!=='all'?'disabled':''}><option value="all">All categories</option>${categoryOptions}</select><select class="filter-select" id="filter-subcategory"><option value="all">All subcategories</option>${subcategories.map(s=>`<option value="${esc(s)}" ${filter.subcategory===s?'selected':''}>${esc(s)}</option>`).join('')}</select><select class="filter-select" id="filter-tag"><option value="all">All tags</option>${tags.map(t=>`<option value="${esc(t)}" ${filter.tag===t?'selected':''}>${esc(t)}</option>`).join('')}</select><select class="filter-select" id="filter-platform"><option value="all">All platforms</option><option value="web" ${filter.platform==='web'?'selected':''}>Web</option></select><select class="filter-select" id="filter-pricing"><option value="all">Any pricing</option>${['free','freemium','paid','usage-based','commercial'].map(p=>`<option value="${p}" ${filter.pricing===p?'selected':''}>${pricingText(p)}</option>`).join('')}</select><select class="filter-select" id="filter-sort"><option value="featured" ${sort==='featured'?'selected':''}>Featured first</option><option value="az" ${sort==='az'?'selected':''}>A – Z</option><option value="za" ${sort==='za'?'selected':''}>Z – A</option><option value="recent" ${sort==='recent'?'selected':''}>Recently added</option></select><button class="btn btn-sm" data-action="clear-filters">${icon('filter')} Clear</button><span class="results-label">Showing ${shown.length} of ${matched.length}</span></div>
      ${active.length?`<div class="active-filters">${active.map(a=>`<span class="filter-chip">${esc(a)}</span>`).join('')}<button class="text-link" data-action="clear-filters">Clear all</button></div>`:''}
      ${matched.length?`<div class="website-grid">${shown.map(card).join('')}</div>${matched.length>shown.length?`<div class="load-more-wrap"><button class="btn" data-action="load-more">Load more websites</button><div class="pagination-note">Showing ${shown.length} of ${matched.length} results</div></div>`:''}`:emptyState('No websites found','Try a different search or remove one of your filters.','clear-filters','Clear filters')}`;
  }
  function pageCategory(id) {
    const c=cat(id);if(!c)return `<div class="empty-state"><h3>Category not found</h3><p>This category may have been removed.</p><a class="btn" href="#/websites">Browse all websites</a></div>`;
    filter.category=id;filter.subcategory='all';
    return listing(WEBSITES,c.name,c.description,id,'category');
  }
  function detail(id) {
    const w=byId(id);if(!w)return `<div class="empty-state"><h3>Website not found</h3><p>This entry is not in the current directory.</p><a class="btn" href="#/websites">Back to websites</a></div>`;
    if(state.historyOn){state.recent=[{id:w.id,at:Date.now()},...state.recent.filter(x=>x.id!==w.id)].slice(0,40);saveState();}
    const c=cat(w.category),fav=state.favorites.includes(w.id),saved=state.saved.includes(w.id),cmp=state.compare.includes(w.id);
    const related=WEBSITES.filter(x=>x.id!==w.id&&x.category===w.category).map(x=>({x,score:(x.subcategory===w.subcategory?4:0)+x.tags.filter(t=>w.tags.includes(t)).length})).sort((a,b)=>b.score-a.score||a.x.name.localeCompare(b.x.name)).slice(0,3).map(v=>v.x);
    const verification=state.verification?.[w.id]; const status=verification?.status||w.status||'unchecked';
    return `<div class="page-heading"><div><div class="eyebrow">Website profile</div><h1>Discover ${esc(w.name)}</h1><p class="lead">A closer look at this entry in the WEBSTORE directory.</p></div><a class="text-link" href="#/websites">← Back to library</a></div>
      <section class="detail-hero"><div class="detail-head">${favicon(w)}<div class="detail-title"><h1>${esc(w.name)}</h1><p>${esc(w.domain)}</p></div><div class="detail-actions"><a class="btn btn-primary" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer">Visit website ${icon('external')}</a><button class="btn ${fav?'btn-blue':''}" data-action="favorite" data-id="${w.id}">${icon('heart')} ${fav?'Favorited':'Favorite'}</button><button class="btn ${saved?'btn-blue':''}" data-action="save" data-id="${w.id}">${icon('bookmark')} ${saved?'Saved':'Save'}</button><button class="btn" data-action="add-collection" data-id="${w.id}">${icon('folder')} Add to collection</button></div></div><p class="detail-description">${esc(w.description)}</p><div class="tag-row">${w.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="detail-meta"><div class="meta-cell"><span>Category</span><strong>${esc(c?.name||'—')}</strong></div><div class="meta-cell"><span>Subcategory</span><strong>${esc(w.subcategory)}</strong></div><div class="meta-cell"><span>Pricing model</span><strong>${esc(pricingText(w.pricing))}</strong></div><div class="meta-cell"><span>Verification</span><strong class="status ${status}">${status==='verified'?'Verified':status==='broken'?'Broken':'Unchecked'}</strong></div><div class="meta-cell"><span>Platform</span><strong>${esc(w.platform)}</strong></div><div class="meta-cell"><span>Last checked</span><strong>${verification?.verifiedAt?new Date(verification.verifiedAt).toLocaleString():'Not checked'}</strong></div><div class="meta-cell"><span>Official URL</span><strong><a class="text-link" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer">Open ${icon('external')}</a></strong></div><div class="meta-cell"><span>Comparison</span><strong><button class="text-link" data-action="compare-toggle" data-id="${w.id}">${cmp?'Remove from comparison':'Add to comparison'}</button></strong></div><div class="meta-cell"><span>Verification check</span><strong><button class="text-link" data-action="verify" data-id="${w.id}">${icon('refresh')} Check manually</button></strong></div></div></section>
      <section class="section-block">${sectionHead('Related websites','Selected by category, subcategory and shared tags.')} ${cardsGrid(related)}</section>`;
  }
  function collectionsPage() {
    const cards=state.collections.map(c=>`<div class="collection-card"><div class="collection-icon">${icon('folder')}</div><h3>${esc(c.name)}</h3><p>${c.items.length} saved ${c.items.length===1?'website':'websites'}</p><div class="row-actions"><button class="btn btn-sm btn-primary" data-action="open-collection" data-id="${c.id}">Open collection</button><button class="btn btn-sm" data-action="rename-collection" data-id="${c.id}">Rename</button><button class="btn btn-sm btn-quiet" data-action="delete-collection" data-id="${c.id}">${icon('trash')}</button></div></div>`).join('');
    return `<div class="page-heading"><div><div class="eyebrow">Your private library</div><h1>Collections</h1><p class="lead">Group useful websites into personal lists and keep everything organized.</p></div><button class="btn btn-primary" data-action="new-collection">${icon('plus')} New collection</button></div>${state.collections.length?`<div class="collection-grid">${cards}</div>`:emptyState('No collections yet','Create a collection to organize websites for a project, class or interest.','new-collection','Create your first collection')}`;
  }
  function collectionDetail(id) {
    const c=state.collections.find(x=>x.id===id);if(!c)return emptyState('Collection not found','This collection may have been removed.','go-collections','Back to collections');
    const items=c.items.map(byId).filter(Boolean);
    return `<div class="page-heading"><div><div class="eyebrow">Personal collection</div><h1>${esc(c.name)}</h1><p class="lead">${items.length} websites saved in this collection.</p></div><div><button class="btn" data-action="rename-collection" data-id="${c.id}">Rename</button> <a class="btn" href="#/collections">All collections</a></div></div>${items.length?`<div class="website-grid">${items.map(w=>card(w).replace('</div></article>',`<button class="card-link" data-action="remove-from-collection" data-collection="${c.id}" data-id="${w.id}">${icon('trash')} Remove</button></div></article>`)).join('')}</div>`:emptyState('This collection is empty','Add websites from their detail pages or website cards.','go-websites','Explore websites')}`;
  }
  function comparePage() {
    const items=state.compare.map(byId).filter(Boolean);
    if(!items.length)return emptyState('Nothing to compare','Select two or three websites from the directory to compare their details.','go-websites','Explore websites');
    const row=(label,fn)=>`<tr><td>${label}</td>${items.map(w=>`<td>${fn(w)}</td>`).join('')}${items.length<2?'': ''}</tr>`;
    return `<div class="page-heading"><div><div class="eyebrow">Make a clear choice</div><h1>Compare websites</h1><p class="lead">Review the details side by side. WEBSTORE does not invent ratings or performance scores.</p></div><button class="btn" data-action="clear-compare">Clear comparison</button></div>${items.length<2?`<div class="empty-state" style="margin-bottom:15px;padding:20px"><p>Add at least one more website to compare two entries.</p><a class="text-link" href="#/websites">Browse the directory ${icon('arrow')}</a></div>`:''}<div class="compare-wrap"><table class="compare-table"><thead><tr><th>Website</th>${items.map(w=>`<th><div class="compare-website">${favicon(w)}<strong>${esc(w.name)}</strong><button class="mini-action" data-action="compare-toggle" data-id="${w.id}">${icon('x')}</button></div></th>`).join('')}</tr></thead><tbody>${row('Domain',w=>esc(w.domain))}${row('Description',w=>esc(w.description))}${row('Category',w=>esc(cat(w.category)?.name||''))}${row('Subcategory',w=>esc(w.subcategory))}${row('Pricing',w=>esc(pricingText(w.pricing)))}${row('Platform',w=>esc(w.platform))}${row('Tags',w=>w.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join(' '))}${row('Verification',w=>{const v=state.verification?.[w.id];const s=v?.status||w.status||'unchecked';return `<span class="status ${s}">${esc(s)}</span>`;})}${row('Official website',w=>`<a class="text-link" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer">Visit ${icon('external')}</a>`)}</tbody></table></div>`;
  }
  function settingsPage() {
    return `<div class="page-heading"><div><div class="eyebrow">Make it yours</div><h1>Settings</h1><p class="lead">Manage your appearance, browsing preferences and personal data.</p></div></div><div class="settings-grid"><section class="settings-card"><h3>Appearance</h3><p>Choose how WEBSTORE looks on this device.</p><div class="setting-row"><div><strong>Theme</strong><small>Choose light, dark or follow your system.</small></div><select id="setting-theme" class="filter-select"><option value="system" ${state.theme==='system'?'selected':''}>System</option><option value="light" ${state.theme==='light'?'selected':''}>Light</option><option value="dark" ${state.theme==='dark'?'selected':''}>Dark</option></select></div><div class="setting-row"><div><strong>View density</strong><small>Adjust the directory browsing layout.</small></div><select id="setting-density" class="filter-select"><option value="comfortable" ${state.density==='comfortable'?'selected':''}>Comfortable</option><option value="compact" ${state.density==='compact'?'selected':''}>Compact</option></select></div></section><section class="settings-card"><h3>Browsing preferences</h3><p>Control how the directory behaves on this device.</p><div class="setting-row"><div><strong>Default sorting</strong><small>Initial sort order for website lists.</small></div><select id="setting-sort" class="filter-select"><option value="featured" ${state.sort==='featured'?'selected':''}>Featured first</option><option value="az" ${state.sort==='az'?'selected':''}>A – Z</option><option value="za" ${state.sort==='za'?'selected':''}>Z – A</option><option value="recent" ${state.sort==='recent'?'selected':''}>Recently added</option></select></div><div class="setting-row"><div><strong>Recently viewed history</strong><small>Save a local list of pages you open.</small></div><input type="checkbox" class="switch" id="setting-history" ${state.historyOn?'checked':''}/></div></section><section class="settings-card"><h3>Backup & restore</h3><p>Export your personal WEBSTORE library or import a previous backup. The curated website catalog is kept separate.</p><div class="row-actions"><button class="btn btn-sm btn-primary" data-action="export">${icon('download')} Export personal data</button><button class="btn btn-sm" data-action="import">${icon('upload')} Import backup</button><input id="import-file" type="file" accept="application/json,.json" class="hidden"/></div></section><section class="settings-card"><h3>Manage local data</h3><p>These actions only affect personal information stored in this browser.</p><div class="row-actions"><button class="btn btn-sm" data-action="clear-history">Clear history</button><button class="btn btn-sm" data-action="reset-data">Reset personal data</button></div></section><section class="settings-card"><h3>About WEBSTORE</h3><p>A curated website discovery library designed to make useful parts of the Internet easier to find.</p><div class="setting-row"><div><strong>Version</strong><small>Current local release</small></div><strong>1.0.0</strong></div><div class="setting-row"><div><strong>Directory size</strong><small>Curated records across 12 categories</small></div><strong>300 websites</strong></div></section><section class="settings-card"><h3>Privacy by design</h3><p>Favorites, saved items, collections, preferences and history stay in this browser. There is no account, backend synchronization or remote personal-data profile.</p><a class="text-link" href="#/privacy">Read the privacy policy ${icon('arrow')}</a></section></div>`;
  }
  function infoPage(name) {
    const pages={
      about:`<div class="eyebrow">About the platform</div><h1>Explore. Discover. Connect.</h1><p>WEBSTORE is an independent directory built to make discovering useful websites feel simple. It brings tools, creative platforms, learning resources and digital services into one organized library.</p><h2>A curated starting point</h2><p>Browse twelve categories, search by name or topic, compare services and build personal collections. Featured and trending areas are editorial selections from this directory — they are not live Internet popularity rankings.</p><h2>Local-first by default</h2><p>Your favorites, bookmarks, collections, comparison list, preferences and browsing history are stored in your current browser. No account or backend is required for the core experience.</p>`,
      privacy:`<div class="eyebrow">Your data</div><h1>Privacy Policy</h1><p>WEBSTORE is designed as a local-first directory. It does not require an account to use its core discovery features.</p><h2>Data stored on your device</h2><p>Favorites, saved websites, collections, comparison selections, recently viewed entries and preferences are stored in browser local storage. This data is not synchronized to a WEBSTORE server.</p><h2>External websites</h2><p>Opening a listed website takes you to a third-party service. Those websites may collect information under their own privacy policies and terms. Remote favicons may also be requested from a public favicon service when a card is displayed.</p><h2>Backups and deletion</h2><p>You can export personal data as a JSON file, import a prior backup, clear browsing history or reset personal data from Settings. Clearing browser storage also removes locally stored WEBSTORE preferences and library data.</p>`,
      terms:`<div class="eyebrow">Using the directory</div><h1>Terms of Use</h1><p>WEBSTORE is provided as a discovery directory to help users find third-party websites. Use the directory responsibly and review the terms of any external service before using it.</p><h2>Third-party services</h2><p>Each listed website is operated by its respective owner. WEBSTORE does not control external content, account requirements, pricing, availability or policies.</p><h2>Accuracy and availability</h2><p>Descriptions and classifications are provided as a helpful guide and may become outdated. Always confirm important details on the official website.</p><h2>Responsible use</h2><p>Do not use the directory to violate applicable laws, third-party rights or service terms. The directory is provided without guarantees that a third-party service will remain available or unchanged.</p>`,
      disclaimer:`<div class="eyebrow">Important information</div><h1>Disclaimer</h1><p>WEBSTORE is an independent website directory. It is not owned, operated, sponsored or endorsed by the third-party websites listed in its catalog.</p><h2>Trademarks and logos</h2><p>All third-party names, logos and trademarks belong to their respective owners. Favicons are loaded from external sources and are displayed only to help identify listed websites.</p><h2>Information may change</h2><p>Website availability, features, pricing, terms and privacy practices can change at any time. Listing a website does not imply endorsement, certification or a guarantee of quality.</p><h2>Verification status</h2><p>New catalog entries are marked Unchecked. A browser-based check may be inconclusive because of cross-origin restrictions. Only a direct successful response or a clear missing-page response can update a status; inconclusive checks remain Unchecked.</p>`
    };
    return `<div class="info-page">${pages[name]||pages.about}</div>`;
  }
  function render() {
    const {name,param}=pageFromHash();
    $('#category-nav').innerHTML=categoryNavHtml();
    const pageTitles=titleFor(name,param);$('#breadcrumb-current').textContent=pageTitles;
    const navKey=name==='category'?`category:${param}`:name;
    $$('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===navKey));
    document.title=`${pageTitles} — WEBSTORE`;
    let html='';
    switch(name){
      case 'overview': html=overview();break;
      case 'websites': filter.category='all';html=listing(WEBSITES,'All websites','Explore the complete directory. Search, filter and find your next useful tool.');break;
      case 'category': html=pageCategory(param);break;
      case 'featured':filter.category='all';html=listing(WEBSITES.filter(w=>w.featured),'Featured websites','A hand-picked selection from across the WEBSTORE library.');break;
      case 'trending':filter.category='all';html=listing(['chatgpt','figma','notion','perplexity','github','canva','spotify','unsplash','midjourney','notion'].map(byId).filter(Boolean),'Trending discoveries','Curated picks from the WEBSTORE library — not live popularity rankings.');break;
      case 'favorites':filter.category='all';html=listing(state.favorites.map(byId).filter(Boolean),'Favorites','The websites you have marked as favorites.');break;
      case 'saved':filter.category='all';html=listing(state.saved.map(byId).filter(Boolean),'Saved websites','A personal reading list of useful websites.');break;
      case 'recent':filter.category='all';html=listing(state.recent.map(x=>byId(x.id)).filter(Boolean),'Recently viewed','The latest website profiles you opened on this device.');break;
      case 'collections':html=collectionsPage();break;
      case 'collection':html=collectionDetail(param);break;
      case 'compare':html=comparePage();break;
      case 'website':html=detail(param);break;
      case 'settings':html=settingsPage();break;
      case 'about':case 'privacy':case 'terms':case 'disclaimer':html=infoPage(name);break;
      default:html=overview();
    }
    $('#page-content').innerHTML=html;
    updateCounts();
    applyTheme();
    bindPageInputs();
    $('#content-scroll').scrollTop=0;
  }
  function applyTheme() {
    const prefersDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark=state.theme==='dark'||(state.theme==='system'&&prefersDark);
    document.documentElement.classList.toggle('dark',dark);
    document.documentElement.style.colorScheme=dark?'dark':'light';
    const t=$('.theme-toggle .ico');if(t)t.innerHTML=`<svg viewBox="0 0 24 24">${iconPaths[dark?'sun':'moon']}</svg>`;
  }
  function bindPageInputs() {
    const q=$('#listing-search');if(q)q.addEventListener('input',e=>{filter.q=e.target.value;filter.limit=30;replaceListing();});
    const c=$('#filter-category');if(c)c.addEventListener('change',e=>{filter.category=e.target.value;filter.subcategory='all';replaceListing();});
    const s=$('#filter-subcategory');if(s)s.addEventListener('change',e=>{filter.subcategory=e.target.value;replaceListing();});
    const tag=$('#filter-tag');if(tag)tag.addEventListener('change',e=>{filter.tag=e.target.value;replaceListing();});
    const platform=$('#filter-platform');if(platform)platform.addEventListener('change',e=>{filter.platform=e.target.value;replaceListing();});
    const p=$('#filter-pricing');if(p)p.addEventListener('change',e=>{filter.pricing=e.target.value;replaceListing();});
    const so=$('#filter-sort');if(so)so.addEventListener('change',e=>{filter.sort=e.target.value;replaceListing();});
    const theme=$('#setting-theme');if(theme)theme.addEventListener('change',e=>{state.theme=e.target.value;saveState();applyTheme();toast('Theme preference saved.');});
    const density=$('#setting-density');if(density)density.addEventListener('change',e=>{state.density=e.target.value;saveState();document.body.dataset.density=state.density;toast('View preference saved.');});
    const sort=$('#setting-sort');if(sort)sort.addEventListener('change',e=>{state.sort=e.target.value;filter.sort=e.target.value;saveState();toast('Default sorting saved.');});
    const hist=$('#setting-history');if(hist)hist.addEventListener('change',e=>{state.historyOn=e.target.checked;saveState();toast('History preference updated.');});
    const imp=$('#import-file');if(imp)imp.addEventListener('change',handleImportFile);
  }
  function replaceListing() { const {name,param}=pageFromHash(); const scroll=$('#content-scroll').scrollTop;render();const q=$('#listing-search');if(q){q.focus();q.setSelectionRange(q.value.length,q.value.length);}$('#content-scroll').scrollTop=scroll; }
  function toggleItem(field,id) { const has=state[field].includes(id);state[field]=has?state[field].filter(x=>x!==id):[...state[field],id];saveState();toast(has?'Removed from '+(field==='favorites'?'favorites':'saved websites'):'Added to '+(field==='favorites'?'favorites':'saved websites'));render(); }
  function toggleCompare(id) { const has=state.compare.includes(id);if(has){state.compare=state.compare.filter(x=>x!==id);toast('Removed from comparison.');}else if(state.compare.length>=3){toast('You can compare up to 3 websites.','error');return;}else{state.compare.push(id);toast('Added to comparison.');}saveState();render(); }
  function showModal(title,body,confirmText,callback) {
    $('#modal-root').innerHTML=`<div class="modal-backdrop" data-action="modal-backdrop"><div class="modal"><h2>${esc(title)}</h2>${body}<div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn btn-primary" id="modal-confirm">${esc(confirmText||'Confirm')}</button></div></div></div>`;
    $('#modal-confirm').addEventListener('click',()=>{const result=callback?.();if(result!==false)$('#modal-root').innerHTML='';});
    const input=$('#modal-root input');if(input)input.focus();
  }
  function createCollection() {
    showModal('Create a collection','<p>Give this collection a clear name so you can find it later.</p><input id="collection-name" maxlength="48" placeholder="e.g. Design inspiration" />','Create collection',()=>{const name=$('#collection-name').value.trim();if(!name){toast('Enter a collection name.','error');return false;}state.collections.push({id:'c-'+Date.now().toString(36),name,items:[]});saveState();render();toast('Collection created.');});
  }
  function renameCollection(id) { const c=state.collections.find(x=>x.id===id);if(!c)return;showModal('Rename collection',`<p>Choose a new name for <strong>${esc(c.name)}</strong>.</p><input id="collection-name" maxlength="48" value="${esc(c.name)}" />`,'Save changes',()=>{const v=$('#collection-name').value.trim();if(!v){toast('Enter a collection name.','error');return false;}c.name=v;saveState();render();toast('Collection renamed.');}); }
  function deleteCollection(id) { const c=state.collections.find(x=>x.id===id);if(!c)return;showModal('Delete collection?',`<p><strong>${esc(c.name)}</strong> and its list will be removed. Your main website catalog and favorites will not be affected.</p>`,'Delete',()=>{state.collections=state.collections.filter(x=>x.id!==id);saveState();render();toast('Collection deleted.');}); }
  function addToCollection(id) {
    if(!state.collections.length){showModal('Create your first collection','<p>There are no collections yet. Create one to save this website into a personal list.</p><input id="collection-name" maxlength="48" placeholder="Collection name"/>','Create and add',()=>{const n=$('#collection-name').value.trim();if(!n){toast('Enter a collection name.','error');return false;}state.collections.push({id:'c-'+Date.now().toString(36),name:n,items:[id]});saveState();render();toast('Collection created and website added.');});return;}
    const opts=state.collections.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('');showModal('Add to collection',`<p>Select where to save <strong>${esc(byId(id)?.name||'this website')}</strong>.</p><select id="collection-choice" class="filter-select" style="width:100%;margin-top:8px">${opts}</select>`,'Add website',()=>{const c=state.collections.find(x=>x.id===$('#collection-choice').value);if(!c)return false;if(!c.items.includes(id))c.items.push(id);saveState();render();toast('Added to collection.');});
  }
  function exportData() {
    const payload={format:'webstore-backup',schemaVersion:1,exportedAt:new Date().toISOString(),data:{favorites:state.favorites,saved:state.saved,recent:state.recent,compare:state.compare,collections:state.collections,verification:state.verification,preferences:{theme:state.theme,sort:state.sort,density:state.density,historyOn:state.historyOn}}};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`webstore-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href);toast('Personal data exported.');
  }
  function importData() { $('#import-file')?.click(); }
  function handleImportFile(e) {
    const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(data.format!=='webstore-backup'||data.schemaVersion!==1||!data.data||typeof data.data!=='object')throw new Error('This is not a supported WEBSTORE backup.');const d=data.data;const arrays=['favorites','saved','compare','recent','collections'];for(const k of arrays)if(d[k]!==undefined&&!Array.isArray(d[k]))throw new Error(`Invalid ${k} data.`);for(const id of [...(d.favorites||[]),...(d.saved||[]),...(d.compare||[])])if(typeof id!=='string'||!byId(id))throw new Error('Backup contains an unknown website ID.');if((d.compare||[]).length>3)throw new Error('A comparison backup cannot contain more than 3 websites.');if((d.collections||[]).some(c=>!c||typeof c.id!=='string'||typeof c.name!=='string'||!Array.isArray(c.items)||c.items.some(id=>!byId(id))))throw new Error('Invalid collection data.');showModal('Import backup?',`<p>Backup from <strong>${esc(data.exportedAt||'an earlier date')}</strong>. Importing will replace the current personal library and preferences on this device.</p><p>Curated website records will not be changed.</p>`,'Import and replace',()=>{state.favorites=d.favorites||[];state.saved=d.saved||[];state.compare=d.compare||[];state.recent=d.recent||[];state.collections=d.collections||[];state.verification=d.verification&&typeof d.verification==='object'?d.verification:{};if(d.preferences)Object.assign(state,{theme:d.preferences.theme||state.theme,sort:d.preferences.sort||state.sort,density:d.preferences.density||state.density,historyOn:d.preferences.historyOn!==false});saveState();render();toast('Backup imported successfully.');});}catch(err){toast(err.message||'Could not read this backup.','error');}e.target.value='';};reader.onerror=()=>toast('Could not read the selected file.','error');reader.readAsText(file);
  }
  async function verifyWebsite(id) {
    const w=byId(id);if(!w)return;toast('Checking official website…');
    try { const res=await fetch(w.url,{method:'HEAD',mode:'cors',cache:'no-store',redirect:'follow'});if(res.ok){state.verification[id]={status:'verified',verifiedAt:new Date().toISOString()};saveState();}else if(res.status===404||res.status===410){state.verification[id]={status:'broken',verifiedAt:new Date().toISOString()};saveState();}else{toast(`The server responded with ${res.status}; status remains Unchecked.`,'error');return;}toast(`Verification status updated: ${state.verification[id].status}.`);render(); }
    catch { toast('The check was inconclusive (often caused by browser cross-origin rules). Status remains Unchecked.','error'); }
  }
  function runAction(action,el,evt) {
    const id=el.dataset.id;
    switch(action){
      case 'details': if(id)navigate('website/'+id);else if(el.closest('[data-card]'))navigate('website/'+el.closest('[data-card]').dataset.card);break;
      case 'favorite': if(id)toggleItem('favorites',id);break;
      case 'save': if(id)toggleItem('saved',id);break;
      case 'compare-toggle': if(id)toggleCompare(id);break;
      case 'add-collection': if(id)addToCollection(id);break;
      case 'new-collection':createCollection();break;
      case 'rename-collection':renameCollection(id);break;
      case 'delete-collection':deleteCollection(id);break;
      case 'open-collection':navigate('collection/'+id);break;
      case 'remove-from-collection': {const c=state.collections.find(x=>x.id===el.dataset.collection);if(c){c.items=c.items.filter(x=>x!==id);saveState();render();toast('Removed from collection.');}break;}
      case 'clear-compare':state.compare=[];saveState();render();toast('Comparison cleared.');break;
      case 'export':exportData();break;
      case 'import':importData();break;
      case 'clear-history':state.recent=[];saveState();render();toast('Browsing history cleared.');break;
      case 'reset-data':showModal('Reset personal data?', '<p>This removes favorites, saved websites, collections, comparison selections, history and local preferences from this browser. Your 300 curated website records remain unchanged.</p>','Reset data',()=>{state={...defaults};saveState();render();toast('Personal data has been reset.');});break;
      case 'verify':if(id)verifyWebsite(id);break;
      case 'toggle-theme':state.theme=document.documentElement.classList.contains('dark')?'light':'dark';saveState();applyTheme();break;
      case 'open-settings':navigate('settings');break;
      case 'load-more':filter.limit+=30;replaceListing();break;
      case 'clear-filters':filter={q:'',category:pageFromHash().name==='category'?pageFromHash().param:'all',subcategory:'all',tag:'all',pricing:'all',platform:'all',sort:state.sort,limit:30};replaceListing();break;
      case 'go-websites':filter={q:'',category:'all',subcategory:'all',pricing:'all',platform:'all',sort:state.sort,limit:30};navigate('websites');break;
      case 'go-collections':navigate('collections');break;
      case 'open-sidebar':$('#sidebar').classList.add('open');break;
      case 'close-sidebar':$('#sidebar').classList.remove('open');break;
      case 'close-modal':$('#modal-root').innerHTML='';break;
      case 'modal-backdrop':if(el===evt?.target)$('#modal-root').innerHTML='';break;
    }
  }
  document.addEventListener('click',e=>{
    const anchor=e.target.closest('a');
    if(anchor && anchor.getAttribute('href')?.startsWith('#/')) { if(window.innerWidth<=900 && anchor.closest('.sidebar')) $('#sidebar').classList.remove('open'); return; }
    if(anchor && (anchor.target==='_blank' || anchor.dataset.external==='true')) return;
    const actionable=e.target.closest('[data-action]');
    if(actionable){e.preventDefault();e.stopPropagation();runAction(actionable.dataset.action,actionable,e);return;}
    const cardEl=e.target.closest('.website-card');if(cardEl&&!e.target.closest('a,button')){navigate('website/'+cardEl.dataset.card);return;}
    if(!e.target.closest('.global-search-wrap'))$('#search-results').classList.add('hidden');
    if(e.target.closest('.nav-item')&&window.innerWidth<=900)$('#sidebar').classList.remove('open');
  });
  let lastRoute='';
  window.addEventListener('hashchange',()=>{const {name,param}=pageFromHash();const route=name+':'+param;if(route!==lastRoute){filter.q='';filter.subcategory='all';filter.tag='all';filter.pricing='all';filter.platform='all';filter.limit=30;filter.category=name==='category'?param:'all';filter.sort=state.sort;lastRoute=route;}render();$('#sidebar').classList.remove('open');});
  function searchMatches(q) { const term=q.trim().toLowerCase();if(!term)return[];return WEBSITES.filter(w=>[w.name,w.domain,w.description,w.category,w.subcategory,...w.tags].join(' ').toLowerCase().includes(term)).slice(0,8); }
  function showSearchResults(q) { const box=$('#search-results');if(!q.trim()){box.classList.add('hidden');return;}const found=searchMatches(q);box.innerHTML=found.length?found.map((w,i)=>`<div class="search-result" data-search-id="${w.id}" data-index="${i}" role="option">${favicon(w)}<div><strong>${esc(w.name)}</strong><small>${esc(w.domain)} · ${esc(cat(w.category)?.name||'')}</small></div></div>`).join('')+'<div class="search-hint">Use ↑ ↓ to navigate · Enter to open · Esc to close</div>':`<div class="search-hint">No results for “${esc(q)}”</div>`;box.classList.remove('hidden');searchIndex=-1;}
  const globalSearch=$('#global-search');globalSearch.addEventListener('input',e=>showSearchResults(e.target.value));
  globalSearch.addEventListener('keydown',e=>{const results=$$('.search-result',$('#search-results'));if(e.key==='ArrowDown'){e.preventDefault();searchIndex=Math.min(searchIndex+1,results.length-1);results.forEach((r,i)=>r.style.background=i===searchIndex?'var(--hover)':'');}else if(e.key==='ArrowUp'){e.preventDefault();searchIndex=Math.max(searchIndex-1,0);results.forEach((r,i)=>r.style.background=i===searchIndex?'var(--hover)':'');}else if(e.key==='Enter'){e.preventDefault();const target=results[searchIndex]||results[0];if(target){navigate('website/'+target.dataset.searchId);$('#search-results').classList.add('hidden');globalSearch.value='';}}else if(e.key==='Escape'){$('#search-results').classList.add('hidden');globalSearch.blur();}});
  $('#search-results').addEventListener('click',e=>{const r=e.target.closest('[data-search-id]');if(r){navigate('website/'+r.dataset.searchId);$('#search-results').classList.add('hidden');globalSearch.value='';}});
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();globalSearch.focus();globalSearch.select();}if(e.key==='Escape'){$('#search-results').classList.add('hidden');if($('#modal-root').innerHTML)$('#modal-root').innerHTML='';}});
  if(!location.hash)location.hash='#/overview';else render();
  if(location.hash)render();
})();
