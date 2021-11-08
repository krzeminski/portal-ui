import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {}
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    // return throwError(
    //   'Something bad happened; please try again later.');
    return EMPTY;
  }

  public handleHttpError = (error) => {
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = this.getServerErrorMessage(error);
    }
    return throwError(errorMsg);
  };

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
