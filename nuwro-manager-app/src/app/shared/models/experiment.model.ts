import { SharedModel } from './shared-model.model';

export class Experiment extends SharedModel {
  constructor(id: number, name: string) {
    super(id, name);
  }
}
