import { Injectable } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { Credentials } from './auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(private router: Router, private http: HttpService) {
    const init = localStorage.getItem('user');
    if (init != null) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(init));
      this.user$ = this.userSubject.asObservable();
    }
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public login(credentials: Credentials) {
    return this.http.login(credentials).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  public logout() {
    localStorage.removeItem('user');
    // @ts-ignore
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  public register(user: User) {
    return this.http.register(user);
  }
}
