import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  private URL = environment.HTTPS;
  private usr = environment.autorization;

  constructor(private http:HttpClient) { }

  enviarCorreo(email:any):Observable<any>{
    return this.http.post(`${this.URL}/email/enviar`,email, this.usr);
  }

  enviarUserContra(email:any):Observable<any>{
    return this.http.post(`${this.URL}/email/forgotPassword`,email, this.usr);
  }

  correoAcpetacion(email:any):Observable<any>{
    return this.http.post(`${this.URL}/email/correoAcpetacion`,email, this.usr);
  }

  envioSolicitud(email:any):Observable<any>{
    return this.http.post(`${this.URL}/email/envioSolicitud`,email, this.usr);
  }
  envioConstancia(email:any):Observable<any>{
    return this.http.post(`${this.URL}/email/enviar-constancia`,email, this.usr);
  }

}
