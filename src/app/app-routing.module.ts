import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { LoggingInComponent } from './components/logging-in/logging-in.component';

const routes: Routes = [
    { path: '', children: [
      { path: 'api-usage', component: DashboardComponent },
      { path: 'login', component: LoggingInComponent },
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
  providers: []
})
export class AppRoutingModule {}