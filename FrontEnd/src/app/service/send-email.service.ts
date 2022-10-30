import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  private URL = "http://localhost:8000";
  constructor(private http:HttpClient) { }

  enviarCorreo(email:any):Observable<any>{
    return this.http.post(`${this.URL}/correo/email/enviar`,email);
  }

  enviarUserContra(email:any):Observable<any>{
    return this.http.post(`${this.URL}/correo/email/forgotPassword`,email);
  }



}
