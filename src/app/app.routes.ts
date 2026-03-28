import { Routes } from '@angular/router';
import { Cadastro } from './pages/cadastro/cadastro';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [{
    path: '',
    component: Cadastro
}, {
    path: 'dashboard',
    component: Dashboard
}];
