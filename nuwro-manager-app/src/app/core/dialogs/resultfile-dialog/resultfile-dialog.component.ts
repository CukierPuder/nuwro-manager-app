import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckbox } from '@angular/material';

import { Datafile } from 'src/app/shared/models/datafile.model';
import { Experiment } from 'src/app/shared/models/experiment.model';
import { Measurement } from 'src/app/shared/models/measurement.model';
import { SharedModelService } from 'src/app/shared/services/shared-model.service';
import { Nuwroversion } from 'src/app/shared/models/nuwroversion.model';
import { Resultfile } from 'src/app/shared/models/resultfile.model';
import { DatafileService } from 'src/app/shared/services/datafile.service';

@Component({
  selector: 'app-resultfile-dialog',
  templateUrl: './resultfile-dialog.component.html',
  styleUrls: ['./resultfile-dialog.component.css']
})
export class ResultfileDialogComponent implements OnInit {
  experiments: Array<Experiment>;
  measurements: Array<Measurement>;
  nuwroversions: Array<Nuwroversion>;
  relatedDatafiles: Array<Datafile>;
  form: FormGroup;
  is3D: boolean = false;
  submitButtonDisabled: boolean = true;
  @ViewChild('is3dCheckbox', { static: true }) is3dCheckbox: MatCheckbox;

  fileToUpload: File = null;
  pickedExperiment: Experiment;
  pickedMeasurement: Measurement;

  constructor(
    private sharedModelService: SharedModelService,
    private datafileService: DatafileService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ResultfileDialogComponent>
  ) { }

  ngOnInit() {
    this.fetchAllExperiments();
    this.fetchAllMeasurements();
    this.fetchAllNuwroversions();

    this.form = this.formBuilder.group({
      experiment: '',
      measurement: '',
      nuwroversion: '',
      description: '',
      xAxis: '',
      yAxis: '',
      relatedDatafiles: '',
      file: ''
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.onRequiredFieldChange();
  }

  submit(form): void {
    const resultfile: Resultfile = new Resultfile(
      form.value.experiment,
      form.value.measurement,
      form.value.nuwroversion,
      this.is3dCheckbox.checked,
      form.value.description,
      form.value.xAxis,
      form.value.yAxis,
      this.fileToUpload.name,
      this.fileToUpload,
      form.value.relatedDatafiles
    );
    this.dialogRef.close(resultfile);
  }

  onExperimentChange(event): void {
    this.pickedExperiment = event.value;
    this.fetchRelatedDatafiles();
    this.onRequiredFieldChange();
  }

  onMeasurementChange(event): void {
    this.pickedMeasurement = event.value;
    this.fetchRelatedDatafiles();
    this.onRequiredFieldChange();
  }

  onRequiredFieldChange(): void {
    if (this.form.value.experiment &&
        this.form.value.measurement &&
        this.form.value.nuwroversion &&
        this.form.value.xAxis &&
        this.form.value.yAxis &&
        this.fileToUpload &&
        this.form.value.relatedDatafiles.length > 0) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
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

  private fetchAllNuwroversions(): void {
    this.sharedModelService.getAll('nuwroversion').subscribe(
      (res) => { this.nuwroversions = res; }
    );
  }

  private fetchRelatedDatafiles(): void {
    if (this.pickedExperiment != null && this.pickedMeasurement != null) {
      this.datafileService.filter(this.pickedExperiment, this.pickedMeasurement).subscribe(
        (res) => { this.relatedDatafiles = res; }
      );
    }
  }
}
