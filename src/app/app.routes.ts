import { Routes } from '@angular/router';
import {LoginGuard} from './core/guards/login.guard';
import {PrivatePagesGuard} from './core/guards/private-pages.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/public/login/login.component').then(m => m.LoginComponent),
    runGuardsAndResolvers: 'always',
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/public/register/register.component').then(m => m.RegisterComponent),
    runGuardsAndResolvers: 'always',
    canActivate: [LoginGuard]
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/public/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
    runGuardsAndResolvers: 'always',
    canActivate: [LoginGuard]
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/public/not-found/not-found.component').then(m => m.NotFoundComponent),
    // runGuardsAndResolvers: 'always'
  },
  // {
  //   path: 'p',
  //   loadChildren: () => import('./pages/private/private-pages.routes').then(m => m.PRIVATE_PAGES_ROUTES),
  //   runGuardsAndResolvers: 'always',
  //   // canActivate: [PrivatePagesGuard],
  // },
  // {
  //   path: 'p',
  //   loadComponent: () =>
  //     import('./pages/private/private-pages.component').then(
  //       (m) => m.PrivatePagesComponent
  //     ),
  //   // runGuardsAndResolvers: 'always',
  // },

  {
    path: 'event-management',
    loadChildren: () =>
      import('./pages/private/event-managment/event-management.module').then(
        (m) => m.EventManagmentModule
      ),
  },

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'},
];

