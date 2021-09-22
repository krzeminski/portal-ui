import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentialsForm;

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
    this.credentialsForm = this.formBuilder.group({
      userName: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Your order has been submitted', this.credentialsForm.value);
    this.auth.getUserDetails(this.credentialsForm.value);
    this.credentialsForm.reset();
  }
}
