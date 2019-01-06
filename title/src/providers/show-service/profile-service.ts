import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceProvider } from '../user-service/user-service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ShowServiceProvider {

  constructor(
    public http: HttpClient, 
    public userService: UserServiceProvider) {
    
  }

  /**
   * When you need to retrieve data that needs a user to be logged in, use this system.
   * We are using promises to keep everything consistent appside.
   */

   public fetchProfile(): Promise<any>
   {
      // 1. Get the user information from storage.
     return this.userService.getUser().then(data => {
      // 2. Set up the headers (information) so we can check them in the server. 
      var httpOptions = {
        headers: {
          'Content-Type': 'application/json',
          'User-Ref': data['id'].toString(),
          'Auth-Key': data['auth-code']
        }
      };
      // 3. Make the request and convert it to a promise 
      return this.http.get('http://localhost/php/series-tracker/api/shows-list.php', httpOptions)
      .pipe(
       catchError(error => { return Observable.throw(error).toPromise()}) 
      ).toPromise();
     });
   }
}
