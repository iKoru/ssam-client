importScripts("/precache-manifest.3493381cb5713b164ca03e745fa88784.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* global workbox */
if (workbox) {
  console.log(`Workbox is loaded`);

  workbox.precaching.precacheAndRoute(self.__precacheManifest);

}
else {
  console.log(`Workbox didn't load`);
}
