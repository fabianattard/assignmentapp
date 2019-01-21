import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(
    public http: HttpClient,
    public storage: Storage) 
  {
   
  }

  // Clears the user's information on logout 
  public clearUser(): void 
  {
    this.storage.clear();
  }

  // Retrieves the user's information to be sent to the server 
  public getUser(): Promise<any>
  {
    const promises = [];
    var keys = ['auth_code', 'id'];
    keys.forEach( key => promises.push(this.storage.get(key)) );

    return Promise.all(promises).then( values => {
      const result = {};
    
       values.map( (value, index) => { 
        result[keys[index]] = value; 
    });

      return result;
  });
  }

  // Observables are structures that are capable of waiting for a request/connection to finish
  public login(credentials:any): Observable<any>
  {
    // the link here for the assignment will ideally be : http://api/assignment.local/login.php
    return this.http.post<any>('http://api.assignment.local/login.php', credentials)
    .pipe(
      catchError(error => { return Observable.throw(error.error); })
    );
  }

   // Observables are structures that are capable of waiting for a request/connection to finish
   public signUp(credentials:any): Observable<any>
   {
     // the link here for the assignment will ideally be : http://api/assignment.local/login.php
     return this.http.post<any>('http://api.assignment.local/register.php', credentials)
     .pipe(
       catchError(error => { return Observable.throw(error.error); })
     );
   }

  // Stores the information for a user on this app. 
  public storeUser(data: any): void
  {
    Object.keys(data).forEach(key => {
      var value = data[key];
      this.storage.set(key, value);
    });
  }
    // Observables are structures that are capable of waiting for a request/connection to finish
    public get_profile(): Observable<any>
    {
      // the link here for the assignment will ideally be : http://api/assignment.local/login.php
      return this.http.get<any>('http://api.assignment.local/profile.php')
      .pipe(
        catchError(error => { return Observable.throw(error.error); })
      );
    }
}
