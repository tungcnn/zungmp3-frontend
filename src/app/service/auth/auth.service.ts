import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const AUTH_API = `${environment.apiUrl}` + '/api/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

login(credentials): Observable<any> {
  return this.http.post(AUTH_API+'login',credentials)
}
registration(user): Observable<any> {
  return this.http.post(AUTH_API+'registration',{
    fullName: user.fullName,
    username: user.username,
    password: user.password,
    email: user.email
  }, httpOptions);
}
updateUser(user): Observable<any> {
  return this.http.put(AUTH_API+'updateUser',{
    fullName: user.fullName,
    username: user.username,
    password: user.password,
    email: user.email
  }, httpOptions)
}
}
