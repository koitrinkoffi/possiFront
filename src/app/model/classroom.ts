export class Classroom {
  private _id: number;
  private _label: string;


  constructor(label: string, id?: number) {
    if (id !== undefined) {
      this._id = id;
    }
    this._label = label;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }
}
