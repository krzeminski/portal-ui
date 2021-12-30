import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Note } from '../../../shared/interfaces/note.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteComponent } from '../note/note.component';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  constructor(private http: HttpService, private modalService: NgbModal, private toastr: ToastrService) {
    this.http.getNotes().subscribe((notes) => (this.notes = notes));
  }

  ngOnInit(): void {}

  open(noteId?: string): void {
    const modalRef = this.modalService.open(NoteComponent);
    modalRef.componentInstance.noteId = noteId;
  }

  removeNote(noteId: string) {
    this.http
      .deleteNote(noteId)
      .pipe(first())
      .subscribe(
        () => {
          const idx = this.notes.findIndex((note) => note.id === noteId);
          if (idx >= 0) {
            this.notes.splice(idx, 1);
          }
          this.toastr.success('notatkę nr. ' + noteId, 'Usunięto', { positionClass: 'toast-bottom-right' });
        },
        (err) => {
          this.toastr.warning(`Nie udało się usunąć notatki\n ${err}`, 'Błąd', { positionClass: 'toast-bottom-right' });
        }
      );
  }
}
