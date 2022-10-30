import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = "http://localhost:8000";
  constructor(private http:HttpClient) { }


  forgotPassword(email:any):Observable<any>{
    console.log(email);
    return this.http.post(`${this.URL}/insize/forgotPassword`,email);
  }
}
