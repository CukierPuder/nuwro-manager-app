export class ResultfileDataset {
  constructor(
    public filename: string,
    public nuwroversion: string,
    public x: Array<number>,
    public y: Array<number>,
    public yError?: Array<number>,
    public xError?: Array<number>
  ) { }

  public toLineBarChartDataset(type: string = 'scatter'): Object {
    return {
      type: type,
      name: this.filename + '\t' + this.nuwroversion,
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

  public toPieChartDataset(indexInArray: number, chartType: string = 'pie'): Object {
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
      type: chartType,
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
}
