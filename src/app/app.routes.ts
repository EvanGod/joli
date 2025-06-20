import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginRedirectGuard } from './guards/login-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./nosotros/nosotros.page').then( m => m.NosotrosPage)
  },
  {
    path: 'pensiones',
    loadComponent: () => import('./pensiones/pensiones.page').then( m => m.PensionesPage)
  },
  {
    path: 'seguros',
    loadComponent: () => import('./seguros/seguros.page').then( m => m.SegurosPage)
  },
  {
    path: 'planes',
    loadComponent: () => import('./planes/planes.page').then( m => m.PlanesPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
    canActivate: [loginRedirectGuard],
  },
  {
    path: 'propuesta',
    loadComponent: () => import('./propuesta/propuesta.page').then( m => m.PropuestaPage),
    canActivate: [authGuard],
  },
  {
    path: 'home-admin',
    loadComponent: () => import('./home-admin/home-admin.page').then( m => m.HomeAdminPage),
    canActivate: [authGuard],
  },
];
