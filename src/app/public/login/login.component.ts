import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.credentialsForm.valid) {
      this.auth.login(this.credentialsForm.value);
    }
    this.credentialsForm.reset();
  }

  get email() {
    return this.credentialsForm.get('email');
  }
  get password() {
    return this.credentialsForm.get('email');
  }
}
