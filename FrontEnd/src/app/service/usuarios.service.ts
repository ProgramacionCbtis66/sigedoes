import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = "http://localhost:8000";
  constructor(private http:HttpClient) { }


  forgotPassword(email:any):Observable<any>{
    console.log(email);
    return this.http.post(`${this.URL}/insize/forgotPassword`,email);
  }

  datosUser(numcontrol:any):Observable<any>{
    console.log(numcontrol);
    return this.http.post(`${this.URL}/insize/datosUser`,numcontrol);
  }

  usuarioAceptado(numcontrol:any):Observable<any>{
      return this.http.post(`${this.URL}/insize/usuarioAceptado`,numcontrol);
  }

  UsuariosNoReg():Observable<any>{
    return this.http.get(`${this.URL}/insize/listaUserNoReg`);
  }

NoPago(datos:any):Observable<any>{
    return this.http.post(`${this.URL}/insize/NoPago`,datos);
}
verificaNoPago(datos:any):Observable<any>{
  return this.http.post(`${this.URL}/insize/verificaNoPago`,datos);
}
NoPagoDesactivo(noPago:any):Observable<any>{
  return this.http.post(`${this.URL}/insize/NoPagoDesactivo`,noPago);
}

obtenerDatos(nopago:any):Observable<any>{
  return this.http.post(`${this.URL}/insize/ObtenerDatosPago`,nopago);
}
subirEmitido(datosRegistro:any):Observable<any>{
  return this.http.post(`${this.URL}/insize/SubirRegistro`,datosRegistro);
}
}
