importScripts("/precache-manifest.1c9604f2ef44621070fac3ff12b1f3b9.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* global workbox */
if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute(self.__precacheManifest);

} 
else {
    console.log(`Workbox didn't load`);
}
