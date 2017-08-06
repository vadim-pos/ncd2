import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginGuard } from './services/login.guard';

const routes: Routes = [
    { path: '', children: [
      { path: 'api-usage', component: DashboardComponent },
      { path: 'login', canActivate: [LoginGuard], component: DashboardComponent },
      { path: 'error', component: ErrorComponent },
      { path: '**', redirectTo: 'api-usage' }
    ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LoginGuard
  ]
})
export class AppRoutingModule {}