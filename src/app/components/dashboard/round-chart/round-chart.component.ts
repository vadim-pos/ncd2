import { Component, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { AmChartsService } from "@amcharts/amcharts3-angular";

@Component({
  selector: 'app-round-chart',
  template: `
    <div [id]="chartID" [style.width.%]="99" [style.height.px]="200"></div>
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
      Single: '#e0e3e5',
      other: "#e0e3e5"
    };
    
    const chartData = Object.keys(this.chartData).map(key => ({ "category": key, "value": this.chartData[key]}));
    const colors = Object.keys(this.chartData).map(key => colorsMap[key]);
    const chartLabels = Object.keys(this.chartData).map(key => {
      return {
        "y": "50%",
        "align": "center",
        "size": "25",
        "text": this.chartData[key],
        "color": "#555"
      };
    });

    const chartConfig = {
      "type": "pie",
      "theme": "default",
      "dataProvider": chartData,
      "valueField": "value",
      "titleField": "category",
      "innerRadius": 60,
      "pullOutRadius": 20,
      "labelsEnabled": false,
      colors,
      "allLabels": chartLabels
    };

    this.chart = this.AmCharts.makeChart(this.chartID, chartConfig);
    console.log(this.chart);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

}
