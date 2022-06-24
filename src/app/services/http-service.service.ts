import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private ordering_ms = "http://localhost:8080/api/v1/";
  private barista_ms = "http://localhost:9999/api/v1/process-order/";
  private token = new BehaviorSubject("");
  public setToken(token) {
    this.token.next(token);

  }
  constructor(public _http: HttpClient) { }

  get(query) {
    return this._http.get(this.ordering_ms + query, this.getHeaders());

  }


  getBarista(query) {
    return this._http.get(this.barista_ms + query, this.getHeaders());

  }
  putBarista(query, body) {
    return this._http.put(this.barista_ms + query, body, this.getHeaders());

  }


  insert(route, body) {
    return this._http.post(this.ordering_ms + route, body, this.getHeaders());

  }

  put(route, body) {
    return this._http.put(this.ordering_ms + route, body, this.getHeaders());

  }

  private getHeaders() {
    if (!this.token.value) {
      var hdrs2 = {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      };
      return hdrs2;
    } else {
      var hdrs1 = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + this.token.value
        })
      };
      return hdrs1;
    }
  }
}
