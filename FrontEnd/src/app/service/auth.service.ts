import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
 



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ruta = environment.HTTPS;
  private usr = environment.autorization;
  public estatus: boolean = true;

  

  constructor(private http: HttpClient, 
    private jwt: JwtHelperService,
    ) { }

   
  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    const status = error.status;
    console.error(`Status: ${status}`);
    return throwError(()=>error);
  }

  public acceso(usuario: any): Observable<any> {
    return this.http.post(`${this.ruta}/auth/acceso`, usuario).pipe(
      catchError(this.handleError));
  }

  public registro(usuario: any): Observable<any> {
    return this.http.post(`${this.ruta}/auth/registro`, usuario);
  }

  public solicitudAcceso(solicitud: any): Observable<any> {
    return this.http.post(`${this.ruta}/auth/solicitudAcceso`, solicitud,this.usr);
  }

  public olvContra(correo: any): Observable<any> {
    return this.http.post(`${this.ruta}/auth/recuperarContraseña`, correo);
  }

  public isAuth(): boolean {
    const token = localStorage.getItem("color");
    if (token !== null && token !== "" && !this.tokeExpired()) {
      if (this.jwt.isTokenExpired(token) || localStorage.getItem("color") == "undefined") {
        return false;
      } else {
        return true;
      }
    }else{
      return false;
    }
  }

  public decodifica(): any {
    return decode(localStorage.getItem("color"));
  }

  public tokeExpired(): boolean {
    const tokenDecode = this.decodifica();
    var tiempo = (tokenDecode.exp - Date.now() / 1000);
    if (tiempo < 0) {
      localStorage.clear();
      return true;
    } else {
      return false;
    }
  }

  public userToken(token: any, kill?: string): void {
    if (kill) {
      localStorage.clear();
    } else {
      localStorage.setItem('token', token);
    }
  }

}
