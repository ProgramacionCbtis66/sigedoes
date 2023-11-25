import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecursaService {
  private URL = environment.HTTPS;
  private usr = environment.autorization;

  constructor(private http: HttpClient){
    this.usr.headers = this.usr.headers.set('authorization', 'Bearer ' + localStorage.getItem('color'));
  }

  listaRecursas(numControl: any): Observable<any>{
    return this.http.post(`${this.URL}/recursas/getrecursas`, numControl, this.usr);
  }
  crearSolicitud(dato: any): Observable<any>{
    return this.http.post(`${this.URL}/recursas/solicitudRecursas`, dato, this.usr);
  }
  enviarPago(datoPago:any): Observable<any>{
    return this.http.post(`${this.URL}/recursas/sendPagosrecursas`, datoPago, this.usr);
  }
}
