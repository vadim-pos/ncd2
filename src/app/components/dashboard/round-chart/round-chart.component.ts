import { Component, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { AmChartsService } from "@amcharts/amcharts3-angular";

@Component({
  selector: 'app-round-chart',
  template: `
    <div [id]="chartID" [style.width.%]="99" [style.height.px]="300"></div>
  `,
  styleUrls: ['./round-chart.component.scss']
})
export class RoundChartComponent implements AfterViewInit, OnDestroy {
  @Input() chartID: string;
  @Input() chartData: {[category:string]: number};
  // instance of amChart
  chart = null;

  constructor(private AmCharts: AmChartsService) { }

  ngAfterViewInit() {
    const colorsMap = {
      Male: "#0099de",
      Female: "#f167a8",
      tech_savvy: "#965AF1",
      Married: "#f16967",
      has_kids: "#e2a725",
      wealthy: "#8dc63f",
      Single: '#2196f3',
      other: "#e0e3e5"
    };
    
    const chartData = Object.keys(this.chartData).map(key => ({ "category": key, "value": this.chartData[key]}));
    const colors = Object.keys(this.chartData).map(key => colorsMap[key]);
    const chartDataTotal = Object.keys(this.chartData).map(key => this.chartData[key]).reduce((prev, next) => prev + next, 0);
    const chartLabels = Object.keys(this.chartData).map((key, i, arr) => {
      return {
        "y": this.chartData.other ? '42%' : `${(i * 15) + 35}%`,
        "align": "center",
        "size": "25",
        "text": key === 'other' ? '' : Math.round((this.chartData[key] / chartDataTotal) * 100),
        "color": colorsMap[key]
      };
    });

    const chartConfig = {
      "type": "pie",
      "theme": "default",
      "dataProvider": chartData,
      "valueField": "value",
      "titleField": "category",
      "innerRadius": 50,
      // "pullOutRadius": 34,
      "labelsEnabled": false,
      colors,
      "allLabels": chartLabels
    };

    this.chart = this.AmCharts.makeChart(this.chartID, chartConfig);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

}
