importScripts("/precache-manifest.7e4fc9909959e745bf82b5143a5a4408.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* global workbox */
if (workbox) {
    workbox.precaching.precacheAndRoute(self.__precacheManifest);
    // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
    workbox.routing.registerRoute(
      new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
      workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
          }),
        ],
      }),
    ); 
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      }),
    ); 
} 

