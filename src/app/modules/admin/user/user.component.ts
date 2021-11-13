import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';
import { Role } from '../../../shared/enums/role.enum';
import { first, tap } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() userId: string;
  roles = [Role.USER, Role.MODERATOR, Role.ADMIN];
  user: User;
  userForm;

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal
  ) {
    this.userForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      role: '',
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.http
        .getUser(this.userId)
        .pipe(first())
        .subscribe((user) => {
          this.user = user;
          this.userForm.patchValue({
            ...user,
            role: Role[user.role],
          });
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
    console.log(user);
    this.http
      .updateUser(user)
      .pipe(tap(console.log), first())
      .subscribe((el) => console.log(el, 'subscribe submit'));
  }

  resetValues() {
    this.modal.dismiss('cancel click');
  }

  handleFileInput() {}
}
