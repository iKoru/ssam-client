importScripts("/precache-manifest.f132a23ebcef52353e070cccef63d9eb.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* global workbox */
if (workbox) {
  console.log(`Workbox is loaded`);

  workbox.precaching.precacheAndRoute(self.__precacheManifest);

} else {
  console.log(`Workbox didn't load`);
}
