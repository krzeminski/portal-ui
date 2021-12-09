import { Component } from '@angular/core';
import { User } from '../../../shared/interfaces/user.interface';
import { FormBuilder } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { HttpService } from '../../../shared/services/http.service';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  user: User;
  changePassword: boolean = false;
  userForm;
  fileToUpload: File | null = null;

  constructor(
    private auth: AuthService,
    private http: HttpService,
    private formBuilder: FormBuilder
  ) {
    this.http.getMe().subscribe((user) => {
      this.user = user;

      this.userForm = this.formBuilder.group({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        username: this.user.username,
        email: this.user.email,
        password: '',
        newPassword: '',
        confirm: '',
      });
    });
  }

  onSubmit() {
    const user = {
      ...this.userForm.value,
      id: this.user.id,
    };
    delete user.repeatedPassword;
    if (!user.newPassword) {
      delete user.newPassword;
      delete user.password;
      delete user.confirm;
    }
    console.log(user);
    this.http
      .updateUser(user)
      .pipe(tap(console.log), first())
      .subscribe((el) => console.log(el, 'subscribe submit'));
  }

  handleFileInput(event: Event) {
    const files = (<HTMLInputElement>event.target).files;
    if (files === null) return;
    this.fileToUpload = files[0];
  }
}
