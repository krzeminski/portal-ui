import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';
import { Role } from '../../../shared/enums/role.enum';
import { first } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() userId: string;
  roles = [Role.USER, Role.MODERATOR, Role.ADMIN];
  user: User;
  userForm;

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ''
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
            role: Role[user.role]
          });
        });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user = {
        ...this.userForm.value,
        role: Role[this.userForm.value.role],
        id: this.userId
      };
      this.http
        .updateUser(user)
        .pipe(first())
        .subscribe(
          () => {
            this.modal.close();
            this.toastr.success(`Zaaktualizowano użytkownika ${user.username}`, 'Sukces', {
              positionClass: 'toast-bottom-right'
            });
          },
          (err) => {
            this.toastr.error(`Coś poszło nie tak ${err}`, 'Błąd', { positionClass: 'toast-bottom-right' });
          }
        );
    }
  }

  resetValues() {
    this.userForm.patchValue({
      ...this.user,
      role: Role[this.user.role]
    });
  }

  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get username() {
    return this.userForm.get('username');
  }
  get email() {
    return this.userForm.get('email');
  }

  // handleFileInput() {}
}
