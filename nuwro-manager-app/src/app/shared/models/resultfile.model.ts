import { Experiment } from './experiment.model';
import { Measurement } from './measurement.model';
import { Nuwroversion } from './nuwroversion.model';

export class Resultfile {
  constructor(
    public experiment: Experiment,
    public measurement: Measurement,
    public nuwroversion: Nuwroversion,
    public is_3d: boolean,
    public description: string,
    public filename: string,
    public result_file: File,
    public link?: string,
    public creation_date?: Date,
    public id?: number
  ) { }

  public toString(): string {
    return this.filename;
  }

  public is3dToString(): string {
    if (this.is_3d) {
      return 'True';
    }
    return 'False';
  }

  public getId(): string {
    return this.id.toString();
  }
}
