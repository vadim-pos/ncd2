import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes = [
    { path: 'api-usage', component: DashboardComponent, pathMatch: 'full'},
    { path: '**', redirectTo: 'api-usage' }
];