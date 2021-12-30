import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { User } from '../../../shared/interfaces/user.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from '../user/user.component';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  constructor(private http: HttpService, private modalService: NgbModal, private toastr: ToastrService) {}

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
      .subscribe(
        () => {
          const idx = this.users.findIndex((user) => user.id === userId);
          if (idx >= 0) {
            this.users.splice(idx, 1);
          }
          this.toastr.success('Użytkownika nr. ' + userId, 'Usunięto', { positionClass: 'toast-bottom-right' });
        },
        (err) => {
          this.toastr.warning(`Nie udało się usunąć użytkowika\n ${err}`, 'Błąd', {
            positionClass: 'toast-bottom-right'
          });
        }
      );
  }
}
