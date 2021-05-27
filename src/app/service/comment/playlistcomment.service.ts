import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Songcomment} from '../../interface/songcomment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistcommentService {
  private apiSongServiceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAllCommentPlaylist(id: number): Observable<Songcomment[]> {
    return this.http.get<Songcomment[]>(`${this.apiSongServiceUrl}/playlistcomments/${id}`);
  }

  public addCommentPlaylist(newcomment: Songcomment): Observable<Songcomment> {
    return this.http.post<Songcomment>(`${this.apiSongServiceUrl}/playlistcomments`, newcomment);
  }
}
