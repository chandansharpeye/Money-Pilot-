const CACHE = 'money-pilot-pwa-v3.5-apk';
const SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './money-pilot-logo.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
      if (response && response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match('./index.html'))));
  } else if (/cdnjs\.cloudflare\.com/.test(url.hostname)) {
    event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
      caches.open(CACHE).then(cache => cache.put(event.request, response.clone())).catch(() => {});
      return response;
    })));
  }
});

/* ===== V3.5 reminders: fire due notifications from IndexedDB queue ===== */
function mpIdb(){return new Promise((res,rej)=>{const r=indexedDB.open('mp-notify',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
function mpKvGet(k){return mpIdb().then(db=>new Promise(res=>{const q=db.transaction('kv').objectStore('kv').get(k);q.onsuccess=()=>res(q.result);q.onerror=()=>res(null)})).catch(()=>null)}
function mpKvSet(k,v){return mpIdb().then(db=>new Promise(res=>{const t=db.transaction('kv','readwrite');t.objectStore('kv').put(v,k);t.oncomplete=()=>res(true);t.onerror=()=>res(false)})).catch(()=>false)}
async function mpCheckDue(){
  const q=await mpKvGet('queue');if(!q||!q.on)return;
  const fired=(await mpKvGet('fired'))||{},now=Date.now();let changed=false;
  for(const it of (q.items||[])){
    if(it.at<=now&&now-it.at<=864e5&&!fired[it.key]){
      fired[it.key]=now;changed=true;
      await self.registration.showNotification(it.title,{body:it.body,icon:'icon-192.png',badge:'icon-192.png',tag:it.key,vibrate:[200,100,200,100,200],data:{url:'./index.html'}});
    }
  }
  if(changed)await mpKvSet('fired',fired);
}
self.addEventListener('periodicsync',e=>{if(e.tag==='mp-reminder-check')e.waitUntil(mpCheckDue())});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='mp-check')e.waitUntil(mpCheckDue())});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const c of list){if('focus' in c)return c.focus()}
    return self.clients.openWindow('./index.html');
  }));
});
