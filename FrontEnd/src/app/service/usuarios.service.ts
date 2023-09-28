import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = environment.HTTPS;
  private usr = environment.autorization;

  constructor(private http: HttpClient) {
    this.usr.headers = this.usr.headers.set('authorization', 'Bearer ' + localStorage.getItem('color'));
   }

  datosUser(numcontrol: any): Observable<any> {
    console.log(numcontrol);
    return this.http.post(`${this.URL}/insize/datosUser`, numcontrol, this.usr);
  }
  UsuariosNoReg(): Observable<any> {
    return this.http.get(`${this.URL}/insize/listaUserNoReg`);
  }

  NoPago(datos: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/NoPago`, datos);
  }
 
  NoPagoDesactivo(noPago: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/NoPagoDesactivo`, noPago);
  }

  obtenerDatos(nopago: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/ObtenerDatosPago`, nopago);
  }
  subirEmitido(datosRegistro: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/SubirRegistro`, datosRegistro);
  }
  verInfo(numControl: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/verInfo`, numControl);
  }
  getContra(numControl: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/getContra`, numControl);
  }
  modificarPerfil(datos: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/modifyProfile`, datos);
  }
  datosEsc(): Observable<any> {
    return this.http.get(`${this.URL}/insize/GetdatosEsc`);
  }

}
