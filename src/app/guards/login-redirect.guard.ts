import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export const loginRedirectGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const storage = inject(Storage);

  const token = await storage.get('authToken');

  if (token) {
    router.navigate(['/home-admin']);
    return false;
  } else {
    return true;
  }
};
