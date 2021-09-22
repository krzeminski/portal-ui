import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { FormBuilder } from '@angular/forms';
import {Note} from "../../../shared/interfaces/note.interface";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() noteId?: string;
  note: Note = {
    id: '0',
    creationDate: '',
    title: 'Wprowadź tytuł',
    text: 'Wprowadź opis',
    value: 0,
    userId: 0,
    email: '',
  };
  noteForm;
  constructor(private http: HttpService, private formBuilder: FormBuilder) {
    this.noteForm = this.formBuilder.group({
      title: this.note.title,
      text: this.note.text,
      value: this.note.value,
    });
  }

  ngOnInit(): void {
    if(this.noteId){
      this.http.getNote(this.noteId).subscribe((note) => (this.note = note));
      this.noteForm.patchValue({
        title: this.note.title,
        text: this.note.text,
        value: this.note.value,
      });
    }
  }

  onSubmit(){
    console.log(this.noteForm.value)
  }

  resetValues(){
    this.noteForm.patchValue({
      title: this.note.title,
      text: this.note.text,
      value: this.note.value,
    });
  }

}
