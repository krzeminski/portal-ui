import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Note } from '../interfaces/note.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from '../../core/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'http://localhost:8081';
  constructor(private http: HttpClient, private config: ConfigService) {}

  usersMap: Subject<User> = new Subject<User>();

  login() {}
  register() {}

  getUsers(): Observable<User[]> {
    return this.http.get<Paging<User>>(this.apiUrl + `/users`).pipe(
      map((page) => page.content),
      tap(console.log)
    );
  }

  getUser(id?: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/users/${id}`).pipe(
      map((user: User) => {
        return { id: id, ...user };
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.apiUrl + `/users`, user)
      .pipe(catchError(this.config.handleHttpError));
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(this.apiUrl + `/users/${user.id}`, user)
      .pipe(catchError(this.config.handleHttpError));
  }

  deleteUser(id: String | Number) {
    return this.http
      .delete<User>(`${this.apiUrl}/users/${id}`)
      .pipe(catchError(this.config.handleHttpError));
  }

  getNotes(): Observable<Note[]> {
    return this.http
      .get<Paging<Note>>(this.apiUrl + `/notes`)
      .pipe(map((page) => page.content));
  }

  getNote(id?: string): Observable<Note> {
    return this.http.get<Note>(this.apiUrl + `/api/notes/${id}`).pipe(
      map((note: Note) => {
        return { ...note, id: id };
      })
    );
  }

  postNote(note: Note): Observable<Note> {
    const url = this.apiUrl + `/notes`;
    return this.http
      .post<Note>(url, note)
      .pipe(catchError(this.config.handleHttpError));
  }

  updateNote(note: Note) {
    const url = `${this.apiUrl}/notes/${note.id}`;
    return this.http
      .put<Note>(url, note)
      .pipe(catchError(this.config.handleHttpError));
  }

  deleteNote(noteId: String | Number) {
    const url = `${this.apiUrl}/notes/${noteId}`;
    return this.http
      .delete<Note>(url)
      .pipe(catchError(this.config.handleHttpError));
  }

  postFile(fileToUpload: File): Observable<any> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }
}

export interface Paging<T> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalPages: number;
  totalElements: number;
}

export interface Pageable {
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged?: boolean;
}
