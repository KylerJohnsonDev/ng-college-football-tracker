import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { sportsApiInterceptor } from './app/interceptors';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([sportsApiInterceptor])),
    importProvidersFrom(BrowserAnimationsModule),
    provideStore(),
  ],
}).catch((err) => console.error(err));
