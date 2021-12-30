import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../shared/services/http.service';
import { AuthService } from '../../core/services/auth.service';
import { UserRegistration } from '../../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidatorService } from '../../shared/services/password-validator.service';

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
    private router: Router,
    private toastr: ToastrService,
    private passwordValidator: PasswordValidatorService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
            passwordValidator.specialCharacterValidator,
            passwordValidator.uppercaseCharacterValidator,
            passwordValidator.digitValidator
          ]
        ],
        confirmPassword: ['', Validators.required],
        agreed: ['', Validators.required]
      },
      {
        validator: passwordValidator.areFieldsTheSame('password', 'confirmPassword')
      }
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.registerForm.valid) {
      this.toastr.error('Popraw formularz i spróbuj ponownie', 'Nieprawidłowe dane!');
      return;
    }
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
        () => {
          this.toastr.success('Aktywuj konto klikając w link otrzymany na maila', 'Już prawie gotowe!');
          this.router.navigateByUrl('/login');
        },
        (response) => {
          const msg = response.error.message;
          if (msg.includes('password=')) {
            this.errors.push(msg.split('password=')[1]?.split(','));
            this.errors.forEach((err) => this.toastr.error(err, 'Błąd!'));
          } else {
            this.errors.push(msg);
            this.toastr.error(msg, 'Błąd!');
          }
        }
      );
    }
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get agreed() {
    return this.registerForm.get('agreed');
  }
}
