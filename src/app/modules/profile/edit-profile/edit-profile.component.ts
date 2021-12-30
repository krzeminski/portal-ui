import { Component } from '@angular/core';
import { User } from '../../../shared/interfaces/user.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpService } from '../../../shared/services/http.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  user: User;
  changePassword: boolean = false;
  userForm;
  fileToUpload: File | null = null;

  constructor(
    private auth: AuthService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.http.getMe().subscribe((user) => {
      this.user = user;
      this.userForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        username: this.user.username,
        email: this.user.email
      });
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user = {
        ...this.userForm.value,
        id: this.user.id
      };
      this.http
        .updateUser(user)
        .pipe(first())
        .subscribe(
          () => {
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
  //
  // handleFileInput(event: Event) {
  //   const files = (<HTMLInputElement>event.target).files;
  //   if (files === null) return;
  //   this.fileToUpload = files[0];
  // }

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
}
