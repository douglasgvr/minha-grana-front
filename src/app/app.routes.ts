import { Routes } from '@angular/router';
import { Cadastro } from './pages/cadastro/cadastro';
import { Dashboard } from './pages/dashboard/dashboard';
import { SetupConta } from './pages/setup-conta/setup-conta';

export const routes: Routes = [
  {
    path: '',
    component: Cadastro,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'setup',
    component: SetupConta,
  },
];
