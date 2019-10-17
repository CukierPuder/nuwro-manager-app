import { SharedModel } from './shared-model.model';

export class Measurement extends SharedModel {
  constructor(id: number, name: string) {
    super(id, name);
  }
}
