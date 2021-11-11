import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentialsForm;

  constructor(
    private account: AccountService,
    private formBuilder: FormBuilder,

  ) {
    this.credentialsForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.account.login(this.credentialsForm.value).pipe(first()).subscribe();
    this.credentialsForm.reset();

  }
}
