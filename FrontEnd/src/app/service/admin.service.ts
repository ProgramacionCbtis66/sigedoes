import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private URL = environment.HTTPS;
  private usr = environment.autorization;
  constructor(private http:HttpClient) {
    this.usr.headers = this.usr.headers.set('authorization', 'Bearer ' + localStorage.getItem('color'));
   }
   verificaNoPago(datos: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/verificaNoPago`, datos, this.usr);
  }

  enviarSolicitud(solicitud:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/solicitud`,solicitud);
  }
  
  usuarioAceptado(numcontrol: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/usuarioAceptado`, numcontrol);
  }

  guardarDatosEsc(escuela: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarDatosEsc`, escuela);
  }
  guardarClavesEsp(claves: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEsp`, claves);
  }
  getClavesEsp(): Observable<any> {
    return this.http.get(`${this.URL}/admin/getClavesEsp`);
  }
  guardarClavesEspProg(prog: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEspProg`, prog);
  }
  guardarClavesEspconta(conta: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEspconta`, conta);
  }
  guardarClavesEspElectricidad(electricidad: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEspElectricidad`, electricidad);
  }
  guardarClavesEspAlimentos(alimentos: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEspAlimentos`, alimentos);
  }
  guardarClavesEspSoporte(soporte: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEspSoporte`, soporte);
  }

  registrarClaves(claves: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/registrarClaves`, claves, this.usr);
  }


}
