export class User {
  id: number;
  firstName: string;
  lastName: string;
  role: number | string;
  uid: string;
  email: string;

  constructor(user?: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.uid = user.uid;
    this.email = user.email;
  }
}
