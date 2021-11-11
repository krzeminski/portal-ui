import { Component } from '@angular/core';
import { User } from '../../../shared/interfaces/user.interface';
import { AccountService } from '../../../core/services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user$: Observable<User>;

  constructor(private account: AccountService) {
    this.user$ = this.account.user$;
  }
}
