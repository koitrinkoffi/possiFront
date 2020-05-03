import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {PersonDatatableComponent} from '../../components/person-datatable/person-datatable.component';
import {showNotification} from '../../utils/notify';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  updated = false;
  @ViewChild('personDatatableComponent', {read: undefined, static: false})
  personDatatableComponent: PersonDatatableComponent;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  validate() {
    this.userService.update(this.personDatatableComponent.usersUpdated).subscribe(d => {
        showNotification('Vos modifications ont été prises en compte', 'success');
        this.updated = false;
      },
      e => showNotification('Nous avons rencontré un problème. Veuillez réessayer plus tard.', 'danger'));
  }

  canValidate(event: boolean) {
    this.updated = event;
  }
}
