import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http'; // !!!!!!!!!!!!!!!
import { ActivatedRoute } from '@angular/router';

import { IMyDpOptions } from 'mydatepicker';
import { AmChartsService } from "@amcharts/amcharts3-angular";

import { AppDataService } from '../../services/app-data.service';
import { HttpService } from '../../services/http.service';
import { ApiEndpoints } from '../../api-endpoints';
import { Profile } from '../../interfaces/profile';

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

    <div id="main-dashboard-chart" [style.width.%]="100" [style.height.px]="500"></div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  profile: Profile = null;
  dates: { profileStart?: Date, monthAgo?: Date, from?: Date, to?: Date } = {};
  chartsData = {};

  constructor(private httpService: HttpService, private route: ActivatedRoute, private AmCharts: AmChartsService, private appDataService: AppDataService) { }

  ngOnInit() {
    const now = new Date();

    this.profile = this.appDataService.getProfileData();

    this.dates.profileStart = new Date(this.profile.initial_date);
    this.dates.monthAgo = new Date(now.setMonth(now.getMonth() - 1));
    this.dates.from = new Date(this.dates.profileStart > this.dates.monthAgo ? + this.dates.profileStart : +this.dates.monthAgo);
    this.dates.to = new Date();

    this.appDataService.fetchChartsData(this.dates.from, this.dates.to).subscribe(
      data => console.log(data)
    );

  }

  makeRequest() {    
    this.httpService.get('/internal-api/account/').map((response: Response) => response.json()).subscribe((data) => console.log(data));
  }













  // myDatePickerOptions: IMyDpOptions = {
  //   dateFormat: 'mmm dd, yyyy',
  //   showSelectorArrow: false,
  //   showClearDateBtn: false
  // };
  // startDate:Object = { 
  //   date: { year: 2018, month: 10, day: 9 }
  // };
  // endDate:Object = { 
  //   date: { year: 2019, month: 10, day: 9 }
  // };
/*-------------------------------------------------------------------------------------------------------------------*/
  // private timer: any;
  // private chart: any;

  //  makeRandomDataProvider() {
  //   var dataProvider = [];

  //   // Generate random data
  //   for (var year = 1950; year <= 2005; ++year) {
  //     dataProvider.push({
  //       year: "" + year,
  //       value: Math.floor(Math.random() * 100) - 50
  //     });
  //   }

  //   return dataProvider;
  // }

  //   ngOnInit() {
  //   this.chart = this.AmCharts.makeChart("main-dashboard-chart", {
  //     "type": "serial",
  //     "theme": "light",
  //     "marginTop":0,
  //     "marginRight": 80,
  //     "dataProvider": this.makeRandomDataProvider(),
  //     "valueAxes": [{
  //       "axisAlpha": 0,
  //       "position": "left"
  //     }],
  //     "graphs": [{
  //       "id":"g1",
  //       "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
  //       "bullet": "round",
  //       "bulletSize": 8,
  //       "lineColor": "#d1655d",
  //       "lineThickness": 2,
  //       "negativeLineColor": "#637bb6",
  //       "type": "smoothedLine",
  //       "valueField": "value"
  //     }],
  //     "chartScrollbar": {
  //       "graph":"g1",
  //       "gridAlpha":0,
  //       "color":"#888888",
  //       "scrollbarHeight":55,
  //       "backgroundAlpha":0,
  //       "selectedBackgroundAlpha":0.1,
  //       "selectedBackgroundColor":"#888888",
  //       "graphFillAlpha":0,
  //       "autoGridCount":true,
  //       "selectedGraphFillAlpha":0,
  //       "graphLineAlpha":0.2,
  //       "graphLineColor":"#c2c2c2",
  //       "selectedGraphLineColor":"#888888",
  //       "selectedGraphLineAlpha":1
  //     },
  //     "chartCursor": {
  //       "categoryBalloonDateFormat": "YYYY",
  //       "cursorAlpha": 0,
  //       "valueLineEnabled":true,
  //       "valueLineBalloonEnabled":true,
  //       "valueLineAlpha":0.5,
  //       "fullWidth":true
  //     },
  //     "dataDateFormat": "YYYY",
  //     "categoryField": "year",
  //     "categoryAxis": {
  //       "minPeriod": "YYYY",
  //       "parseDates": true,
  //       "minorGridAlpha": 0.1,
  //       "minorGridEnabled": true
  //     },
  //     "export": {
  //       "enabled": true
  //     }
  //   });

  //   // Updates the chart every 3 seconds
  //   this.timer = setInterval(() => {
  //     // This must be called when making any changes to the chart
  //     this.AmCharts.updateChart(this.chart, () => {
  //       this.chart.dataProvider = this.makeRandomDataProvider();
  //     });
  //   }, 3000);
  // }

  // ngOnDestroy() {
  //   clearInterval(this.timer);
  //   this.AmCharts.destroyChart(this.chart);
  // }


}
