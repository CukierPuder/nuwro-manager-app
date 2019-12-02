export class ChartConf {
    constructor() { }

    public generateLineBarChartConfig(chartTitle: string, xAxisName: string, yAxisName: string): Object {
        return {
            autoexpand: 'true',
            autosize: 'true',
            margin: {
                autoexpand: 'true',
                margin: 0
            },
            offset: 0,
            type: 'scattergl',
            title: chartTitle,
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
            }
        };
    }

    public generatePieChartConfig(chartTitle: string): Object {
        return {
            autoexpand: 'true',
            autosize: 'true',
            margin: {
                autoexpand: 'true',
                margin: 0
            },
            offset: 0,
            type: 'scattergl',
            title: chartTitle,
            hovermode: 'closest'
        };
    }

    public generateScatter3dChartConfig(): Object {
        return {
            autoexpand: 'true',
            autosize: 'true',
            margin: {
                autoexpand: 'true',
                margin: 0
            },
            offset: 0,
            type: 'scattergl',
            hovermode: 'closest'
        };
    }
}
