const CACHE_NAME = "videokerio-v4";

const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./musicas.json",
    "./assets/logo.png",
    "./manifest.json"
];

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cache => {

                    if(cache !== CACHE_NAME){

                        return caches.delete(cache);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

self.addEventListener("fetch", event => {

    if(event.request.url.includes("musicas.json")){

        event.respondWith(

            fetch(event.request)
            .catch(() => caches.match(event.request))

        );

        return;

    }

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            return response || fetch(event.request);

        })

    );

});