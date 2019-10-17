import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModelService } from 'src/app/shared/services/shared-model.service';
import { SharedModel } from 'src/app/shared/models/shared-model.model';

@Component({
  selector: 'app-shared-model-manager',
  templateUrl: './shared-model-manager.component.html',
  styleUrls: ['./shared-model-manager.component.css']
})
export class SharedModelManagerComponent implements OnInit {
  objectsList: Array<SharedModel>;
  private model: string;

  constructor(private router: Router, private modelService: SharedModelService) {
    this.model = this.getMode(router);
  }

  ngOnInit() {
    this.fetchAllRecords();
  }

  fetchAllRecords(): void {
    this.modelService.getAll(this.model).subscribe(
      (res) => {
        this.objectsList = res;
        console.log(this.objectsList);
      },
      (err) => {
        // TODO: display a modal error message
      }
    );
  }

  fetchParticularRecord(id: number): void {
    this.modelService.get(this.model, id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        // TODO: display a modal error message
      }
    );
  }

  postNewRecord(): void {
    // TODO: refactor this function to take the entry data from modal window's form
    let name: string;
    if (this.model === 'experiment') {
      name = 'MINERvC';
    } else if (this.model === 'measurement') {
      name = 'CC0xx';
    } else if (this.model === 'nuwroversion') {
      name = 'v3.0';
    }

    const modelInstance = new SharedModel(0, name);
    this.modelService.post(this.model, modelInstance).subscribe(
      (res) => {
        console.log(res);
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
