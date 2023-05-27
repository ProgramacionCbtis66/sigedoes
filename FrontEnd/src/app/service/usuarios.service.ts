import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = environment.HTTPS;

  constructor(private http: HttpClient) { }


  forgotPassword(email: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/forgotPassword`, email);
  }

  datosUser(numcontrol: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/datosUser`, numcontrol);
  }

  usuarioAceptado(numcontrol: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/usuarioAceptado`, numcontrol);
  }

  UsuariosNoReg(): Observable<any> {
    return this.http.get(`${this.URL}/insize/listaUserNoReg`);
  }

  NoPago(datos: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/NoPago`, datos);
  }
  verificaNoPago(datos: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/verificaNoPago`, datos);
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
  guardarDatosEsc(escuela: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/guardarDatosEsc`, escuela);
  }
  guardarClavesEsp(claves: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/guardarClavesEsp`, claves);
  }
  optenerClavesEsp(): Observable<any> {
    return this.http.get(`${this.URL}/insize/optenerClavesEsp`);
  }
  guardarClavesEspProg(prog: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/guardarClavesEspProg`, prog);
  }
  guardarClavesEspconta(conta: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/guardarClavesEspconta`, conta);
  }
  guardarClavesEspElectricidad(electricidad: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/guardarClavesEspElectricidad`, electricidad);
  }
  guardarClavesEspAlimentos(alimentos: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/guardarClavesEspAlimentos`, alimentos);
  }
  guardarClavesEspSoporte(soporte: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/guardarClavesEspSoporte`, soporte);
  }
}
