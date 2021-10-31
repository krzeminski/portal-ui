import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { User } from '../../../shared/interfaces/user.interface';
import { Awards } from '../../../shared/interfaces/awards.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  // awards: Awards[] = [];
  constructor(private http: HttpService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.http.getUsers().subscribe((value) => (this.users = value));
  }

  open(userId: string): void {
    const modalRef = this.modalService.open(UserComponent);
    modalRef.componentInstance.userId = userId;
  }

  removeUser(userId: string){
    console.log(userId)
  }
}
