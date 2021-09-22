import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      repeatedPassword: '',
      agreed: ''
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.registerForm.value);
  }
}
