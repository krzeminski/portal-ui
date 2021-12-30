import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserRegistration } from '../../shared/interfaces/user.interface';
import { filter, map, skip } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import { TokenService } from './token.service';
import { Credentials } from '../../shared/interfaces/credentials.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  private _subject = new BehaviorSubject<User>(undefined);

  user$: Observable<User>;
  isLoggedIn$: Observable<boolean> = of(false);

  constructor(
    private router: Router,
    private http: HttpService,
    private token: TokenService,
    private toastr: ToastrService
  ) {
    this.user$ = this._subject.asObservable();
    this.getUserDetails();

    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user?.id));
    this.token.isTokenValid$
      .pipe(
        filter((valid) => !valid),
        skip(1)
      )
      .subscribe(() => this.logout());
  }

  getUserDetails(): void {
    this.http.getMe().subscribe((user) => this._subject.next(user));
  }

  register(registrationUser: UserRegistration): Observable<any> {
    return this.http.register(registrationUser);
  }

  login(credentials: Credentials) {
    return this.http.login(credentials).subscribe(
      (response) => {
        this.token.saveToken(response.access_token);
        this.getUserDetails();
        this.toastr.success('Witaj', 'Poprawne logowanie', { positionClass: 'toast-bottom-right' });
        this.router.navigate(['/']);
      },
      () => {
        this.toastr.error('Nie poprawne dane, spróbuj ponownie', 'Nie udało się zalogować', { positionClass: 'toast-bottom-right' });
      }
    );
  }

  logout() {
    this.token.clearToken();
    // @ts-ignore
    this._subject.next(undefined);
    this.router.navigate(['/login']);
  }
}
