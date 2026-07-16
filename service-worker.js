const CACHE_NAME = "elc-webapp-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/data.js",
  "./js/app.js",
  "./assets/elc-crest.png",
  "./assets/favicon.svg",
  "./assets/hero-campus.svg",
  "./assets/about-learning.svg",
  "./assets/gallery-campus.svg",
  "./assets/gallery-classroom.svg",
  "./assets/gallery-science.svg",
  "./assets/gallery-library.svg",
  "./assets/gallery-sports.svg",
  "./assets/gallery-leadership.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});

