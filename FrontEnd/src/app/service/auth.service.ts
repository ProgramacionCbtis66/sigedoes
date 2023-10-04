import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NavegacionService } from './navegacion.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ruta = environment.HTTPS;
  public estatus: boolean = true;

  private _usuarioLogeadoSubject = new BehaviorSubject<boolean>(false);
  private _adminSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, 
    private jwt: JwtHelperService,
    private nav: NavegacionService
    ) { }

  get usuarioLogeado(): BehaviorSubject<boolean> {
    if (this.decodifica() && this.tokeExpired()) {
      this._usuarioLogeadoSubject.next(true);
    } else {
      this._usuarioLogeadoSubject.next(false);
    }
    return this._usuarioLogeadoSubject;
  }

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

  public olvContra(correo: any): Observable<any> {
    return this.http.post(`${this.ruta}/auth/recuperarContraseña`, correo);
  }

  public isAuth(): boolean {
    const token = localStorage.getItem("color");
    if (token !== null && token !== "" && !this.tokeExpired()) {
      if (this.jwt.isTokenExpired(token) || localStorage.getItem("color") == "undefined") {
        this.estatus = true;
        this.nav._mostrar=true;
        this.nav._iflogin=true;
        this.nav._logout=false;
        return false;
      } else {
        this.estatus = false;
        this.nav._mostrar=true;
        this.nav._iflogin=false;
        this.nav._logout=true;
        return true;
      }
    } 
    this.nav._mostrar=true;
    this.nav._iflogin=true;
    this.nav._logout=false;
    return false;
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
