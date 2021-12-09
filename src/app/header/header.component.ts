import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../core/services/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy, OnInit {
  user$: Observable<User>;
  private _destroy$ = new Subject<void>();

  constructor(private readonly auth: AuthService) {}

  ngOnInit() {
    this.user$ = this.auth.user$.pipe(takeUntil(this._destroy$));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  logout() {
    this.auth.logout();
  }
}
