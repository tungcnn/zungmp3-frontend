import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Genre} from "../interface/genre";

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiServiceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }
  public getAllGenre(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiServiceUrl}/genres`);
  }
}
