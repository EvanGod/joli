import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { addIcons } from 'ionicons';
import {
  logoInstagram,
  logoFacebook,
  logoLinkedin,
  callOutline,
  mailOutline,
  locationOutline,
  flagOutline,
  eyeOutline,
  diamondOutline,
  checkmarkCircleOutline,
  medkitOutline,
  airplaneOutline,
  personOutline,
  carOutline,
  arrowForwardOutline
} from 'ionicons/icons';

addIcons({
  'logo-instagram': logoInstagram,
  'logo-facebook': logoFacebook,
  'logo-linkedin': logoLinkedin,
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
  'arrow-forward-outline': arrowForwardOutline
});


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
