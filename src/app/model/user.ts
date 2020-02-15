export class User {
  private _firstName: string;
  private _lastName: string;
  private _role: string;
  private _uid: string;
  private _email: string;

  constructor(firstName: string, lastName: string, role: string, uid: string, email: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._role = role;
    this._uid = uid;
    this._email = email;
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

  get uid(): string {
    return this._uid;
  }

  set uid(value: string) {
    this._uid = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
