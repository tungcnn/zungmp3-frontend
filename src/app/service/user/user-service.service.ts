import { User } from './../../interface/user';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(`${API_URL}/api/all`, {responseType:'text'});
  }

  getUser(): Observable<any> {
    return this.http.get(`${API_URL}/api/user`,{responseType:'text'});
  }

  getAdmin(): Observable<any> {
    return this.http.get(`${API_URL}/api/admin`, {responseType: 'text'});
  }

  // getAllUsers(): Observable<User[]> {
  //   return this.httpClient.get<User[]>(`${API_URL}/users`);
  // }
  // getUserById(id:number): Observable<User> {
  //   return this.http.get<User>(`${API_URL}/api/${id}`);
  // }
  // createNewUser(user: User): Observable<User> {
  //   return this.http.post<User>(`${API_URL}/api/registration`, user);
  // }
  // updateUserInfo(id: number, user: User): Observable<User> {
  //   return this.http.put<User>(`${API_URL}/api/updateUser/${id}`, user);
  // }
  // deleteUser(id: number): Observable<User> {
  //   return this.http.delete<User>(`${API_URL}/api/deleteUser/${id}`);
  // }
  // login(user: User): Observable<User>{
  //   return this.http.post<User>(`${API_URL}/api/login`,user);
  // }
}

