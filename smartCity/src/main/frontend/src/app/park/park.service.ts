import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class ParkService{
  constructor(private http: Http){

  }
  getParks(){
    return this.http.get('/api/parks')
      .map(
        (response: Response)=>{

          return response.json();


        }
      );
  }
}
