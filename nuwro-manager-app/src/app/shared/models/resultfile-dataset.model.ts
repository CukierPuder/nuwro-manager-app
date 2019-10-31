export class ResultfileDataset {
    constructor(
        public filename: string,
        public nuwroversion: string,
        public x: Array<number>,
        public y: Array<number>,
        public yError?: Array<number>,
        public xError?: Array<number>
    ) { }

    public toChartDataset(): Object {
        return {
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
            type: 'scatter'
        };
    }
}
