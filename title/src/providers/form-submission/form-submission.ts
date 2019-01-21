import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

/*
  Generated class for the FormSubmissionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FormSubmissionProvider {

  constructor(
    public http: HttpClient) 
  {
    
  }

  public sendForm(credentials:any): Observable <any>
  {
     // the link here for the assignment will ideally be : http://api/assignment.local/login.php
     return this.http.post<any>('http://api.assignment.local/form.php', credentials)
     .pipe(
       catchError(error => { return Observable.throw(error.error); })
     );
  }
}
