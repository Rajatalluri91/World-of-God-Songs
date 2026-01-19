const CACHE_NAME = "world-of-god-v1";

const ASSETS = [
  "./",
  "./Index.html",
  "./Main Cover.jpg",

  // 🔊 MP3 FILES
  "./Panduga.mp3",
  "./New Year Song.mp3",

  // 🖼 images (add all used images)
  "./cover.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});