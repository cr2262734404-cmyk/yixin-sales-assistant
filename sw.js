'use strict';
const CACHE='yixin-sales-e3880960ca53',FILES=["app.js","boss-data.js","boss.html","boss.js","common.js","icon-192.png","icon-512.png","icon.svg","index.html","manifest.webmanifest","styles.css","vault.json","release.json"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES.map(x=>new URL(x,self.registration.scope).href))))});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('yixin-sales-')&&k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE')self.skipWaiting()});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const u=new URL(event.request.url),scope=new URL(self.registration.scope);if(u.origin!==scope.origin||!u.pathname.startsWith(scope.pathname))return;event.respondWith((async()=>{const c=await caches.open(CACHE);let request=event.request;if(u.pathname===scope.pathname)request=new Request(new URL('index.html',scope).href);let hit=await c.match(request,{ignoreSearch:true});if(hit)return hit;return fetch(event.request)})())});
