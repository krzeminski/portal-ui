import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Note } from '../../../shared/interfaces/note.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  constructor(private http: HttpService, private modalService: NgbModal) {
    this.http.getNotes().subscribe((notes) => (this.notes = notes));
  }

  ngOnInit(): void {}

  open(noteId?: string): void {
    const modalRef = this.modalService.open(NoteComponent);
    modalRef.componentInstance.noteId = noteId;
  }

  removeNote(noteId: string) {
    console.log(noteId);
  }
}
