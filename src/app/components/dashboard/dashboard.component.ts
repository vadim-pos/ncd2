import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { Http, Response } from '@angular/http';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <h1>Dashboard component</h1>
    <form #dateRangeForm="ngForm" novalidate>
      <div class="dateInputGroup">
        <span class="dateInputLabel">From:</span>
        <my-date-picker name="startDate" [options]="myDatePickerOptions" [(ngModel)]="startDate" required></my-date-picker>
      </div>
      <div class="dateInputGroup">
        <span class="dateInputLabel">To:</span>
        <my-date-picker name="endDate" [options]="myDatePickerOptions" [(ngModel)]="endDate" required></my-date-picker>
      </div>
    </form>
    <button (click)="makeRequest()">Request</button>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'mmm dd, yyyy',
    showSelectorArrow: false,
    showClearDateBtn: false
  };
  startDate:Object = { 
    date: { year: 2018, month: 10, day: 9 }
  };
  endDate:Object = { 
    date: { year: 2019, month: 10, day: 9 }
  };

  constructor(private httpService: HttpService, private http: Http) { }

  ngOnInit() {
  }

  makeRequest() {    
    this.http.get('/internal-api/account/').map((response: Response) => response.json()).subscribe((data) => console.log(data));
  }
}
