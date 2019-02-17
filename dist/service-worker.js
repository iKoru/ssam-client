importScripts("/precache-manifest.4dcf807ac4936eacb4e006a5d21ab76d.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* global workbox */
if (workbox) {
  console.log(`Workbox is loaded`);

  workbox.precaching.precacheAndRoute(self.__precacheManifest);

}
else {
  console.log(`Workbox didn't load`);
}
