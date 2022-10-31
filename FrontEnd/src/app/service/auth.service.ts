import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://localhost:8000";

  estatus: boolean = true;


  constructor(private http: HttpClient,
    private jwt: JwtHelperService) { }

  public login(user: any) {
    return this.http.post(`${this.URL}/insize/login`, user);
  }
  public registro(usuario:any){
    return this.http.post(`${this.URL}/insize/registro`,usuario);
  }

  isAuth(): boolean {
    const token = localStorage.getItem("color");
    if (token !== null && token !== "" && !this.tokeExpired()) {

      if (this.jwt.isTokenExpired(token) || localStorage.getItem("color") == "udefined") {
        this.estatus = true;
        return false;
      } else {
        this.estatus = false;
        return true;
      }
    } return false;
  }

  decodifica(): any {
    return decode(localStorage.getItem("color"));
  }

  tokeExpired(): boolean {
    const tokenDecode = this.decodifica();
    var tiempo = (tokenDecode.exp - Date.now() / 1000 ) ;
    if (tiempo < 0) {
       localStorage.clear();
       return true;
    } else {
      return false;
    }
  }

}
