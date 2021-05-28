import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../interface/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiServiceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiServiceUrl}/tags`);
  }
  public addTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.apiServiceUrl}/tags`, tag);
  }
}
