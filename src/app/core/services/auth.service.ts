import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserRegistration } from '../../shared/interfaces/user.interface';
import { filter, map, skip } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import { TokenService } from './token.service';
import { Credentials } from '../../shared/interfaces/credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  private _subject = new BehaviorSubject<User>(undefined);

  user$: Observable<User>;
  isLoggedIn$: Observable<boolean> = of(false);

  constructor(private router: Router, private http: HttpService, private token: TokenService) {
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
    return this.http.login(credentials).subscribe((response) => {
      this.token.saveToken(response.access_token);
      this.getUserDetails();
      this.router.navigate(['/']);
    });
  }

  logout() {
    this.token.clearToken();
    // @ts-ignore
    this._subject.next(undefined);
    this.router.navigate(['/login']);
  }
}
