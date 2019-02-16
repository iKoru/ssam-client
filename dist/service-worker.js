<<<<<<< HEAD
importScripts("/precache-manifest.256ee8d6505a5c5ee29ec791af485d40.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
=======
importScripts("/precache-manifest.9e0e632c8f5fbd38a599e842ccea4c02.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
>>>>>>> editor2

/* global workbox */
if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute(self.__precacheManifest);

} 
else {
    console.log(`Workbox didn't load`);
}
