import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {



  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {


  }

  login(username: string, password: string): Observable<boolean> {

    return this.http.post(`api/authenticate/?username=${username}&password=${password}`, JSON.stringify({username: username, password: password}), {headers: this.headers})
      .map((response: Response) => {

        if(response.json().username!=null && response.json().password!=null){
        // login successful if there's a jwt token in the response
        let token = ""+Math.floor(Math.random() * 600) + 1;

          //console.log(response.json().role);
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          localStorage.setItem("username",response.json().username);
          localStorage.setItem("role",response.json().role);
          localStorage.setItem("token", token);


          // return true to indicate successful login
          return true;
         }else {
          // return false to indicate failed login
          return false;
        }
      }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }





  logout(): void {
    // clear token remove user from local storage to log user out

    localStorage.removeItem("currentUser");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("firstTime");
    localStorage.removeItem('directions');
    localStorage.removeItem("occupiedPlaces");
    localStorage.removeItem("parkingLat");
    localStorage.removeItem("parkingLng");
    localStorage.removeItem("nearestDestination");
  }
}



