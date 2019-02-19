importScripts("/precache-manifest.46280742e73235a09ab8b11060368942.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* global workbox */
if (workbox) {
  console.log(`Workbox is loaded`);

  workbox.precaching.precacheAndRoute(self.__precacheManifest);

}
else {
  console.log(`Workbox didn't load`);
}
