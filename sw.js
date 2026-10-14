const VERSION = "money-pilot-pwa-v3";
const BASE = new URL("./", self.registration.scope);
const SHELL = ["index.html", "manifest.json", "icon-192.png", "icon-512.png", "money-pilot-logo.png"].map(p => new URL(p, BASE).href);
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    for (const url of SHELL) { try { const r = await fetch(url, {cache: "reload"}); if (r.ok) await cache.put(url, r); } catch (_) {} }
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", event => { event.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const u = new URL(event.request.url);
  if (u.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(event.request);
    if (cached) return cached;
    try { const response = await fetch(event.request); if (response.ok && event.request.url.startsWith(BASE.href)) await cache.put(event.request, response.clone()); return response; }
    catch (_) { return (await cache.match(new URL("index.html", BASE).href)) || new Response("Money Pilot is offline. Reconnect and reload.", {status: 503, headers: {"Content-Type":"text/plain; charset=utf-8"}}); }
  })());
});
