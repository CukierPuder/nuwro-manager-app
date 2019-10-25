import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Datafile } from 'src/app/shared/models/datafile.model';
import { Experiment } from 'src/app/shared/models/experiment.model';
import { Measurement } from 'src/app/shared/models/measurement.model';
import { SharedModelService } from 'src/app/shared/services/shared-model.service';


@Component({
  selector: 'app-datafile-dialog',
  templateUrl: './datafile-dialog.component.html',
  styleUrls: ['./datafile-dialog.component.css']
})
export class DatafileDialogComponent implements OnInit {
  experiments: Array<Experiment>;
  measurements: Array<Measurement>;
  fileToUpload: File = null;
  form: FormGroup;

  constructor(
    private sharedModelService: SharedModelService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DatafileDialogComponent>
  ) { }

  ngOnInit() {
    this.fetchAllExperiments();
    this.fetchAllMeasurements();

    this.form = this.formBuilder.group({
      experiment: '',
      measurement: '',
      variable: '',
      xAxis: '',
      yAxis: '',
      file: ''
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  submit(form): void {
    const dataFile: Datafile = new Datafile(
      form.value.experiment,
      form.value.measurement,
      form.value.variable,
      form.value.xAxis,
      form.value.yAxis,
      this.fileToUpload.name,
      this.fileToUpload
    );
    this.dialogRef.close(dataFile);
  }

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

}
