import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-shared-model-dialog',
  templateUrl: './shared-model-dialog.component.html',
  styleUrls: ['./shared-model-dialog.component.css']
})
export class SharedModelDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SharedModelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.data ? this.data.name : ''
    });
  }

  submit(form): void {
    this.dialogRef.close(`${form.value.name}`);
  }
}
