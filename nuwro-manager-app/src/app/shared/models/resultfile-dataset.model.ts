export class ResultfileDataset {
  constructor(
    public filename: string,
    public nuwroversion: string,
    public x: Array<number>,
    public x_axis_name: string,
    public y: Array<number>,
    public y_axis_name: string,
    public z?: Array<number>,
    public z_axis_name?: string,
    public yError?: Array<number>,
    public xError?: Array<number>,
    public zError?: Array<number>
  ) { }

  public toLineBarChartDataset(chartType: string = 'scatter'): Object {
    return {
      type: chartType,
      name: this.nuwroversion,
      x: this.x,
      y: this.y,
      error_y: {
        type: 'data',
        array: this.yError,
        visible: true
      },
      error_x: {
        type: 'data',
        array: this.xError,
        visible: true
      },
    };
  }

  public toPieChartDataset(indexInArray: number): Object {
    let chartCol = 0;
    let chartRow = 0;

    if (indexInArray === 0) {
      chartRow = 0;
      chartCol = 0;
    } else if (indexInArray === 1) {
      chartRow = 0;
      chartCol = 1;
    } else if (indexInArray === 2) {
      chartRow = 1;
      chartCol = 0;
    } else if (indexInArray === 3) {
      chartRow = 1;
      chartCol = 1;
    }

    return {
      values: this.y,
      labels: this.x,
      type: 'pie',
      name: this.nuwroversion,
      marker: {
        colors: ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)']
      },
      domain: {
        row: chartRow,
        column: chartCol
      },
      hoverinfo: 'label+percent+name',
      textinfo: 'none'
    }
  }

  public toScatter3dChartDataset(chartType: string = 'scatter3d'): Object {
    return {
      name: this.nuwroversion,
      x: this.x,
      y: this.y,
      z: this.z,
      error_x: {
        type: 'data',
        array: this.xError,
        visible: true
      },
      error_y: {
        type: 'data',
        array: this.yError,
        visible: true
      },
      error_z: {
        type: 'data',
        array: this.zError,
        visible: true
      },
      mode: 'markers',
      type: chartType,
      marker: {
        size: 5,
        opacity: 0.8,
        line: {
          width: 0.5
        }
      }
    }
  }

  public to3dLineChartDataset(): Object {
    return {
      name: this.nuwroversion,
      type: 'scatter3d',
      mode: 'lines',
      x: this.x,
      y: this.y,
      z: this.z,
      error_x: {
        type: 'data',
        array: this.xError,
        visible: true
      },
      error_y: {
        type: 'data',
        array: this.yError,
        visible: true
      },
      error_z: {
        type: 'data',
        array: this.zError,
        visible: true
      },
      opacity: 1,
      line: {
        width: 6,
        reversescale: false
      }
    };
  }

  public to3dSurfaceChartDataset(): Object {
    return {
      name: this.nuwroversion,
      z: this.z,
      type: 'surface'
    }
  }
}
