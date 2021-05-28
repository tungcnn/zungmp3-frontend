import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Theme} from "../interface/theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private apiServiceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }
  public getAllTheme(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiServiceUrl}/themes`);
  }
}
