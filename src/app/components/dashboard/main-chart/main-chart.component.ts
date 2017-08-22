import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AmChartsService } from "@amcharts/amcharts3-angular";

@Component({
  selector: 'app-main-chart',
  template: `
    <div #chartContainer class="chart-container" (mousemove)="setBalloonPosition(balloon, chartContainer, $event)" (mouseleave)="balloonIsVisible=false" [style.position]="'relative'">
      <div id="main-chart" [style.width.%]="99" [style.height.px]="500"></div>
      <div #balloon [class.visible]="balloonIsVisible" class="balloon" [ngStyle]="balloonStyles">
        <div class="balloon-header">{{selectedCursorData ? selectedCursorData.date : ''}}</div>
        <table class="balloon-table">
          <tr class="balloon-table-item"
              *ngFor="let type of availableTypesOrdered"
              [class.selected]="selectedGraphItem && selectedGraphItem === type"
              [style.background] = "selectedGraphItem === type ? planColorsMap[type] : ''"
              >
            <td class="balloon-table-cell marker-cell"><span class="marker" [style.background]="planColorsMap[type]"></span></td>
            <td class="balloon-table-cell type-cell">{{chartPlanNamesMap[type]}}</td>
            <td class="balloon-table-cell value-cell">{{selectedCursorData ? selectedCursorData[type] : ''}}</td>
          </tr>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit {
  @Input() availablePlanTypes: string[];
  @Input() chartData: any[];
  balloonStyles = { position:'absolute', top:'0', left:'0' };
  balloonIsVisible: boolean = false;

  // instance of amChart
  mainChart = null;
  // map plan types and corresponding titles that should be rendered in the chart
  chartPlanNamesMap = {
    phone: "Phone ID",
    fraud: 'Fraud ID',
    email: 'Email ID',
    cra: 'CRA ID',
    p3: 'P3 ID',
    validate: 'Validate',
    profile: 'Profile ID',
    name_address: 'Name & Address ID'
  };
  planColorsMap = {
    phone: '#0B9CDD',
    fraud: '#F16967',
    email: '#E2A725',
    profile: '#E25925',
    name_address: '#8DC63F',
    cra: '#965AF1',
    p3: '#B693DA',
    validate: '#C4298C'
  };
  // the order in which the plans should follow in the chart
  planTypesOrder = ["phone", "email", "name_address", "fraud", "profile", "cra", "p3", "validate"];
  // available plan types for main chart in correct order (according to the planTypesOrder propperty)
  availableTypesOrdered: string[] = [];
  selectedGraphItem: any;
  selectedCursorData: any;

  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {
    const chartConfiguration = this.getChartConfiguration(this.availablePlanTypes, this.chartData);
    this.mainChart = this.AmCharts.makeChart('main-chart', chartConfiguration);

    this.mainChart.addListener("changed", e => {
      const selectedCursorData = e.chart.dataProvider[e.index];
      if (selectedCursorData) {
        this.selectedCursorData = selectedCursorData;
      }
      this.balloonIsVisible = true;
    });

    this.mainChart.chartCursor.addListener('onHideCursor', e => this.balloonIsVisible = false);
    this.mainChart.addListener('rollOverGraphItem', e => {
      console.log(e);
      this.selectedGraphItem = e.target.valueField;
    });
    this.mainChart.addListener('rollOutGraphItem', e => this.selectedGraphItem = null);
  }

  /**
   * Creates and returns chart configuration object
   * @param {string[]} availableTypes array of available data types for main chart
   * @param {any[]}    chartData  array of data to be rendered in the chart
   */
  getChartConfiguration(availableTypes: string[], chartData: any[]): { [key: string]: any } {
    this.availableTypesOrdered = this.planTypesOrder.filter(type => availableTypes.indexOf(type) >= 0);

    // getting colors property for chart configuration
    const colors = this.availableTypesOrdered.map(type => this.planColorsMap[type]);

    const graphs = this.availableTypesOrdered.map((type, index) => ({
      "showBalloon": false,
      "bullet": "round",
      "bulletSize": 6,
      "fillAlphas": 0.4,
      "id": `graph-${index}`,
      "valueField": type,
      "title": this.chartPlanNamesMap[type],
    }));

    return {
      "type": "serial",
      "categoryField": "date",
      "dataDateFormat": "YYYY/MM/DD",
      "autoMarginOffset": 40,
      colors,
      "addClassNames": true,
      "startEffect": "easeOutSine",
      "sequencedAnimation": false,
      "startDuration": 0.6,
      "fontSize": 13,
      "theme": "default",
      "categoryAxis": { "gridPosition": "start", "parseDates": true, "autoGridCount": true, "fontSize": 11 },
      "trendLines": [],
      "guides": [],
      graphs,
      "valueAxes": [{ "id": "ValueAxis-1", "title": "", "fontSize": 11 }],
      "chartCursor": {
        "pan": false,
        "valueLineEnabled": false,
        "valueLineBalloonEnabled": false,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueZoomable":true,
        "oneBalloonOnly": true,
        "categoryBalloonEnabled": false
      },
      "allLabels": [],
      "balloon": {},
      "titles": [],
      "dataProvider": chartData
    };
  }

  setBalloonPosition(balloonElement: HTMLElement, chartContainerElement: HTMLElement, e: MouseEvent) {
    const mouseGap = 40;
    let top = e.offsetY - (balloonElement.offsetHeight / 2 - 20);
    let left = e.offsetX + mouseGap;

    /* if balloon element overflows bottom border of chart container */
    if (e.offsetY + balloonElement.offsetHeight + 10 > chartContainerElement.offsetHeight) {        
      top -= (e.offsetY + balloonElement.offsetHeight + 10) - chartContainerElement.offsetHeight;
    }
    /* if balloon element overflows top border of chart container */
    if (e.offsetY - balloonElement.offsetHeight / 2 - 10 < 0) {
      top = 20;
    }
    /* if balloon element overflows right border of chart container */
    if (e.offsetX + balloonElement.offsetWidth + this.mainChart.autoMarginOffset > chartContainerElement.offsetWidth) {
      left -= balloonElement.offsetWidth + balloonElement.offsetWidth / 2 - mouseGap;
    }

    this.balloonStyles = { ...this.balloonStyles, top: `${top}px`, left: `${left}px` };
  }

}
