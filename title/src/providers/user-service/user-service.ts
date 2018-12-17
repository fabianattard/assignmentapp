import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) 
  {
   
  }

  // Observables are structures that are capable of waiting for a request/connection to finish
  public login(): Observable<any>
  {
    // the link here for the assignment will ideally be : http://api/assignment.local/login.php
    return this.http.post<any>('http://localhost/php/series-tracker/login.php', {})
    .pipe(
      catchError(error => { return Observable.throw(error); })
    );
  }
}
