import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginGuard } from './services/login.guard';

export const routes = [
    { path: 'api-usage', component: DashboardComponent, pathMatch: 'full'},
    { path: 'login', canActivate: [LoginGuard], component: DashboardComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: 'api-usage' }
];