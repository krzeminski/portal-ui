import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../core/services/account.service';
import { Subject } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, OnInit {
  user: User;
  private _destroy$ = new Subject<void>();

  constructor(private readonly account: AccountService) {}

  ngOnInit() {
    this.account.user$
      .pipe(takeUntil(this._destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  logout() {
    this.account.logout();
  }
}
