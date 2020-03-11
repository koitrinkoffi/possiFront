export class User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  uid: string;
  email: string;

  constructor(id: number, firstName: string, lastName: string, role: string, uid: string, email: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.uid = uid;
    this.email = email;
  }
}
