import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ApiService {

  constructor(private http: Http) {}

  get(endPoint) {
    return this.http.get(`http://localhost:3000/${endPoint}`)
      .map(response => response.json());
  }

  add(endPoint, item) {
    return this.http.post(`http://localhost:3000/${endPoint}`, item)
      .switchMap(() => {
        return this.get(endPoint);
      });
  }
}
