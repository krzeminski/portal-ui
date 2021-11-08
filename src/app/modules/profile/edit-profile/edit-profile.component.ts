import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { User } from '../../../shared/interfaces/user.interface';
import { user as userInit } from '../../../shared/mocks/UserMock';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  user: User = userInit;
  userForm;
  fileToUpload: File | null = null;

  constructor(private http: HttpService, private formBuilder: FormBuilder) {
    this.http.getUser(this.user.id).subscribe((user) => (this.user = user));
    this.userForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      oldPassword: '',
      password: '',
      repeatedPassword: '',
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      userName: this.user.username,
      email: this.user.email,
    });
    console.log(this.userForm.values);
  }

  onSubmit() {
    console.log('onsubmit', this.userForm.value);
    const data = { ...this.userForm.values };
    delete data.oldPassword;
    delete data.repeatedPassword;
    // this.http.updateUser(data);
  }

  handleFileInput(event: Event) {
    const files = (<HTMLInputElement>event.target).files;
    if (files === null) return;
    this.fileToUpload = files[0];
  }
}
