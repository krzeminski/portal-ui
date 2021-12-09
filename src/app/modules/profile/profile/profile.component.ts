import { Component } from '@angular/core';
import { User } from '../../../shared/interfaces/user.interface';
import { Observable } from 'rxjs';
import { HttpService } from '../../../shared/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user$: Observable<User>;

  constructor(private http: HttpService) {
    this.user$ = this.http.getMe();
  }
}
