import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsProvider {

  constructor(public http: HttpClient) {
    
  }

  public getPosts(): Observable<any>
  {
    // the link here for the assignment will ideally be : http://api/assignment.local/login.php
    return this.http.get<any>('http://api.assignment.local/show-posts.php')
    .pipe(
      catchError(error => { return Observable.throw(error.error); })
    );
  }
}
