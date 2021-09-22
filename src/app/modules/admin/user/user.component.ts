import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';
import { Role } from '../../../shared/enums/role.enum';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import {Awards} from "../../../shared/interfaces/awards.interface";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() userId;
  roles = [Role.USER, Role.MODERATOR, Role.ADMIN];
  awards: Awards[] = [];
  user: User = {
    id: '0',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    profileImageUrl: 'url',
    role: Role.USER,
  };
  userForm;

  constructor(private http: HttpService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: '',
      surname: '',
      userName: '',
      email: '',
      role: '',
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.http
        .getUser(this.userId)
        .pipe(
          map((user) => (this.user = user)),
          concatMap((user) => this.http.getAwards(this.userId)),
          map((award) => (this.awards = award))
        )
        .subscribe();
      this.userForm.patchValue({});
    }
  }

  onSubmit() {}
  resetValues() {}
  handleFileInput(event) {}
}
