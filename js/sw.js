let urlsCache = [
    '/',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/index.html',
    '/restaurant.html'
];


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll(urlsCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                console.log('Found ', event.request, ' in cache');
                return response;
            } else {
                console.log('Could not find ', event.request, 'in cache, FETCHING!');
                return fetch(event.request)
                    .then(function(response) {
                        caches.open('v1').then(function(cache) {
                                cache.put(event.request, cloneResponse);
                                return response;
                            })
                            .catch(function(err) {
                                console.log(err);
                            });
                    });
            }
        })
    );
});