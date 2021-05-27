import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class LikeSongService {

  constructor(private http: HttpClient) { }

  checkLike(idUser:number ):Observable<any>{
    return this.http.get<any>(`${API_URL}/LikeSong/${idUser}`)
  }

  addLike(idUser : number , idPlayList) : Observable<any>{
    return this.http.post(`${API_URL}/LikeSong/${idUser}`,idPlayList);
  }

  unLike( idSong:number):Observable<any>{
    return this.http.delete(`${API_URL}/LikeSong/${idSong}`)
  }
}
