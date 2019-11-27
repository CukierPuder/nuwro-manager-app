import { Component, OnInit } from '@angular/core';
import { Resultfile } from 'src/app/shared/models/resultfile.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';
import { ApiEndpoints } from 'src/app/shared/api-endpoints';
import { ResultfileService } from 'src/app/shared/services/resultfile.service';
import { ResultfileDialogComponent } from '../../dialogs/resultfile-dialog/resultfile-dialog.component';


@Component({
  selector: 'app-resultfile-manager',
  templateUrl: './resultfile-manager.component.html',
  styleUrls: ['./resultfile-manager.component.css']
})
export class ResultfileManagerComponent implements OnInit {
  itemsList: Array<Resultfile>;
  columnsToDisplay: string[] = ['filename', 'experiment', 'measurement', 'nuwroversion', 'is_3d', 'created'];
  dialogRef: MatDialogRef<ResultfileDialogComponent>;
  apiEndpoints: ApiEndpoints;

  constructor(
    private resultfileService: ResultfileService,
    private dialog: MatDialog
  ) { this.apiEndpoints = new ApiEndpoints(); }

  ngOnInit() {
    this.refreshItemsList();
  }

  openCreateNewRecord(): void {
    this.dialogRef = this.dialog.open(ResultfileDialogComponent, {
      hasBackdrop: true
    });

    this.dialogRef.afterClosed().pipe(filter(resultfile => resultfile)).subscribe(resultfile => {
      this.resultfileService.post(resultfile).subscribe(
        (res) => {
          this.refreshItemsList();
        },
        (err) => {
          // TODO: Display modal-info that file already exists...
        }
      );
    });
  }

  private refreshItemsList(): void {
    this.resultfileService.getAll().subscribe(
      (res) => {
        this.itemsList = res;
      },
      (err) => {
        // TODO: display a modal error message
      }
    );
  }
}
