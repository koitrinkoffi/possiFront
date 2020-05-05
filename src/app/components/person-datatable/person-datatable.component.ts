import {Component, DoCheck, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../../model/user';
import {AuthService} from '../../services/auth.service';


export interface PersonElement {
  email: string;
  firstName: string;
  lastName: string;
  role: string|number;
  tag: User;
}

@Component({
  selector: 'app-person-datatable',
  templateUrl: './person-datatable.component.html',
  styleUrls: ['./person-datatable.component.scss']
})
export class PersonDatatableComponent implements OnInit, DoCheck {

  personElements: PersonElement[];
  @Input()
  title = '';
  @Input()
  subtitle = '';
  @Output()
  changeListener = new EventEmitter<boolean>();

  displayedColumns: string[] = ['lastName', 'firstName', 'email', 'role'];
  dataSource: MatTableDataSource<PersonElement>;
  private users: User[] = [];
  usersUpdated: User[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngDoCheck(): void {
    this.changeListener.emit(this.usersUpdated.length > 0);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<PersonElement>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.userService.getAll().subscribe(d => this.parseData(d));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  parseData(users: User[]): void {
    this.personElements = [];
    this.users = users;
    users.forEach(p => {
      if (p.id !== this.authService.user.id) {
        this.personElements.push({
          email: p.email,
          firstName: p.firstName,
          lastName: p.lastName,
          role: p.role,
          tag: p,
        });
      }
    });
    this.dataSource.data = this.personElements;
  }

  save(personElement: PersonElement) {
    const user = personElement.tag as User;
    if (user.role != personElement.role) {
      const newUser = new User(user);
      newUser.role = personElement.role;
      this.usersUpdated.push(newUser);
    } else {
      this.usersUpdated = this.usersUpdated.filter(u => !(u.id === user.id));
    }
  }

  resfresh() {
    this.usersUpdated.forEach(u => {
      this.users.find(u1 => u1.id === u.id).role = u.role;
    });
    this.usersUpdated = [];
    this.parseData(this.users);
  }
}
