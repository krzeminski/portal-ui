import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm;

  constructor(private http: HttpService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      repeatedPassword: '',
      agreed: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.registerForm.value);
    const user = {
      ...this.registerForm.value,
      role: 'USER',
    };
    delete user.repeatedPassword;
    delete user.agreed;

    console.log(user);

    // this.http
    //   .addUser(user)
    //   .pipe(tap(console.log), first())
    //   .subscribe((el) => console.log(el, 'subscribe submit'));
  }
}
