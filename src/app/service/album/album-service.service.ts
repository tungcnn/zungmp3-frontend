import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Album} from '../../interface/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumServiceService {

  private apiAlbumServiceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAllAlbum(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiAlbumServiceUrl}/albums/all`);
  }

  public findById(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiAlbumServiceUrl}/albums/${id}`);
  }

  public addAlbum(newSinger: Album): Observable<Album> {
    return this.http.post<Album>(`${this.apiAlbumServiceUrl}/albums/add`, newSinger);
  }

  public editAlbum(editSinger: Album): Observable<Album> {
    return this.http.put<Album>(`${this.apiAlbumServiceUrl}/albums/edit`, editSinger);
  }

  public deleteAlbum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiAlbumServiceUrl}/albums/delete/${id}`);
  }

  public findByName(name: Album): Observable<Album[]> {
    return this.http.post<Album[]>(`${this.apiAlbumServiceUrl}/albums/search`, name);
  }
}
