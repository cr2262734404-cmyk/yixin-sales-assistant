'use strict';
// Reuse the reviewed tools without accessing or unlocking the encrypted library.
(()=>{
 const main=document.getElementById('main');
 async function cacheStatus(){const el=document.getElementById('cacheStatus');if(!el)return;if(!('serviceWorker'in navigator)||!('caches'in window)){el.textContent='此浏览器暂不能离线保存，请保持联网。';return}try{const target=new URL('field.html',location.href).href;let ready=false;for(const name of await caches.keys()){const c=await caches.open(name);if(await c.match(target)){ready=true;break}}el.textContent=ready?'离线工具已准备 · 请断网重开一次验证':'离线工具准备中，请保持联网；稍后返回首页检查。'}catch{el.textContent='无法确认离线缓存，请保持联网；出门前断网检查一次。'}}
 function render(){const p=(location.hash.slice(1)||'home').split('/'),route=p[0];
  main.innerHTML=route==='home'?FieldKit.home()+'<div class="actions"><a class="secondary" href="index.html#library">原有资料与工具（口令进入）</a><button class="small-button" data-update>检查资料更新</button></div><p id="cacheStatus" class="status" role="status">首次请保持联网，离线缓存可能被系统清理；出门前断网检查一次。</p><p class="small muted">此入口仅提供新实战工具，不解锁原资料库正文。本机记录和草稿未加密，共用设备请勿留敏感信息。</p>':route==='records'?VisitRecords.render(p):route==='calc'?UI.calcHTML():FieldKit.routes.includes(route)?FieldKit.render(p):UI.header('此项在原资料库中')+'<a class="primary" href="index.html#'+encodeURIComponent(route)+'">用原口令进入</a>';
  if(route==='records')VisitRecords.bind();if(route==='calc')UI.bindCalc();
  main.querySelectorAll('a[href^="#"]').forEach(a=>{const r=a.hash.slice(1).split('/')[0];if(!['home','records','calc',...FieldKit.routes].includes(r))a.href='index.html'+a.hash});
  document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===route));
  scrollTo(0,0);main.focus({preventScroll:true});document.title=(main.querySelector('h1')?.textContent||'实战工具')+'｜衣杺';if(route==='home')cacheStatus();
 }
 document.addEventListener('click',e=>{if(e.target.closest('[data-update]'))UI.update()});
 window.addEventListener('hashchange',render);window.addEventListener('offline-ready',cacheStatus);render();
})();
