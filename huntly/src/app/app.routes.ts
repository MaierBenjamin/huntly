import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'permissions',
    loadComponent: () => import('./pages/permissions/permissions.page').then( m => m.PermissionsPage)
  },
  {
    path: 'task',
    loadComponent: () => import('./pages/task/task.page').then( m => m.TaskPage)
  },
  {
    path: 'taskboard',
    loadComponent: () => import('./pages/taskboard/taskboard.page').then( m => m.TaskboardPage)
  },
];
