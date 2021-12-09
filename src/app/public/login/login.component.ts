import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentialsForm;

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
    this.credentialsForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.auth.login(this.credentialsForm.value);
    this.credentialsForm.reset();
  }
}
