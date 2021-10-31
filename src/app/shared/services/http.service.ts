import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Note } from '../interfaces/note.interface';
import {map, tap} from 'rxjs/operators';
import { Awards } from '../interfaces/awards.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) {}

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

  updateUser(id: string, data) {
    this.http.post<User>(this.apiUrl + `/api/users/${id}`, data);
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

  // postNote(): Observable<any>{};

  postFile(fileToUpload: File): Observable<any> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }
}

interface GetResponse<T> {
  _embedded;
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
