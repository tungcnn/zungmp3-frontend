import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Singer} from '../../interface/singer';

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  private apiSingerServiceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAllSinger(): Observable<Singer[]> {
    return this.http.get<Singer[]>(`${this.apiSingerServiceUrl}/singers/all`);
  }

  public findById(id: number): Observable<Singer> {
    return this.http.get<Singer>(`${this.apiSingerServiceUrl}/singers/find/${id}`);
  }

  public addSinger(newSinger: Singer): Observable<Singer> {
    return this.http.post<Singer>(`${this.apiSingerServiceUrl}/singers/add`, newSinger);
  }

  public editSinger(editSinger: Singer): Observable<Singer> {
    return this.http.put<Singer>(`${this.apiSingerServiceUrl}/singers/edit`, editSinger);
  }

  public deleteSinger(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiSingerServiceUrl}/singers/delete/${id}`);
  }

  public findByName(name: Singer): Observable<Singer[]> {
    return this.http.post<Singer[]>(`${this.apiSingerServiceUrl}/singers/search`, name);
  }
}
