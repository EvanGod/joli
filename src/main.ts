// ⚙️ Soporte para Web Components de Ionic (ion-icon, ion-img, etc.)
// 👇 DEBE IR ANTES del bootstrapApplication
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// 💠 Importar íconos de Ionicons
import { addIcons } from 'ionicons';
import {
  logoInstagram, logoFacebook, logoLinkedin, logoWhatsapp,
  callOutline, mailOutline, locationOutline, flagOutline,
  eyeOutline, diamondOutline, checkmarkCircleOutline,
  medkitOutline, airplaneOutline, personOutline, carOutline,
  arrowForwardOutline, menuOutline, lockClosedOutline, cashOutline,
  calendarNumberOutline, trendingUpOutline, checkmarkCircle, closeCircle,
  alertCircle, informationCircle, trashOutline, searchOutline,
  heartOutline, starOutline, calculatorOutline, documentTextOutline, logOutOutline,
} from 'ionicons/icons';

addIcons({
  'logo-instagram': logoInstagram,
  'logo-facebook': logoFacebook,
  'logo-linkedin': logoLinkedin,
  'logo-whatsapp': logoWhatsapp,
  'call-outline': callOutline,
  'mail-outline': mailOutline,
  'location-outline': locationOutline,
  'flag-outline': flagOutline,
  'eye-outline': eyeOutline,
  'diamond-outline': diamondOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'medkit-outline': medkitOutline,
  'airplane-outline': airplaneOutline,
  'person-outline': personOutline,
  'car-outline': carOutline,
  'arrow-forward-outline': arrowForwardOutline,
  'menu-outline': menuOutline,
  'lock-closed-outline': lockClosedOutline,
  'cash-outline': cashOutline,
  'calendar-number-outline': calendarNumberOutline,
  'trending-up-outline': trendingUpOutline,
  'checkmark-circle': checkmarkCircle,
  'close-circle': closeCircle,
  'alert-circle': alertCircle,
  'information-circle': informationCircle,
  'trash-outline': trashOutline,
  'search-outline': searchOutline,
  'heart-outline': heartOutline,
  'star-outline': starOutline,
  'calculator-outline': calculatorOutline,
  'document-text-outline': documentTextOutline,
  'log-out-outline': logOutOutline,
});

// 🚀 Bootstrap de la App
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    {
      provide: Storage,
      useFactory: () =>
        new Storage({
          name: 'joli_db',
          driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
        }),
    },
  ],
});
