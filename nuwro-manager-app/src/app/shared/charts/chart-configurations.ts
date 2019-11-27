export const ChartConfigurations = {
  'line-chart': {
    autoexpand: 'true',
    autosize: 'true',
    width: window.innerWidth - 200,
    margin: {
      autoexpand: 'true',
      margin: 0
    },
    offset: 0,
    type: 'scattergl',
    title: 'Title of the graph',
    hovermode: 'closest',
    xaxis: {
      linecolor: 'black',
      linewidth: 2,
      mirror: true,
      title: 'Time (s)',
      automargin: true
    },
    yaxis: {
      linecolor: 'black',
      linewidth: 2,
      mirror: true,
      automargin: true,
      title: 'Any other Unit'
    }
  }
};
