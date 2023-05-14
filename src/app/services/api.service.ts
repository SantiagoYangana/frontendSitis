import { Injectable } from '@angular/core';
import {Login} from '../models/login.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListUser } from '../models/listUser.interface';
import { ProfileUser } from '../models/profileUser.interface';
import { Auth } from '../models/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getCurrentUsername(){
    return localStorage.getItem('username');
  }

  getCurrentToken(){
    return localStorage.getItem('token');
  }

  authorize(form:Login):Observable<Auth>{
    let direction = `${this.apiURL}/auth`;
    return this.http.post<Auth>(direction, form);
  }

  getUsers():Observable<ListUser[]>{
    let direction = `${this.apiURL}/listUsers`;
    return this.http.get<ListUser[]>(direction);
  }

  getProfiles():Observable<ProfileUser[]>{
    let direction = `${this.apiURL}/listProfiles`;
    return this.http.get<ProfileUser[]>(direction);
  }

  createUser(user:ListUser):Observable<ListUser>{
    let direction = `${this.apiURL}/newUser`;
    return this.http.post<ListUser>(direction,user);
  }

  getPaginationUsers(page:number, size:number):Observable<any>{
    let direction = `${this.apiURL}/pagination?page=${page}&size=${size}`;
    return this.http.get<any>(direction);
  }
}
