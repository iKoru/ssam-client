importScripts("/precache-manifest.d2a5133f516be4ab7e6451ec4ea30909.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* global workbox */
if (workbox) {
  console.log(`Workbox is loaded`);

  workbox.precaching.precacheAndRoute(self.__precacheManifest);

} else {
  console.log(`Workbox didn't load`);
}
