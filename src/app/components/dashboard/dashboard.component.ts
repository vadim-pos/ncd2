import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http'; // !!!!!!!!!!!!!!! TO DELETE
import { ActivatedRoute } from '@angular/router';

import { IMyDpOptions } from 'mydatepicker';
import { AmChartsService } from "@amcharts/amcharts3-angular";
import * as moment from 'moment';
import { AppDataService } from '../../services/app-data.service';
import { HttpService } from '../../services/http.service';
import { ApiEndpoints } from '../../api-endpoints';
import { Profile, ChartsData, GraphData, MapData } from '../../interfaces';

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

    <div id="main-chart" [style.width.%]="100" [style.height.px]="500"></div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profile: Profile = null;
  chartsData: ChartsData = null;
  mapData: MapData = null;
  graphData: GraphData = null;

  mainChart: any = null;
  dates: { profileStart?: Date, from?: Date, to?: Date } = {};

  constructor(private httpService: HttpService, private route: ActivatedRoute, private AmCharts: AmChartsService, private appDataService: AppDataService) { }

  ngOnInit() {
    const oneMonthAgo = new Date(moment().subtract(1, 'month').format());

    this.profile = this.appDataService.getProfileData();
    this.dates.profileStart = new Date(this.profile.initial_date);
    this.dates.from = new Date((this.dates.profileStart > oneMonthAgo) ? +this.dates.profileStart : +oneMonthAgo);
    this.dates.to = new Date();

    this.appDataService.fetchChartsData(this.dates.from, this.dates.to)
      .subscribe(({chartsData, mapData, graphData }) => {
          this.chartsData = chartsData;
          this.mapData = mapData;
          this.graphData = graphData;
          console.log(this.chartsData, this.mapData, this.graphData);

          this.prepareMainChartData();
          this.drawMainChart();
        }
      );
  }

  prepareMainChartData() {
    // const result: any[] = [];

    // const planTypesOrder = ["phone", "email", "name_address", "fraud", "profile", "cra", "p3", "validate"];
    // const keyNames = {
    //   phone: "Phone ID",
    //   fraud: 'Fraud ID',
    //   email: 'Email ID',
    //   cra: 'CRA ID',
    //   p3: 'P3 ID',
    //   validate: 'Validate',
    //   profile: 'Profile ID',
    //   name_address: 'Name & Address ID'
    // };

    console.log(this.extractMainChartDataValues('phone'));
  }

  extractMainChartDataValues(type: string): { date:string, value: number }[] {
    const datesDiffInDays = moment(this.dates.to).diff(this.dates.from, 'days') + 1;

    return Array.from(Array(datesDiffInDays).keys()).map(i => {
      const day = moment(this.dates.from).add(i, 'day');
      const dayFormatted = day.format('YYYY-MM-DD');
      const value = this.graphData.range_report[dayFormatted]
        && this.graphData.range_report[dayFormatted][type]
        && this.graphData.range_report[dayFormatted][type].requests_count || 0;
      return { date: dayFormatted, value };
    });
  }

  drawMainChart() {
    this.mainChart = this.AmCharts.makeChart('main-chart', {
      "type": "serial",
      "theme": "light",
      "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "mouseWheelZoomEnabled": true,
      "dataDateFormat": "YYYY-MM-DD",

      // "valueAxes": [{
      //   "id": "v1",
      //   "axisAlpha": 0,
      //   "position": "right",
      //   "ignoreAxisWidth":true
      // }],
      "valueAxes": [],

      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },

      "graphs": [{
        "id": "g1",
        "balloon":{
          "drop":true,
          "adjustBorderColor":false,
          "color":"#ffffff"
        },
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "value",
        "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
      }],

      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis":false,
        "offset":30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount":true,
        "color":"#AAAAAA"
      },

      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable":true
      },

      "valueScrollbar":{
        "oppositeAxis":false,
        "offset":50,
        "scrollbarHeight":10
      },

      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
      },

      "export": {
        "enabled": true
      },

      "dataProvider": this.extractMainChartDataValues('phone'),

    });
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
