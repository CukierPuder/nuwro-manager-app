import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArtifactService } from 'src/app/shared/services/artifact.service';
import { Artifact } from 'src/app/shared/models/artifact.model';
import { ApiEndpoints } from 'src/app/shared/api-endpoints';
import { ResultfileService } from 'src/app/shared/services/resultfile.service';

@Component({
  selector: 'app-artifacts-dialog',
  templateUrl: './artifacts-dialog.component.html',
  styleUrls: ['./artifacts-dialog.component.css']
})
export class ArtifactsDialogComponent implements OnInit {
  public title: string;
  public resultfileId: number;
  public mode: string = 'artifact';
  public artifacts: Array<Artifact> = [];
  public downloadHost: string;

  private apiEndpoints: ApiEndpoints;

  constructor(private artifactService: ArtifactService,
              private resultfileService: ResultfileService,
              private dialogRef: MatDialogRef<ArtifactsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data) {
    this.apiEndpoints = new ApiEndpoints();
    this.downloadHost = this.apiEndpoints.getHostname();
  }

  ngOnInit() {
    if (this.data) {
      this.resultfileId = this.data.id;
      this.title = this.data.resultfileName;
    }
    this.fetchArtifacts();
  }

  private fetchArtifacts(): void {
    this.artifactService.getRelatedArtifacts(this.resultfileId).subscribe(
      (res) => {
        this.artifacts = res;
        console.log(res);
      },
      (err) => {
        // TODO: display a modal error message
      }
    )
  }

  private deleteResultfile(): void {
    this.resultfileService.deleteFile(this.resultfileId).subscribe(
      (res) => {},
      (err) => {}
    )
    this.dialogRef.close();
  }

  public redirectToFile(artifactLink: string): void {
    window.open(this.apiEndpoints.getHostname() + artifactLink);
  }

}
