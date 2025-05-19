import { Routes } from '@angular/router';

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
];
