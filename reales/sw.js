/* Service worker de la app de Reales (solo controla la carpeta reales/).
   - Al instalarse guarda la app y las fuentes, así funciona sin internet.
   - La app: primero intenta la red (ves siempre la última versión) y si no hay conexión usa la copia.
   - Las fuentes de Google: usa la copia guardada si la hay.
   - Para forzar a borrar lo viejo en todos los equipos, cambiá el número de VERSION. */
const VERSION = 'reales-v1';
const FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700&family=Figtree:wght@400;500;600&display=swap';
const BASE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(async c => {
    await c.addAll(BASE).catch(() => {});
    try { // fuentes: la hoja de estilos y los archivos que nombra
      const css = await fetch(FONTS);
      await c.put(FONTS, css.clone());
      const urls = (await css.text()).match(/https:\/\/fonts\.gstatic\.com\/[^)]+/g) || [];
      await Promise.all(urls.map(u => fetch(u, { mode: 'cors' }).then(r => c.put(u, r)).catch(() => {})));
    } catch (err) {}
  }));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith('reales-') && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com') {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
      const copia = res.clone(); caches.open(VERSION).then(c => c.put(req, copia)); return res;
    })));
    return;
  }
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copia = res.clone(); caches.open(VERSION).then(c => c.put(req, copia)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
  );
});
