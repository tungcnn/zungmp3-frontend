import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ID_KEY = 'auth-id';
// const UPDATE_PASSWORD='auth-updatePassword';
const U_P_KEY='auth-up';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  

  constructor() { }

  signOut(){
    window.sessionStorage.clear();
  }
  public saveToken(token:string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }
  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user){
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(){
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public saveId(id){
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY,JSON.stringify(id));
  }
  public getId(){
    return JSON.parse(sessionStorage.getItem(ID_KEY));
  }
  public saveUpdatePassword(updatePassword){
    window.sessionStorage.removeItem(U_P_KEY);
    window.sessionStorage.setItem(U_P_KEY, JSON.stringify(updatePassword));
  }
  getUpdatePassword(){
    return JSON.parse(sessionStorage.getItem(U_P_KEY));
  }
}
