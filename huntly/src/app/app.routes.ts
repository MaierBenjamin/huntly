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
  {
    path: 'task-gps',
    loadComponent: () => import('./pages/task-gps/task-gps.page').then(m => m.TaskGpsPage)
  },
  {
    path: 'task-qr',
    loadComponent: () => import('./pages/task-qr/task-qr.page').then( m => m.TaskQrPage)
  },
  {
    path: 'task-wifi',
    loadComponent: () => import('./pages/task-wifi/task-wifi.page').then( m => m.TaskWifiPage)
  },
  {
    path: 'task-walk',
    loadComponent: () => import('./pages/task-walk/task-walk.page').then( m => m.TaskWalkPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.page').then( m => m.HistoryPage)
  },




];
