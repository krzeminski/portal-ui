import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Note } from '../../../shared/interfaces/note.interface';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  constructor(private http: HttpService) {
    this.http.getNotes().subscribe((notes) => (this.notes = notes));
  }

  ngOnInit(): void {}
}
