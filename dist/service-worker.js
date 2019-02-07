importScripts("/precache-manifest.fa1e59da293887fc4fdbfceeca2de6e7.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* global workbox */
if (workbox) {
  console.log(`Workbox is loaded`);

  workbox.precaching.precacheAndRoute(self.__precacheManifest);

} else {
  console.log(`Workbox didn't load`);
}
