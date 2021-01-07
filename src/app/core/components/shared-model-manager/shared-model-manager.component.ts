import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModelService } from 'src/app/shared/services/shared-model.service';
import { SharedModel } from 'src/app/shared/models/shared-model.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SharedModelDialogComponent } from '../../dialogs/shared-model-dialog/shared-model-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shared-model-manager',
  templateUrl: './shared-model-manager.component.html',
  styleUrls: ['./shared-model-manager.component.css']
})
export class SharedModelManagerComponent implements OnInit {
  columnsToDisplay: string[] = ['id', 'name'];
  recordsList: Array<SharedModel>;
  dialogRef: MatDialogRef<SharedModelDialogComponent>;
  private model: string;

  constructor(
    private router: Router,
    private modelService: SharedModelService,
    private dialog: MatDialog
  ) {
    this.model = this.getMode(router);
  }

  ngOnInit() {
    this.refreshDataArray();
  }

  openCreateNewRecord(recordObj?: SharedModel): void {
    this.dialogRef = this.dialog.open(SharedModelDialogComponent, {
      hasBackdrop: true,
      data: {
        name: recordObj ? recordObj.name : ''
      }
    });

    this.dialogRef
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {
        if (recordObj) {
          this.patchObject(recordObj.id, name);
        } else {
          this.postObject(name);
        }
      });
  }

  refreshDataArray(): void {
    this.modelService.getAll(this.model).subscribe(
      (res) => {
        this.recordsList = res;
      },
      (err) => {
        // TODO: display a modal error message
      }
    );
  }

  postObject(name: string): void {
    this.modelService.post(this.model, name).subscribe(
      (res) => {
        this.refreshDataArray();
      },
      (err) => {
        // TODO: display a modal error message
      }
    );
  }

  patchObject(id: number, name: string) {
    this.modelService.patch(this.model, id, name).subscribe(
      (res) => {
        this.refreshDataArray();
      },
      (err) => {
        // TODO: display a modal error message
      }
    );
  }

  private getMode(router: Router): string {
    if (this.router.url === '/experiment-manager') {
      return 'experiment';
    } else if (this.router.url === '/measurement-manager') {
      return 'measurement';
    } else if (this.router.url === '/nuwroversion-manager') {
      return 'nuwroversion';
    }
  }
}
