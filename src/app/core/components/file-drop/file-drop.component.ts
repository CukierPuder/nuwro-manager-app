import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ArtifactService } from 'src/app/shared/services/artifact.service';
import { Artifact } from 'src/app/shared/models/artifact.model';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.css']
})
export class FileDropComponent implements OnInit {
  @Input() mode?: string;
  @Input() resultfileId?: number;
  @Output() uploaded: EventEmitter<void> = new EventEmitter();
  files: NgxFileDropEntry[] = [];
  requiredProps: string[] = ['experiment', 'measurement', 'app_version', 'is3d', 'x_axis_name', 'y_axis_name', 'z_axis_name'];

  constructor(private artifactService: ArtifactService) { }

  ngOnInit() {
    console.log(this.mode);
    console.log(this.resultfileId);
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (this.mode === 'artifact') {
            this.artifactMode(file);
          } else {
            this.resultfileMode(file);
          }
        });
      } else {
        // TODO: check nested dirs recursively
      }
    }
  }

  public artifactMode(file: File) {
    if (this.resultfileId) {
      this.artifactService.post(new Artifact(
        this.resultfileId,
        file.name,
        file
      )).subscribe(
        (res) => {
          this.uploaded.emit();
        },
        (err) => {
          // TODO: display a modal error message
        }
      );
    }
  }

  public resultfileMode(file: File): void {
    this.checkFile(file);
  }

  async checkFile(inputFile: File) {
    try {
      const droppedFile = await this.readFileProperties(inputFile);
      console.log(droppedFile);
    } catch (err) {
      console.warn(err.message);
    }
  }

  readFileProperties(inputFile: File): Promise<DroppedFile> {
    const tmpFileReader = new FileReader();
    let fileProps: { [id: string]: string } = {
      experiment: null,
      measurement: null,
      app_version: null,
      is3d: null,
      description: null,
      x_axis_name: null,
      y_axis_name: null,
      z_axis_name: null
    };

    return new Promise((resolve, reject) => {
      tmpFileReader.onerror = () => {
        tmpFileReader.abort();
        reject(new DroppedFile(null, null));
      }
      tmpFileReader.onload = () => {
        const fileContents = tmpFileReader.result as string;

        for (const line of fileContents.split(/[\r\n]+/)) {
          if (line.startsWith('#')) {
            const splittedLine = line.split(' ');
            console.log('SPLITTED LINE: ' + splittedLine);
            if (splittedLine.length <= 3) {
              console.log('More data required in this line');
              continue;
            }
            if (this.requiredProps.includes(splittedLine[1]) && splittedLine[3]) {
              console.log('Parse this line');
              fileProps[splittedLine[1]] = splittedLine[3];
            } else {
              console.log('I ommit this line');
            }
          } else {
            break;
          }
        }
        resolve(new DroppedFile(inputFile, fileProps));
      }

      tmpFileReader.readAsText(inputFile);
    })
  }
}


class DroppedFile {
  /**
   * This class is use to store the file verification state.
   * Each file dropped in drop-area needs to be verified and send to the server
   * or hold, to let user fill required fields
   */
  constructor(
    public file: File,
    public properties: Object
  ) { }
}
