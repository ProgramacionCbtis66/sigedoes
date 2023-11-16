import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JustificanteService {
  private URL = environment.HTTPS;
  private usr = environment.autorization;
  
  constructor(private http: HttpClient){}

  ListaJustificantes(): Observable<any>{
    return this.http.get(`${URL}/just/obtenerdatos`, this.usr);
  }

  guardarJustificante(guardarJust: any): Observable<any>{
    return this.http.post(`${URL}/just/guardardatos`, guardarJust, this.usr);
  }
}
