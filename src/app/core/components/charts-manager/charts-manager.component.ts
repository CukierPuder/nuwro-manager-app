import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Resultfile } from 'src/app/shared/models/resultfile.model';
import { Experiment } from 'src/app/shared/models/experiment.model';
import { Measurement } from 'src/app/shared/models/measurement.model';
import { SharedModelService } from 'src/app/shared/services/shared-model.service';
import { ResultfileService } from 'src/app/shared/services/resultfile.service';
import { ApiEndpoints } from 'src/app/shared/api-endpoints';
import { ResultfileDataset } from 'src/app/shared/models/resultfile-dataset.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ChartLayout } from 'src/app/shared/charts/charts-layouts';

declare var Plotly: any;

@Component({
  selector: 'app-charts-manager',
  templateUrl: './charts-manager.component.html',
  styleUrls: ['./charts-manager.component.css']
})
export class ChartsManagerComponent implements OnInit {
  private apiEndpoints: ApiEndpoints;

  experiments: Array<Experiment>;
  measurements: Array<Measurement>;
  pickedExperiment: Experiment;
  pickedMeasurement: Measurement;
  filteredResultfiles: Array<Resultfile>;
  selectedResultfiles: Array<Resultfile>;
  datasets: Array<ResultfileDataset> = [];
  is3D: boolean = true;
  chartLayout: ChartLayout;

