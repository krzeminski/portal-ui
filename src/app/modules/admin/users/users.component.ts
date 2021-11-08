import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { User } from '../../../shared/interfaces/user.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from '../user/user.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  constructor(private http: HttpService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.http.getUsers().subscribe((value) => (this.users = value));
  }

  open(userId: string): void {
    const modalRef = this.modalService.open(UserComponent);
    modalRef.componentInstance.userId = userId;
  }

  removeUser(userId: string) {
    this.http
      .deleteUser(userId)
      .pipe(first())
      .subscribe((el) => console.log('delete', el));
  }
}
