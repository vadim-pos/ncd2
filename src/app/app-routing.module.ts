import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseComponent } from './components/base/base.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { LoggingInComponent } from './components/logging-in/logging-in.component';

import { AuthGuard } from './services/guards/auth.guard';
import { ProfileDataResolver } from './services/resolvers/profile-data-resolver';

const routes: Routes = [
    { path: 'login', component: LoggingInComponent },
    { path: 'error', component: ErrorComponent },
    { path: '', component: BaseComponent, canActivate: [AuthGuard], resolve: { profile: ProfileDataResolver }, children: [
      { path: 'api-usage', component: DashboardComponent },
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
    AuthGuard,
    ProfileDataResolver
  ]
})
export class AppRoutingModule {}