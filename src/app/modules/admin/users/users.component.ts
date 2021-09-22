import {Component, OnInit} from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import {User} from "../../../shared/interfaces/user.interface";
import {Awards} from "../../../shared/interfaces/awards.interface";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  awards: Awards[] = [];
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http.getUsers().subscribe((value) => (this.users = value));
  }
}
