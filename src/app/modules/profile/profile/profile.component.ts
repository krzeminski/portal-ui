import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { User } from '../../../shared/interfaces/user.interface';
import { user as userInit } from '../../../shared/mocks/UserMock';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = userInit;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http
      .getUser(this.user.id)
      .pipe(
        tap((el) => console.log('user', el)),
        tap((user) => (this.user = user))
      )
      .subscribe();
  }
}
