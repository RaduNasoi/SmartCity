import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions,Headers} from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {AuthService} from "./auth.service";
import { Observable } from 'rxjs';
import {User} from "./user.model";

@Injectable()
export class UserService{
  constructor(
    private http: Http,
    private authenticationService: AuthService) {
  }

  getUsers(): Observable<User[]> {


    // get users from api
    return this.http.get('/api/users')
      .map((response: Response) => response.json());
  }

  insertUser(user:User){

    return this.http.post(`/api/addUser/?username=${user.username}&password=${user.password}&role=${user.role}`
      , JSON.stringify({username: user.username, password: user.password}))
      .map((res: Response) => res.json());
  }

}
