import 'hammerjs';

import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if ('serviceWorker' in navigator && environment.production) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
      registration.unregister().then(() => console.log('unregistered service worker'));
    }
  });

  caches.keys().then(keyList => {
    return Promise.all(
      keyList.map(key => {
        return caches.delete(key);
      }),
    );
  });
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('./ngsw-worker.js');
    }
  })
  .catch(err => console.error(err));
