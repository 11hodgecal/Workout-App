
//allows for the app to be installed locally
self.addEventListener("install",e =>{
    e.waitUntil(
        caches.open("static").then(cache =>{
            return cache.addAll(["./","./Css/Site.css","./Images/Logo192.png"])
        })
    )
})

self.addEventListener("fetch",e =>{
    e.respondWith(
        caches.match(e.request).then(response =>{
            return response || fetch(e.request)
        })
    )
})