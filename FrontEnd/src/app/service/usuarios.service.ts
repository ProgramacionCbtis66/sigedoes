import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = "http://localhost:8000";
  constructor(private http:HttpClient) { }


  forgotPassword(email:any){
    console.log(email);
    return this.http.post(`${this.URL}/insize/forgotPassword`,email);
  }

  datosUser(numcontrol:any){
    console.log(numcontrol);
    return this.http.post(`${this.URL}/insize/datosUser`,numcontrol);
  }

  usuarioAceptado(numcontrol:any){
      return this.http.post(`${this.URL}/insize/usuarioAceptado`,numcontrol);
  }

  UsuariosNoReg(){
    return this.http.get(`${this.URL}/insize/listaUserNoReg`);
  }

NoPago(datos:any){
    return this.http.post(`${this.URL}/insize/NoPago`,datos);
}
verificaNoPago(datos:any){
  return this.http.post(`${this.URL}/insize/NoPago`,datos);
}
NoPagoDesactivo(noPago:any){
  return this.http.post(`${this.URL}/insize/NoPagoDesactivo`,noPago);
}

}
