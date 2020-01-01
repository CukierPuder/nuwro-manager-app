import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';

import { Resultfile } from 'src/app/shared/models/resultfile.model';
import { ApiEndpoints } from 'src/app/shared/api-endpoints';
import { ArtifactsDialogComponent } from '../../dialogs/artifacts-dialog/artifacts-dialog.component';
import { ResultfileService } from 'src/app/shared/services/resultfile.service';

@Component({
  selector: 'app-artifact-manager',
  templateUrl: './artifact-manager.component.html',
  styleUrls: ['./artifact-manager.component.css']
})
export class ArtifactManagerComponent implements OnInit {
  itemsList: Array<Resultfile>;
  columnsToDisplay: string[] = ['filename', 'experiment', 'measurement', 'nuwroversion'];
  dialogRef: MatDialogRef<ArtifactsDialogComponent>;
  apiEndpoints: ApiEndpoints;

  constructor(
    private resultfileService: ResultfileService,
    private dialog: MatDialog
  ) { this.apiEndpoints = new ApiEndpoints(); }

  ngOnInit() {
    this.refreshItemsList();
  }

  displayArtifactsDialog(clickedItem: Resultfile): void {
    this.dialogRef = this.dialog.open(ArtifactsDialogComponent, {
      hasBackdrop: true,
      data: {
        id: clickedItem.id,
        resultfileName: clickedItem.filename,
      }
    });
  }

  private refreshItemsList(): void {
    this.resultfileService.getAll().subscribe(
      (res) => {
        this.itemsList = res;
      },
      (err) => {
        console.log('Could not fetch the data from API');
        // TODO: display a modal error message
      }
    );
  }

}
