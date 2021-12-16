const staticDevCoffee = "v2.7"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(staticDevCoffee) {
      return Promise.all(
        assets.filter(function(staticDevCoffee) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(staticDevCoffee) {
          return caches.delete(staticDevCoffee);
        })
      );
    })
  );
});
