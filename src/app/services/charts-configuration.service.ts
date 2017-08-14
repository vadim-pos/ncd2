import { Injectable } from '@angular/core';

@Injectable()
export class ChartsConfigurationService {

  constructor() { }

  getMainChartConfiguration(availableTypes: string[], mainChartData: any[]): { [key: string]: any } {
    // the order in which the plans should follow in the chart
    const planTypesOrder = ["phone", "email", "name_address", "fraud", "profile", "cra", "p3", "validate"];
    // available plan types for current user in correct order
    const availableTypesOrdered = planTypesOrder.filter(type => availableTypes.indexOf(type) >= 0);

    const planNamesMap = {
      phone: "Phone ID",
      fraud: 'Fraud ID',
      email: 'Email ID',
      cra: 'CRA ID',
      p3: 'P3 ID',
      validate: 'Validate',
      profile: 'Profile ID',
      name_address: 'Name & Address ID'
    };

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

    // getting graphs colors property
    const colors = availableTypesOrdered.map(type => planColorsMap[type]);
    // getting a single baloon property, which should be displayed for only first one graph
    // check out for details https://www.amcharts.com/kbase/showing-only-one-balloon-for-all-graphs/
    const baloonText = "<div style='font-size:12px; color:#000000;'>"
      + "<span style='font-weight:bold'>[[date]]</span> <br/>"
      + '<table>' + availableTypesOrdered.map((type, index) => `<tr style='text-align:left'><td>${planNamesMap[type]}</td>  <td>[[${type}]]</td></tr>`).join(' ') + '</table>'
      + "</div>";

    const graphs = availableTypesOrdered.map((type, index) => ({
      "balloonText": index === 0 ? baloonText : '',
      "showBalloon": index === 0,
      "bullet": "round",
      "bulletSize": 5,
      "fillAlphas": 0.4,
      "id": `graph-${index}`,
      "valueField": type,
      "title": planNamesMap[type],
    }));

    return {
      "type": "serial",
      "categoryField": "date",
      "dataDateFormat": "YYYY/MM/DD",
      "autoMarginOffset": 40,
      colors,
      "startEffect": "easeOutSine",
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
      "allLabels": [],
      "balloon": {},
      "titles": [],
      "dataProvider": mainChartData
    };
  }

}
