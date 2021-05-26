import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Songcomment} from '../../interface/songcomment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiSongServiceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAllSongId(): Observable<Songcomment[]> {
    return this.http.get<Songcomment[]>(`${this.apiSongServiceUrl}/comments`);
  }

  public addComment(newcomment: Songcomment): Observable<Songcomment> {
    return this.http.post<Songcomment>(`${this.apiSongServiceUrl}/comments`, newcomment);
  }

}
