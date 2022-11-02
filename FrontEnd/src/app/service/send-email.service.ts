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
    return this.http.post(`${this.URL}/email/enviar`,email);
  }

  enviarUserContra(email:any):Observable<any>{

    return this.http.post(`${this.URL}/email/forgotPassword`,email);
  }

  correoAcpetacion(email:any){
    return this.http.post(`${this.URL}/email/correoAcpetacion`,email);
  }


}
