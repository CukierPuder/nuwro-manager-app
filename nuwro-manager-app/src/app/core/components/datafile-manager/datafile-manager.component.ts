import { Component, OnInit } from '@angular/core';
import { DatafileService } from 'src/app/shared/services/datafile.service';
import { Datafile } from 'src/app/shared/models/datafile.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';
import { DatafileDialogComponent } from '../../dialogs/datafile-dialog/datafile-dialog.component';
import { ApiEndpoints } from 'src/app/shared/api-endpoints';


@Component({
  selector: 'app-datafile-manager',
  templateUrl: './datafile-manager.component.html',
  styleUrls: ['./datafile-manager.component.css']
})
export class DatafileManagerComponent implements OnInit {
  itemsList: Array<Datafile>;
  columnsToDisplay: string[] = ['filename', 'experiment', 'measurement', 'variable', 'created'];
  dialogRef: MatDialogRef<DatafileDialogComponent>;
  apiEndpoints: ApiEndpoints;

  constructor(
    private datafileService: DatafileService,
    private dialog: MatDialog
  ) { this.apiEndpoints = new ApiEndpoints(); }

  ngOnInit() {
    this.refreshItemsList();
  }

  openCreateNewRecord(): void {
    this.dialogRef = this.dialog.open(DatafileDialogComponent, {
      hasBackdrop: true
    });

    this.dialogRef.afterClosed().pipe(filter(dataFile => dataFile)).subscribe(dataFile => {
      this.datafileService.post(dataFile).subscribe(
        (res) => {
          this.refreshItemsList();
        },
        (err) => {
          // TODO: Display modal that file already exists...
          console.log('File already exists...');
        }
      );
    });
  }

  redirectToFile(clickedItem: Datafile): void {
    window.open(this.apiEndpoints.getHostname() + clickedItem.link);
  }

  private refreshItemsList(): void {
    this.datafileService.getAll().subscribe(
      (res) => {
        this.itemsList = res;
      },
      (err) => {
        // TODO: display a modal error message
      }
    );
  }
}
