
export class Artifact {
    constructor(
        public resultfile: number,
        public filename: string,
        public artifact: File,
        public link?: string,
        public addition_date?: Date,
        public id?: number
    ) { }

    public toString(): string {
        return this.filename;
    }
}
