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
    path: 'gps-task',
    loadComponent: () => import('./pages/gps-task/gps-task.page').then(m => m.GpsTaskPage)
  },
  {
    path: 'task-qr',
    loadComponent: () => import('./pages/task-qr/task-qr.page').then( m => m.TaskQrPage)
  },
  {
    path: 'task-sensor',
    loadComponent: () => import('./pages/task-sensor/task-sensor.page').then( m => m.TaskSensorPage)
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('./pages/leaderboard/leaderboard.page').then( m => m.LeaderboardPage)
  },

];
