import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import createBFFServer from './mirageServer';

if (environment.production) {
  enableProdMode();
}

if (environment.enableMock) {
  createBFFServer();
} 

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
