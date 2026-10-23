/* Service worker del Presupuesto.
   - Primero intenta la red (así ves siempre la última versión subida a GitHub)
     y si no hay conexión usa la copia guardada.
   - Solo maneja archivos de este mismo sitio: Firebase y Google Fonts pasan
     directo, sin tocarlos (si no, la sincronización podría fallar).
   - Si alguna vez querés forzar a todos los equipos a borrar lo viejo,
     cambiá el número de VERSION. */
const VERSION = 'presupuesto-v2';
const BASE = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(BASE)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copia = res.clone(); caches.open(VERSION).then(c => c.put(req, copia)); }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
