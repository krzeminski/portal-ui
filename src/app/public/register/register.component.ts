import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../shared/services/http.service';
import { AuthService } from '../../core/services/auth.service';
import { UserRegistration } from '../../shared/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm;
  errors: string[] = [];
  //todo: map errors

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      agreed: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const user = this.registerForm.value;

    if (
      user.firstName &&
      user.lastName &&
      user.username &&
      user.email &&
      user.password == user.confirmPassword &&
      user.agreed
    ) {
      const register: UserRegistration = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: user.password
      };

      this.auth.register(register).subscribe(
        (token) => {
          this.router.navigateByUrl('/login');
          console.log('user created, check email', token);
        },
        (response) => {
          const msg = response.error.message;
          if (msg.includes('password=')) {
            this.errors = msg.split('password=')[1]?.split(',');
          } else {
            this.errors = msg;
          }
        },
        () => console.log('success')
      );
    }
    //
    // this.http
    //   .register(user)
    //   .pipe(tap(console.log), first())
    //   .subscribe((el) => console.log(el, 'subscribe submit'));
  }
}
