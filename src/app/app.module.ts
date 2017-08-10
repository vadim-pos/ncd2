/*--------- Angular Modules ---------*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

/*--------------------- Vendor Modules ---------------------*/
// Datepicker module 'mydatepicker', source: https://github.com/kekeh/mydatepicker 
import { MyDatePickerModule } from 'mydatepicker'; 

/*--------------------- Components ---------------------*/
import { AppComponent } from './components/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { LoggingInComponent } from './components/logging-in/logging-in.component';

/*--------------------- Services ---------------------*/
import { HttpService } from './services/http.service';
import { AppDataService } from './services/app-data.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ErrorComponent,
    LoggingInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MyDatePickerModule
  ],
  providers: [
    HttpService,
    AuthService,
    AppDataService
    // {
    //   provide: Http,
    //   useFactory: (backend: XHRBackend, options: RequestOptions) => new HttpService(backend, options),
    //   deps: [XHRBackend, RequestOptions]
    // },
    // { provide: HttpService, useClass: HttpService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
