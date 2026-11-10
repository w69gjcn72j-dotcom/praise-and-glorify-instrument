/* Chord & Numeral has moved to https://glorify.kogarah.church/chords/
   This worker replaces the old offline cache: it clears it, removes itself,
   and reloads any open page so the visitor is sent to the new address. */
self.addEventListener("install", function(){ self.skipWaiting(); });
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.registration.unregister(); })
      .then(function(){ return self.clients.matchAll({ type:"window" }); })
      .then(function(cs){ cs.forEach(function(c){ if(c.navigate){ c.navigate(c.url); } }); })
  );
});
