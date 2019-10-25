import { Experiment } from './experiment.model';
import { Measurement } from './measurement.model';

export class Datafile {
  constructor(
    public experiment: Experiment,
    public measurement: Measurement,
    public variable: string,
    public x_axis: string,
    public y_axis: string,
    public filename: string,
    public input_file: File,
    public link?: string,
    public creation_date?: Date,
    public id?: number
  ) { }

  public toString(): string {
    return this.filename;
  }
}
