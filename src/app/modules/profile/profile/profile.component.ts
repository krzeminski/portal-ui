import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { User } from '../../../shared/interfaces/user.interface';
import { Role } from '../../../shared/enums/role.enum';
import {Awards} from "../../../shared/interfaces/awards.interface";
import {concatMap, map, tap} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: '1',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    // picture: 'https://images.freeimages.com/images/large-previews/0d7/marguerites-1-1478725.jpg',
    profileImageUrl: '/src/assets/marguerites.jpg',
    role: Role.USER,
    awards: []
  };

  constructor(private http: HttpService) {

  }

  ngOnInit(): void {
    this.http
      .getUser(this.user.id)
      .pipe(
        tap(el => console.log('user', el)),
        tap((user) => (this.user = user)),

      )
      .subscribe();
  }
}
