import { Injectable } from '@angular/core';
import {Login} from '../models/login.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  authorize(form:Login):Observable<boolean>{
    let direction = `${this.apiURL}/auth`;
    return this.http.post<boolean>(direction, form);
  }
}
