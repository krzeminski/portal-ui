import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRegistration } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Note } from '../interfaces/note.interface';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from '../../core/config/config.service';
import { environment } from '../../../environments/environment';
import { Credentials } from '../interfaces/credentials.interface';
import { JwtToken } from '../interfaces/jwt-token.interface';
import { Paging } from '../interfaces/paging.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private config: ConfigService) {}

  getMe() {
    return this.http.get<User>(this.apiUrl + '/me');
  }

  login(credentials: Credentials) {
    return this.http.post<JwtToken>(`${this.apiUrl}/authenticate`, credentials);
  }

  register(user: UserRegistration) {
    return this.http.post(`${this.apiUrl}/registration`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<Paging<User>>(this.apiUrl + `/users`).pipe(map((page) => page.content));
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/users/${id}`).pipe(map((user: User) => user));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + `/users`, user).pipe(catchError(this.config.handleHttpError));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl + `/users`, user).pipe(catchError(this.config.handleHttpError));
  }

  deleteUser(id: String | Number) {
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`).pipe(catchError(this.config.handleHttpError));
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Paging<Note>>(this.apiUrl + `/notes`).pipe(map((page) => page.content));
  }

  getNote(id?: string): Observable<Note> {
    return this.http.get<Note>(this.apiUrl + `/notes/${id}`).pipe(
      map((note: Note) => {
        return { ...note, id: id };
      })
    );
  }

  postNote(note: Note): Observable<Note> {
    const url = this.apiUrl + `/notes`;
    return this.http.post<Note>(url, note).pipe(catchError(this.config.handleHttpError));
  }

  updateNote(note: Note) {
    const url = `${this.apiUrl}/notes/${note.id}`;
    return this.http.put<Note>(url, note).pipe(catchError(this.config.handleHttpError));
  }

  deleteNote(noteId: String | Number) {
    const url = `${this.apiUrl}/notes/${noteId}`;
    return this.http.delete<Note>(url).pipe(catchError(this.config.handleHttpError));
  }

  postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(this.apiUrl + '/api/user/file', formData);
  }
}
