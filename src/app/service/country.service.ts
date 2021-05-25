import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Theme} from "../interface/theme";
import {Country} from "../interface/country";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiServiceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }
  public getAllCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiServiceUrl}/countries`);
  }
}
