export class SharedModel {
  constructor(public id: number = 0, public name: string) { }

  public toString(): string {
    return this.name;
  }
}
