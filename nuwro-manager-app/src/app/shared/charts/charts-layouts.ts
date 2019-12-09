export class ChartLayout {
  constructor() { }

  public generateLineBarChartLayout(
    chartTitle: string = 'Line/Bar chart title',
    xAxisName: string = 'X AXIS NAME',
    yAxisName: string = 'Y AXIS NAME'
  ): Object {
    return {
      title: chartTitle,
      type: 'scattergl',
      autoexpand: 'true',
      autosize: 'true',
      margin: {
        autoexpand: 'true',
        margin: 0
      },
      offset: 0,
      hovermode: 'closest',
      xaxis: {
        linecolor: 'black',
        linewidth: 2,
        mirror: true,
        title: xAxisName,
        automargin: true
      },
      yaxis: {
        linecolor: 'black',
        linewidth: 2,
        mirror: true,
        automargin: true,
        title: yAxisName
      },
      responsive: true,
      scrollZoom: true
    };
  }

  public generatePieChartLayout(chartTitle: string = 'Chart title'): Object {
    return {
      title: chartTitle,
      type: 'scattergl',
      autoexpand: 'true',
      autosize: 'true',
      margin: {
        autoexpand: 'true',
        margin: 0
      },
      offset: 0,
      hovermode: 'closest',
      grid: {
        rows: 2,
        columns: 2
      }
    };
  }

  public generateScatter3dChartLayout(
    chartTitle: string = 'Chart title',
    xAxisName: string = 'X AXIS NAME',
    yAxisName: string = 'Y AXIS NAME',
    zAxisName: string = 'Z AXIS NAME'
  ): Object {
    return {
      title: chartTitle,
      autoexpand: 'true',
      autosize: 'true',
      margin: {
        autoexpand: 'true',
        margin: 0
      },
      offset: 0,
      scene: {
        xaxis: {
          title: xAxisName
        },
        yaxis: {
          title: yAxisName
        },
        zaxis: {
          title: zAxisName
        }
      }
    };
  }
}