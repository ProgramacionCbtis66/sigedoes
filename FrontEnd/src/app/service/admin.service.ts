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
    return this.http.post(`${this.URL}/admin/usuarioAceptado`, numcontrol, this.usr);
  }

  guardarDatosEsc(escuela: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarDatosEsc`, escuela, this.usr);
  }
  guardarClavesEsp(claves: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEsp`, claves, this.usr);
  }
  datosEsc(): Observable<any> {
   
    return this.http.get(`${this.URL}/admin/GetdatosEsc`, this.usr);
  }
  getClavesEsp(): Observable<any> {
    return this.http.get(`${this.URL}/admin/getClavesEsp`, this.usr);
  }
  getMateriasGlobales():Observable<any>{
    return this.http.get(`${this.URL}/admin/getMateriasGlobales`, this.usr);
  }
  getMaestros():Observable<any>{
    return this.http.get(`${this.URL}/admin/getMaestros`,this.usr);
  }
  getMateriasRecursa():Observable<any>{
    return this.http.get(`${this.URL}/admin/getGlobales`, this.usr);
  }
  getMaestrosRecursa():Observable<any>{
    return this.http.get(`${this.URL}/admin/getMaestrosRecursa`, this.usr);
  }

  guardarClavesEspProg(prog: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEspProg`, prog, this.usr);
  }
  guardarClavesEspconta(conta: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEspconta`, conta, this.usr);
  }
  guardarClavesEspElectricidad(electricidad: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEspElectricidad`, electricidad, this.usr);
  }
  guardarClavesEspAlimentos(alimentos: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEspAlimentos`, alimentos, this.usr);
  }
  guardarClavesEspSoporte(soporte: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/guardarClavesEspSoporte`, soporte, this.usr);
  }

  registrarClaves(claves: any): Observable<any> {
    return this.http.post(`${this.URL}/admin/registrarClaves`, claves, this.usr);
  }
  guardarAsignacionGlobal(data:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/AsignacionGlobal`, data, this.usr);
  }
  guardarAsignacionRecursa(data:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/guardarAsignacionRecursa`, data, this.usr);
  }


}
