import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  private URL = environment.HTTPS;

  constructor(private http:HttpClient) { }

  enviarCorreo(email:any):Observable<any>{
    return this.http.post(`${this.URL}/email/enviar`,email);
  }

  enviarUserContra(email:any):Observable<any>{
    return this.http.post(`${this.URL}/email/forgotPassword`,email);
  }

  correoAcpetacion(email:any):Observable<any>{
    return this.http.post(`${this.URL}/email/correoAcpetacion`,email);
  }

  envioSolicitud(email:any):Observable<any>{
    return this.http.post(`${this.URL}/email/envioSolicitud`,email);
  }
  envioConstancia(email:any):Observable<any>{
    return this.http.post(`${this.URL}/email/enviar-constancia`,email);
  }

}
