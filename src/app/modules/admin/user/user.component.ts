import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';
import { Role } from '../../../shared/enums/role.enum';
import { first, map, tap } from 'rxjs/operators';
import { user as userInit } from '../../../shared/mocks/UserMock';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() userId: string;
  roles = [Role.USER, Role.MODERATOR, Role.ADMIN];
  user: User = userInit;
  userForm;

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal
  ) {
    this.userForm = this.formBuilder.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      username: this.user.username,
      email: this.user.email,
      role: this.user.role,
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.http
        .getUser(this.userId)
        .pipe(map((user) => (this.user = user)))
        .subscribe();
      this.userForm.patchValue({
        ...this.user,
        firstName: this.user.firstName,
      });
    }
  }

  onSubmit() {
    this.modal.close('Ok click');
    const user = {
      ...this.userForm.value,
      role: Role[this.userForm.value.role],
      id: this.userId,
    };
    this.http
      .updateUser(user)
      .pipe(tap(console.log), first())
      .subscribe((el) => console.log(el, 'subscribe submit'));
  }
  resetValues() {
    this.modal.dismiss('cancel click');
  }
  handleFileInput(event) {}
}
