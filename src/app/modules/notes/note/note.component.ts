import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { FormBuilder } from '@angular/forms';
import { Note } from '../../../shared/interfaces/note.interface';
import { note as noteInit } from '../../../shared/mocks/NoteMock';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() noteId?: string;
  note: Note = noteInit;
  noteForm;
  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal
  ) {
    this.noteForm = this.formBuilder.group({
      title: this.note.title,
      text: this.note.text,
      value: this.note.value,
    });
  }

  ngOnInit(): void {
    console.log(this.noteId);
    if (this.noteId) {
      this.http.getNote(this.noteId).subscribe((note) => {
        this.note = note;
        this.noteForm.patchValue({
          title: this.note.title,
          text: this.note.text,
          value: this.note.value,
        });
      });
    }
  }

  onSubmit() {
    console.log(this.noteForm.value);
    const note = {
      ...this.noteForm.value,
      authorEmail: this.getCurrentUserMail(),
    };
    if (this.noteId) {
      this.http
        .updateNote({...note, id: this.noteId})
        .pipe(tap(console.log), first())
        .subscribe((el) => console.log(el, 'subscribe submit'));
    }else{

    this.http
      .postNote(note)
      .pipe(tap(console.log), first())
      .subscribe((el) => console.log(el, 'subscribe submit'));
    }
  }

  resetValues() {
    this.noteForm.patchValue({
      title: this.note.title,
      text: this.note.text,
      value: this.note.value,
    });
  }
  getCurrentUserMail(): string {
    return 'user@portal.com';
  }
}
