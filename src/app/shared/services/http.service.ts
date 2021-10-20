import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Note } from '../interfaces/note.interface';
import { map } from 'rxjs/operators';
import { Awards } from '../interfaces/awards.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'http://localhost:8081/api';
  constructor(private http: HttpClient) {}

  usersMap: Subject<User> = new Subject<User>();

  login() {}
  register() {}

  getUsers(): Observable<User[]> {
    return this.http.get<GetResponse<User[]>>(this.apiUrl + `/users`).pipe(
      map((res) => res._embedded.users),
      map((users: User[]) =>
        users.map((user, id) => {
          return { ...user, id: `${id + 1}` };
        })
      )
    );
  }

  getUser(id?: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/users/${id}`).pipe(
      map((user: User) => {
        return {id: id, ...user};
      })
    );
  }

  updateUser(id: string, data){
    this.http.post<User>(this.apiUrl + `/users/${id}`, data);
  }

  getAwards(id?: string): Observable<any> {
    return this.http
      .get<GetResponse<Awards[]>>(this.apiUrl + `/users/${id}/awards`)
      .pipe(map((res) => res._embedded.awards));
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<GetResponse<Note[]>>(this.apiUrl + `/notes`).pipe(
      map((res) => res._embedded.notes),
      map((notes: Note[]) =>
        notes.map((note, id) => {
          return { ...note, id: `${id + 1}` };
        })
      )
    );
  }

  getNote(id?: string): Observable<Note> {
    return this.http.get<Note>(this.apiUrl + `/notes/${id}`).pipe(
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
