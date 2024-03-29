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
    return this.http.get(`${this.URL}/admin/getMateriasRecursa`, this.usr);
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
  actualizaAsignacionGlobal(data:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/actualizaAsignacionGlobal`, data, this.usr);
  }
  guardarAsignacionRecursa(data:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/guardarAsignacionRecursa`, data, this.usr);
  }
  actualizaAsignacionRecursa(data:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/actualizaAsignacionRecursa`, data, this.usr);
  }

  getAsignaRecursa(data:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/getAsignaRecursas`,data, this.usr);
  }
  getAsignaGlobal(data:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/getAsignaGlobales`,data, this.usr);
  }
  
  getCEAP():Observable<any>{
    return this.http.get(`${this.URL}/admin/getCEAP`, this.usr);
  }
  actualizaCEAP(ceap:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/actualizaCEAP`,ceap, this.usr);
  }
  getSolicitudesGlobales():Observable<any>{
    return this.http.get(`${this.URL}/admin/getSolicitudesGlobales`, this.usr);
  }
  getSolicitudesRecursas():Observable<any>{
    return this.http.get(`${this.URL}/admin/getSolicitudesRecursas`, this.usr);
  }
  autorizarGlobal(autorizado:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/autorizarGlobal`,autorizado, this.usr);
  }
  traerGlobalDatos():Observable<any>{
    return this.http.get(`${this.URL}/admin/traerGlobalData`, this.usr);
  }
  aprovedGlobalComprobante(dato: any):Observable<any>{
    return this.http.post(`${this.URL}/admin/aprobarGlobalComprobar`, dato, this.usr);
  }
  traerRecursaDatos():Observable<any>{
    return this.http.get(`${this.URL}/admin/traerRecursaData`, this.usr);
  }
  aprovedRecursaComprobante(dato: any):Observable<any>{
    return this.http.post(`${this.URL}/admin/aprobarRecursaComprobar`, dato, this.usr);
  }
  autorizarRecursa(autorizado:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/autorizarRecursa`,autorizado, this.usr);
  }
  aplicaionExamenGlobal(dato:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/aplicaionExamenGlobal`,dato, this.usr);
  }
  cursoRecursa(dato:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/aplicaionRecursa`,dato, this.usr);
  }
  
}
