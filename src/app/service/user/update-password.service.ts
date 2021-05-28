import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdatePassword } from 'src/app/interface/updatePassword';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {

  constructor(private http: HttpClient) { }



  getUserByIdUP(id:number): Observable<UpdatePassword> {
    return this.http.get<UpdatePassword>(`${API_URL}/api/${id}`);
  }

  changePassword(id: number,updatePasswordUser: UpdatePassword): Observable<UpdatePassword>{
    return this.http.put<UpdatePassword>(`${API_URL}/api/updatePassword/${id}`,updatePasswordUser);
  }

}
