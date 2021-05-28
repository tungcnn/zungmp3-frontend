import { Observable } from 'rxjs';
import { UpdatePassword } from './../../interface/updatePassword';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtResponse } from 'src/app/interface/jwtResponse';
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

login(credentials): Observable<JwtResponse> {
  return this.http.post<JwtResponse>(AUTH_API+'login',credentials)
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
updatePassword(updatePasswordUser): Observable<any>{
  return this.http.put(AUTH_API+'updatePassword',{
    username: updatePasswordUser.username,
    currentPassword: updatePasswordUser.currentPassword,
    newPassword: updatePasswordUser.newPassword,
    fullName: updatePasswordUser.fullName,
    email: updatePasswordUser.email
  })
}
}