  constructor(private sharedModelService: SharedModelService,
              private resultfileService: ResultfileService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer
  ) {
    this.apiEndpoints = new ApiEndpoints();
    this.chartLayout = new ChartLayout();

    iconRegistry.addSvgIcon(
      'line-chart-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/line-chart-icon.svg')
    );
    iconRegistry.addSvgIcon(
      'bar-chart-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/bar-chart-icon.svg')
    );
    iconRegistry.addSvgIcon(
      'pie-chart-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/pie-chart-icon.svg')
    );
  }

  ngOnInit() {
    this.fetchFilters();
    this.plotGraph();
  }

  // >>> EVENT HANDLERS
  onExperimentChange(event): void {
    this.pickedExperiment = event.value;
    this.fetchFilteredResultfiles();
  }

  onMeasurementChange(event): void {
    this.pickedMeasurement = event.value;
    this.fetchFilteredResultfiles();
  }

  onResultfilesChange(event): void {
    this.selectedResultfiles = [];
    for (const file of event.value) {
      this.selectedResultfiles.push(file);
    }
  }

  redrawChart(): void {
    this.datasets = [];
    for (const resultfile of this.selectedResultfiles) {
      this.downloadFile(resultfile);
    }
    this.is3D = this.selectedResultfiles[0].is_3d ? true : false;
  }

  drawLineChart(): void {
    this.plotGraph();
  }

  drawBarChart(): void {
    this.plotGraph('bar');
  }

  drawPieChart(): void {
    this.plotGraph('pie');
  }

  drawScatter3d(): void {
    this.plotGraph('scatter3d');
  }

  drawSurface3d(): void {
    this.plotGraph('surface3d');
  }

  drawLine3d(): void {
    this.plotGraph('line3d');
  }
  // <<< END OF EVENT HANDLERS

  // >>> API REQUESTS HANDLERS
  private fetchAllExperiments(): void {
    this.sharedModelService.getAll('experiment').subscribe(
      (res) => { this.experiments = res; }
    );
  }

  private fetchAllMeasurements(): void {
    this.sharedModelService.getAll('measurement').subscribe(
      (res) => { this.measurements = res; }
    );
  }

  private fetchFilters(): void {
    /* fetches all Experiment and Measurements objects from API */
    this.fetchAllExperiments();
    this.fetchAllMeasurements();
  }

  private fetchFilteredResultfiles(): void {
    /* fetches Resultfiles iltered by Experiment and Measurement */
    if (this.pickedExperiment != null && this.pickedMeasurement != null) {
      this.resultfileService.filter(this.pickedExperiment, this.pickedMeasurement).subscribe(
        (res) => { this.filteredResultfiles = res; }
      );
    }
  }

  private downloadFile(resultfile: Resultfile): void {
    /* downloads the textfiles (represented by -link- field in Resultfile objects) from server */
    console.log(resultfile.link);
    this.resultfileService.downloadFile(this.apiEndpoints.getFileURL(resultfile.link)).subscribe(
      (res) => {
        if (!resultfile.is_3d) {
          const dataset = this.parseFileToDataset(
            resultfile.filename,
            resultfile.nuwroversion.name,
            res.toString()
          );
          if (!this.datasets.includes(dataset)) {
            this.datasets.push(dataset);
          }
          Plotly.purge('Graph');
          this.plotGraph();
        }
        else {
          const dataset = this.parseFileToDataset(
            resultfile.filename,
            resultfile.nuwroversion.name,
            res.toString()
          );
          if (!this.datasets.includes(dataset)) {
            this.datasets.push(dataset);
          }
          Plotly.purge('Graph');
          this.plotGraph('scatter3d');
        }
      }
    );
  }
  // <<< END OF API REQUESTS HANDLERS

  private parseFileToDataset(filename: string, nuwroversion: string, fileContent: string): ResultfileDataset {
    let headers: Array<string> = [];
    let axes_names: Array<string> = [];
    let x_axis_name: string = 'X';
    let y_axis_name: string = 'Y';
    let z_axis_name: string = 'Z';
    let x: Array<number> = [];
    let xError: Array<number> = [];
    let y: Array<number> = [];
    let yError: Array<number> = [];
    let z: Array<number> = [];
    let zError: Array<number> = [];

    for (const line of fileContent.split(/[\r\n]+/)) {
      if (line.startsWith('## ')) { headers = line.substring(3).split(' '); }
      if (line.startsWith('# ')) { axes_names = line.substring(2).split(' '); }
      if (line === '' || line.length < 1) { continue; }
      let cols = line.split(' ');

      if (headers.indexOf('x') >= 0) {
        let index: number = headers.indexOf('x');
        x.push(parseFloat(cols[index]));
      }
      if (headers.indexOf('xe') >= 0) {
        let index: number = headers.indexOf('xe');
        xError.push(parseFloat(cols[index]));
      }
      if (headers.indexOf('y') >= 0) {
        let index: number = headers.indexOf('y');
        y.push(parseFloat(cols[index]));
      }
      if (headers.indexOf('ye') >= 0) {
        let index: number = headers.indexOf('ye');
        yError.push(parseFloat(cols[index]));
      }
      if (headers.indexOf('z') >= 0) {
        let index: number = headers.indexOf('z');
        z.push(parseFloat(cols[index]));
      }
      if (headers.indexOf('ze') >= 0) {
        let index: number = headers.indexOf('ze');
        zError.push(parseFloat(cols[index]));
      }
    }

    if (headers.indexOf('x') >= 0) { x_axis_name = axes_names[headers.indexOf('x')]; }
    if (headers.indexOf('y') >= 0) { y_axis_name = axes_names[headers.indexOf('y')]; }
    if (headers.indexOf('z') >= 0) { z_axis_name = axes_names[headers.indexOf('z')]; }

    console.log(x);
    console.log(y);
    console.log(z);

    console.log(yError);
    console.log(xError);
    console.log(zError);

    return new ResultfileDataset(filename, nuwroversion, x, x_axis_name, y, y_axis_name, z, z_axis_name, yError, xError, zError);
  }

  private plotGraph(type: string = 'scatter'): void {
    const data = [];
    if (type === 'pie') {
      for (const dataset of this.datasets) {
        data.push(dataset.toPieChartDataset(this.datasets.indexOf(dataset)));
      }
      Plotly.newPlot('Graph', data, this.chartLayout.generatePieChartLayout());
    } else if (type === 'scatter' || type === 'bar') {
      for (const dataset of this.datasets) {
        data.push(dataset.toLineBarChartDataset(type));
      }
      Plotly.newPlot('Graph', data,this.chartLayout.generateLineBarChartLayout('Line/Bar Chart', this.datasets[0].x_axis_name, this.datasets[0].y_axis_name));
    } else if (type === 'scatter3d') {
      for (const dataset of this.datasets) {
        data.push(dataset.toScatter3dChartDataset(type));
      }
      Plotly.newPlot('Graph', data, this.chartLayout.generateScatter3dChartLayout('Scatter 3D Chart', this.datasets[0].x_axis_name, this.datasets[0].y_axis_name, this.datasets[0].z_axis_name));
    } else if (type === 'line3d') {
      for (const dataset of this.datasets) {
        data.push(dataset.to3dLineChartDataset());
      }
      Plotly.newPlot('Graph', data, this.chartLayout.generateScatter3dChartLayout('Line 3D Chart', this.datasets[0].x_axis_name, this.datasets[0].y_axis_name, this.datasets[0].z_axis_name));
    } else if (type === 'surface3d') {
      for (const dataset of this.datasets) {
        data.push(dataset.to3dSurfaceChartDataset());
      }
      Plotly.newPlot('Graph', [
        {z: [
          [27.80985, 49.61936, 83.08067, 116.6632, 130.414, 150.7206, 220.1871, 156.1536, 148.6416, 203.7845],
          [27.71966, 48.55022, 65.21374, 95.27666, 116.9964, 133.9056, 152.3412, 151.934, 160.1139, 179.5327],
          [30.4267, 33.47752, 44.80953, 62.47495, 77.43523, 104.2153, 102.7393, 137.0004, 186.0706, 219.3173],
          [16.66549, 30.1086, 39.96952, 44.12225, 59.57512, 77.56929, 106.8925, 166.5539, 175.2381, 185.2815],
          [8.815617, 18.3516, 8.658275, 27.5859, 48.62691, 60.18013, 91.3286, 145.7109, 116.0653, 106.2662],
          [6.628881, 10.41339, 24.81939, 26.08952, 30.1605, 52.30802, 64.71007, 76.30823, 84.63686, 99.4324],
          [21.83975, 6.63927, 18.97085, 32.89204, 43.15014, 62.86014, 104.6657, 130.2294, 114.8494, 106.9873],
          [53.34303, 26.79797, 6.63927, 10.88787, 17.2044, 56.18116, 79.70141, 90.8453, 98.27675, 80.87243],
          [25.66785, 63.05717, 22.1414, 17.074, 41.74483, 60.27227, 81.42432, 114.444, 102.3234, 101.7878],
          [12.827, 69.20554, 46.76293, 13.96517, 33.88744, 61.82613, 84.74799, 121.122, 145.2741, 153.1797]
        ], type: 'surface'}
      ], this.chartLayout.generateScatter3dChartLayout('Surface 3D Chart', this.datasets[0].x_axis_name, this.datasets[0].y_axis_name, this.datasets[0].z_axis_name));
    }
  }
}
