import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { StaticRenderDataService } from './services/static-render-data.service';

import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    StaticRenderDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
