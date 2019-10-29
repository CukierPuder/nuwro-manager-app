import { Experiment } from './experiment.model';
import { Measurement } from './measurement.model';
import { Nuwroversion } from './nuwroversion.model';
import { Datafile } from './datafile.model';

export class Resultfile {
  constructor(
    public experiment: Experiment,
    public measurement: Measurement,
    public nuwroversion: Nuwroversion,
    public description: string,
    public x_axis: string,
    public y_axis: string,
    public filename: string,
    public result_file: File,
    public related_datafiles: Array<Datafile>,
    public link?: string,
    public creation_date?: Date,
    public id?: number
  ) { }

  public toString(): string {
    return this.filename;
  }

  public getArrayOfDatafileIds(): Array<number> {
    const ids: Array<number> = [];
    for (let datafile of this.related_datafiles) {
      ids.push(datafile.id);
    }

    return ids;
  }
}
