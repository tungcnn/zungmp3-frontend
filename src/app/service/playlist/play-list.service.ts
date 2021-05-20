import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient,HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Playlist} from "../../interface/playlist";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class PlayListService {

  constructor(private  http: HttpClient) { }

  getAllPlayList(): Observable<Playlist[]>{
    return this.http.get<Playlist[]>(`${API_URL}/playlists`)
  }

  getPlayListById(id : number): Observable<Playlist>{
    return this.http.get<Playlist>(`${API_URL}/playlists/${id}`)
  }

  createPlayList(playList : Playlist): Observable<Playlist>{
    return this.http.post<Playlist>(`${API_URL}/playlists`,playList)
  }

  deletePlayList(id: number): Observable<Playlist> {
    return this.http.delete<Playlist>(`${API_URL}/playlists/${id}`);
  }

  addSongToPlayList(id: number , id_PlayList: number): Observable<Playlist>{
    return this.http.get(`${API_URL}/${id}/${id_PlayList}`)
  }

  editPlayList(id:number , playList : Playlist) : Observable<Playlist>{
    return this.http.put(`${API_URL}/playlists/${id}`, playList)
  }
}
