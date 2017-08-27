import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
declare const d3;

@Component({
  selector: 'app-main-chart',
  template: `
    <div>
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
        },
        interactiveLayer: {
          tooltip: {
            // position: () => this.generateTooltipContent(),
            hidden: () => true
            // enabled: false
          }
        },
        // callback: chart => chart.interactiveLayer.tooltip.contentGenerator(this.generateTooltipContent)
        // callback: chart => chart.interactiveLayer.tooltip.contentGenerator(this.generateTooltipContent)
        callback: chart => console.dir(chart.interactiveLayer.tooltip)
      }
    };

    this.data = this.chartData;
  }

  generateTooltipContent() {
    console.log(1111);
    // return `
    //   <div style="box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)">
    //     <span>${ d3.time.format('%x')(new Date(data.value)) }</span>
    //     <table>
    //       ${data.series.forEach(serie => (
    //         `<tr>
    //           <td><span style="display: block;width: 12px;height: 12px; border: 1px solid #fff; background=${serie.color}"></span></td>
    //         </tr>`
    //       ))}
    //     </table>
    //   </div>
    // `;


    // `<div #balloon class="balloon" [class.visible]="balloonIsVisible" [ngStyle]="balloonStyles">
    //   <div class="balloon-header">{{selectedCursorData ? selectedCursorData.date : ''}}</div>
    //   <table class="balloon-table">
    //     <tr class="balloon-item"
    //         *ngFor="let type of availableTypesOrdered"
    //         [class.selected]="selectedGraphItem && selectedGraphItem === type"
    //         [style.background] = "selectedGraphItem === type ? planColorsMap[type] : ''"
    //         >
    //       <td class="balloon-cell marker-cell"><span class="balloon-marker" [style.background]="planColorsMap[type]"></span></td>
    //       <td class="balloon-cell type-cell">{{chartPlanNamesMap[type]}}</td>
    //       <td class="balloon-cell value-cell">{{selectedCursorData ? selectedCursorData[type] : ''}}</td>
    //     </tr>
    //   </table>
    // </div>`
  }

}
