export class ChartLayout {
  constructor() { }

  public generateLineBarChartLayout(): Object {
    return {
      responsive: true,
      scrollZoom: true
    };
  }

  public generatePieChartLayout(): Object {
    return {
      grid: {
        rows: 2,
        columns: 2
      }
    };
  }

  public generateScatter3dChartLayout(xAxisName: string, yAxisName: string, zAxisName: string) {
    return {
      title: "Custom chart title",
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