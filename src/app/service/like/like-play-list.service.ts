import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikePlayListService {

  constructor(private http: HttpClient) { }

  checkLike(idUser:number ):Observable<any>{
    return this.http.get<any>(`${API_URL}/LikePlayList/${idUser}`)
  }

  addLike(idUser : number , idPlayList) : Observable<any>{
    return this.http.post(`${API_URL}/LikePlayList/${idUser}`,idPlayList);
  }

  unLike( idPlayList:number):Observable<any>{
    return this.http.delete(`${API_URL}/LikePlayList/${idPlayList}`)
  }
}
