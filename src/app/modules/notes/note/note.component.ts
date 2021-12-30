import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { FormBuilder } from '@angular/forms';
import { Note } from '../../../shared/interfaces/note.interface';
import { note as noteInit } from '../../../shared/mocks/NoteMock';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() noteId?: string;
  note: Note = noteInit;
  noteForm;
  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) {
    this.noteForm = this.formBuilder.group({
      title: this.note.title,
      text: this.note.text,
      value: this.note.value
    });
  }

  ngOnInit(): void {
    if (this.noteId) {
      this.http.getNote(this.noteId).subscribe((note) => {
        this.note = note;
        this.noteForm.patchValue({
          title: this.note.title,
          text: this.note.text,
          value: this.note.value
        });
      });
    }
  }

  onSubmit() {
    const note = {
      ...this.noteForm.value
    };
    if (this.noteId) {
      this.http
        .updateNote({ ...note, id: this.noteId })
        .pipe(first())
        .subscribe(
          () => {
            this.toastr.success(`Zaaktualizowano notatkę '${note.title}'`, 'Sukces', {
              positionClass: 'toast-bottom-right'
            });
            this.modal.close();
          },
          (err) => {
            this.toastr.error(`Coś poszło nie tak ${err}`, 'Błąd', { positionClass: 'toast-bottom-right' });
          }
        );
    } else {
      this.http
        .postNote(note)
        .pipe(first())
        .subscribe(
          () => {
            this.toastr.success(`Utworzono notatkę '${note.title}'`, 'Sukces', { positionClass: 'toast-bottom-right' });
            this.modal.close();
          },
          (err) => {
            this.toastr.error(`Coś poszło nie tak ${err}`, 'Błąd', { positionClass: 'toast-bottom-right' });
          }
        );
    }
  }

  resetValues() {
    this.noteForm.patchValue({
      title: this.note.title,
      text: this.note.text,
      value: this.note.value
    });
  }
}
