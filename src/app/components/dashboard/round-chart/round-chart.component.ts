import { Component, AfterViewInit, Input } from '@angular/core';
import { AmChartsService } from "@amcharts/amcharts3-angular";

@Component({
  selector: 'app-round-chart',
  template: `
    <div [id]="chartID" [style.width.%]="100" [style.height.px]="300"></div>
  `,
  styleUrls: ['./round-chart.component.scss']
})
export class RoundChartComponent implements AfterViewInit {
  @Input() chartID: string;
  @Input() chartType: string;
  // instance of amChart
  chart = null;

  constructor(private AmCharts: AmChartsService) { }

  ngAfterViewInit() {
    const chartData = [
      { "category": "male", "value": 62.3 },
      { "category": "female", "value": 37.7 }
    ];

    const chartConfig = {
      "type": "pie",
      "theme": "default",
      "dataProvider": chartData,
      "valueField": "value",
      "titleField": "category",
      "innerRadius": 80,
      "pullOutRadius": 20
    };

    this.chart = this.AmCharts.makeChart(this.chartID, chartConfig);
  }

}

// const colors = {
//   Male: "#0099de",
//   Female: "#f167a8",
//   tech_savvy: "#965AF1",
//   Married: "#f16967",
//   has_kids: "#e2a725",
//   wealthy: "#8dc63f",
//   Single: '#e0e3e5',
//   placeholder: "#e0e3e5"
// };


