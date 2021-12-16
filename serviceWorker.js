const staticDevCoffee = "v3"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  )
})

self.addEventListener('activate', event => {

  // Delete all Service Worker Caches
  caches.keys().then(cacheNames => {for (let name of cacheNames) {caches.delete(name);}});

  // Unregister all Service Workers
  self.registration.unregister()

    .then(() => self.clients.matchAll())

    .then((clients) => clients.forEach(client => client.navigate(client.url)))

});
