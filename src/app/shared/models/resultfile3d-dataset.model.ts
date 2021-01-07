export class Resultfile3dDataset {
  constructor(
    public filename: string,
    public nuwroversion: string,
    public x: Array<number>,
    public y: Array<number>,
    public z: Array<number>,
    public xErr: Array<number>,
    public yErr: Array<number>,
    public zErr: Array<number>
  ) { }

  public toScatter3dChartDataset(chartType: string = 'scatter3d'): Object {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
      mode: 'markers',
      type: chartType,
      marker: {
        size: 5,
        opacity: 0.8,
        line: {
          color: 'rgb(200, 200, 200)',
          width: 0.5
        }
      }
    }
  }
}
