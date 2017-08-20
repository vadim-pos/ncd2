import { Injectable } from '@angular/core';
import { AmChartsService } from "@amcharts/amcharts3-angular";

@Injectable()
export class ChartsConfigurationService {

  mainChart = null;
  // map plan types and corresponding titles that should be rendered in the chart
  mainChartPlanNamesMap = {
    phone: "Phone ID",
    fraud: 'Fraud ID',
    email: 'Email ID',
    cra: 'CRA ID',
    p3: 'P3 ID',
    validate: 'Validate',
    profile: 'Profile ID',
    name_address: 'Name & Address ID'
  };
  // the order in which the plans should follow in the chart
  planTypesOrder = ["phone", "email", "name_address", "fraud", "profile", "cra", "p3", "validate"];
  // available plan types for main chart in correct order (according to the planTypesOrder propperty)
  availableTypesOrdered: string[] = [];

  constructor(private AmCharts: AmChartsService) { }

  /**
   * Creates main chart in DOM-element with provided ID, containing provided data to be rendered
   * @param {string}   chartContainerId ID of chart container DOM-element
   * @param {string[]} availableTypes   array of available data types represented in main chart
   * @param {any[]}    chartData    array of data to be rendered in main chart
   */
  createMainChart(chartContainerId: string, availableTypes: string[], chartData: any[]) {
    const chartContainerElement = document.getElementById(chartContainerId);
    const balloonElement = document.createElement('div'); // custom balloon element for the chart
    const chartConfiguration = this.getMainChartConfiguration(availableTypes, chartData);
    let balloonContent: string = '';
    
    balloonElement.setAttribute('id', 'main-chart-balloon');
    balloonElement.style.cssText = 'display: none; position: absolute';
    
    // chartContainerElement.style.position = 'relative';
    this.mainChart = this.AmCharts.makeChart(chartContainerId, chartConfiguration);
    // append balloon element to chart container
    chartContainerElement.appendChild(balloonElement);

    /* changed event fires when chart cursor position is changed */
    this.mainChart.addListener("changed", e => {
      const selectedData = e.chart.dataProvider[e.index];
      if (selectedData) {
        balloonContent = "<div class='main-chart-balloon' style='font-size:12px;'>"
          + `<span style='font-weight:bold'>${selectedData.date}</span> <br/>`
          + '<table>' + this.availableTypesOrdered.map(type => {
              return `<tr class="main-chart-balloon-item ${type}" style='text-align:left'><td>${type}</td> <td>${selectedData[type]}</td></tr>`;
            }).join(' ') 
          + '</table>'
          + "</div>";
      }
      balloonElement.style.display = 'inline-block';
      balloonElement.innerHTML = balloonContent;
    });

    chartContainerElement.addEventListener('mousemove', e => this.setBalloonPosition(balloonElement, chartContainerElement, e));

    this.mainChart.addListener('rollOverGraphItem', e => {
      console.log(e);
      balloonElement.querySelector(`.main-chart-balloon-item.${e.target.valueField}`).classList.add('selected');
    });

    this.mainChart.chartCursor.addListener('onHideCursor', e => balloonElement.style.display = 'none');
    chartContainerElement.addEventListener('mouseleave', e => balloonElement.style.display = 'none');

  }

  destroyMainChart() {
    this.AmCharts.destroyChart(this.mainChart);
  }

  /**
   * Creates and returns chart configuration object
   * @param {string[]} availableTypes array of available data types represented in main chart
   * @param {any[]}    chartData  array of data to be rendered in main chart
   */
  getMainChartConfiguration(availableTypes: string[], chartData: any[]): { [key: string]: any } {
    this.availableTypesOrdered = this.planTypesOrder.filter(type => availableTypes.indexOf(type) >= 0);

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

    // getting colors property for chart configuration
    const colors = this.availableTypesOrdered.map(type => planColorsMap[type]);

    const graphs = this.availableTypesOrdered.map((type, index) => ({
      // "balloonText": index === 0 ? baloonText : '',
      // "showBalloon": index === 0,
      "showBalloon": false,
      "bullet": "round",
      "bulletSize": 5,
      "fillAlphas": 0.4,
      "id": `graph-${index}`,
      "valueField": type,
      "title": this.mainChartPlanNamesMap[type],
    }));


    return {
      "type": "serial",
      "categoryField": "date",
      "dataDateFormat": "YYYY/MM/DD",
      "autoMarginOffset": 40,
      colors,
      "startEffect": "easeOutSine",
      "sequencedAnimation": false,
      "startDuration": 0.6,
      "fontSize": 13,
      "theme": "default",
      "categoryAxis": {
        "gridPosition": "start",
        "parseDates": true,
        "autoGridCount": false
      },
      "trendLines": [],
      "guides": [],
      graphs,
      "valueAxes": [
        {
          "id": "ValueAxis-1",
          "title": ""
        }
      ],
      "chartCursor": {
        "pan": false,
        // "valueLineEnabled": true,
        // "valueLineBalloonEnabled": true,
        "valueLineEnabled": false,
        "valueLineBalloonEnabled": false,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        // "valueLineAlpha":0.2,
        "valueZoomable":true,
        "oneBalloonOnly": true
      },
      "allLabels": [],
      "balloon": {
        "fixedPosition": false
      },
      "titles": [],
      "dataProvider": chartData
    };
  }

  setBalloonPosition(balloonElement: HTMLElement, chartContainerElement: HTMLElement, e: MouseEvent) {
    let top = e.offsetY - (balloonElement.offsetHeight / 2 - 20);
    let left = e.offsetX + 30;

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
      left -= balloonElement.offsetWidth + balloonElement.offsetWidth / 2 + 10;
    }

    balloonElement.style.top = top + 'px';
    balloonElement.style.left = left + 'px';
  }
}
