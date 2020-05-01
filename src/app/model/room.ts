export class Room {
  id: number;
  name: string;


  constructor(label: string, id?: number) {
    if (id !== undefined) {
      this.id = id;
    }
    this.name = label;
  }
}
