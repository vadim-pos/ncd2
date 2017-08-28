import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
declare const d3;

@Component({
  selector: 'app-main-chart',
  template: `
    <div class="main-chart">
      <nvd3 [options]="options" [data]="data"></nvd3>
    </div>
  `,
  styleUrls: ['./main-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainChartComponent implements OnInit {
  @Input() availablePlanTypes: string[];
  @Input() chartData: any[];

  options;
  data;

  ngOnInit() {

    const planColorsMap = {
      phone: '#0B9CDD',
      fraud: '#F16967',
      email: '#E2A725',
      profile: '#E25925',
      name_address: '#8DC63F',
      cra: '#965AF1',
      p3: '#B693DA',
      validate: '#C4298C'
    };

    this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : { top: 20, right: 40, bottom: 50, left: 55 },
        x: d => d.date,
        y: d => d.callsCount,
        isArea: true,
        color: d => planColorsMap[d.key],
        useInteractiveGuideline: true,
        clipEdge: false,
        showValues: true,
        duration: 500,
        pointShape: d => 'circle',
        pointSize: 10,
        interpolate: 'monotone', // cubic interpolation that makes the graph slightly smoother
        xAxis: {
          showMaxMin: true,
          tickFormat: data => d3.time.format('%x')(new Date(data))
        },
        yAxis: {
          showMaxMin: true,
        }
      }
    };

    this.data = this.chartData;
  }
}
