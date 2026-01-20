const CACHE_NAME = "world-of-god-v2";

const ASSETS = [
  "/World-of-God-Songs/index.html",
  "/World-of-God-Songs/manifest.json",
  "/World-of-God-Songs/Main-Cover.jpg",

  "/World-of-God-Songs/Akashamtho.mp3",
  "/World-of-God-Songs/Devuni-Sneham.mp3",
  "/World-of-God-Songs/New-Year-Song.mp3",
  "/World-of-God-Songs/New-Year-Song-Remix.mp3",
  "/World-of-God-Songs/New-Year-Track.mp3",
  "/World-of-God-Songs/Panduga.mp3",
  "/World-of-God-Songs/Rajas-Christmas-Song-Track.mp3",
  "/World-of-God-Songs/Srustilo.mp3",
  "/World-of-God-Songs/Telusa.mp3",
  "/World-of-God-Songs/Thudivaraku.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
