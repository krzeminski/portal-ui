import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './note/note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../../app.module';
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
  },
];

@NgModule({
  declarations: [NotesComponent, NoteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
})
export class NotesModule {}
