export class User {
  private _firstName: string;
  private _lastName: string;
  private _role: string;

  constructor(firstName: string, lastName: string, role: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._role = role;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }


  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }
}
