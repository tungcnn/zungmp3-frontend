import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Songcomment} from '../../interface/songcomment';
import {Playcomment} from "../../interface/playListcomment";

@Injectable({
  providedIn: 'root'
})
export class PlaylistcommentService {
  private apiSongServiceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAllCommentPlaylist(id: number): Observable<Playcomment[]> {
    return this.http.get<Playcomment[]>(`${this.apiSongServiceUrl}/playlistcomments/${id}`);
  }

  public addCommentPlaylist(newcomment: Songcomment): Observable<Playcomment> {
    return this.http.post<Playcomment>(`${this.apiSongServiceUrl}/playlistcomments`, newcomment);
  }
}
