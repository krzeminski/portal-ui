import { Injectable } from '@angular/core';
import { Role } from '../../shared/enums/role.enum';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: string = '';
  private jwtHelperService = new JwtHelperService();
  private _subject = new BehaviorSubject<boolean>(false);
  public isTokenValid$ = this._subject.asObservable();

  constructor() {}

  saveToken(token: string): void {
    this.token = token;
    if (this.validateToken()) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): String {
    this.token = localStorage.getItem('token') ?? '';
    return this.token;
  }

  clearToken(): void {
    this.token = '';
    localStorage.removeItem('token');
  }

  validateToken(): boolean {
    if (
      this.token &&
      this.jwtHelperService.decodeToken(this.token)?.sub &&
      !this.jwtHelperService.isTokenExpired(this.token)
    ) {
      this._subject.next(true);
      return true;
    } else {
      this._subject.next(false);
      this.clearToken();
      return false;
    }
  }

  getRole(): Role {
    return this.jwtHelperService.decodeToken(this.token)?.roles[0] ?? Role.NONE;
  }
}
