import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  URL = "http://localhost/email/enviar";
  constructor(private http:HttpClient) { }

  enviarCorreo(email:FormData):Observable<any>{
    return this.http.post(`${URL}/correo/email/enviar`,email);
  }

}
