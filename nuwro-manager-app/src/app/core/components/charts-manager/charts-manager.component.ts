import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Resultfile } from 'src/app/shared/models/resultfile.model';
import { Experiment } from 'src/app/shared/models/experiment.model';
import { Measurement } from 'src/app/shared/models/measurement.model';
import { SharedModelService } from 'src/app/shared/services/shared-model.service';
import { ResultfileService } from 'src/app/shared/services/resultfile.service';
import { ApiEndpoints } from 'src/app/shared/api-endpoints';
import { ResultfileDataset } from 'src/app/shared/models/resultfile-dataset.model';
import { ChartConfigurations } from '../../../shared/charts/chart-configurations';
import { ChartLayouts } from 'src/app/shared/charts/charts-layouts';

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
  filteredResultfiles: Array<Resultfile>;
  selectedResultfiles: Array<Resultfile>;
  datasets: Array<ResultfileDataset> = [];

  pickedExperiment: Experiment;
  pickedMeasurement: Measurement;

  constructor(
    private sharedModelService: SharedModelService,
    private resultfileService: ResultfileService
  ) { this.apiEndpoints = new ApiEndpoints(); }

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
  }

  drawLineChart(): void {
    this.plotGraph();
  }

  drawBarChart(): void {
    this.plotGraph('bar');
  }

  drawPieChart(): void {
    this.plotGraph('pie', 'pie-layout');
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
    this.resultfileService.downloadFile(this.apiEndpoints.getFileURL(resultfile.link)).subscribe(
      (res) => {
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
    );
  }
  // <<< END OF API REQUESTS HANDLERS

  private parseFileToDataset(filename: string, nuwroversion: string, fileContent: string): ResultfileDataset {
    let x: Array<number> = [];
    let xError: Array<number> = [];
    let y: Array<number> = [];
    let yError: Array<number> = [];

    for (const line of fileContent.split(/[\r\n]+/)) {
      if (line.startsWith('#')) {
        continue;
      }
      let cols = line.split(' ');
      if (cols.length == 2) {
        x.push(parseFloat(cols[0]));
        y.push(parseFloat(cols[1]));
      } else if (cols.length == 3) {
        x.push(parseFloat(cols[0]));
        y.push(parseFloat(cols[1]));
        yError.push(parseFloat(cols[2]));
      } else if (cols.length == 4) {
        x.push(parseFloat(cols[0]));
        y.push(parseFloat(cols[1]));
        xError.push(parseFloat(cols[2]));
        yError.push(parseFloat(cols[3]));
      }
    }
    return new ResultfileDataset(filename, nuwroversion, x, y, yError, xError);
  }

  private plotGraph(type: string = 'scatter', layout: string = 'line-bar-layout'): void {
    const data = [];
    if (type === 'pie') {
      for (const dataset of this.datasets) {
        data.push(dataset.toPieChartDataset(this.datasets.indexOf(dataset), type));
      }
      console.log(data);
      Plotly.newPlot('Graph', data, ChartLayouts[layout]);
    } else {
      for (const dataset of this.datasets) {
        data.push(dataset.toLineBarChartDataset(type));
      }
      Plotly.newPlot('Graph', data, ChartConfigurations['line-chart'], ChartLayouts[layout]);
    }
  }
}
