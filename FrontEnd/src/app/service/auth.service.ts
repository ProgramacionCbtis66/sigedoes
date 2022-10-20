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

  isAuth(): boolean {
    const token = localStorage.getItem("color");
    if (token !== null && token !== "sin colores") {
      if (this.jwt.isTokenExpired(token) || localStorage.getItem("color") == "udefined") {
        this.estatus= true;
        return false;
      } else {
        this.estatus= false ;
        return true;
      }
    } return false;
  }

  decodifica(): any {
    const token = localStorage.getItem("color");
    const cod = decode(token);
    return cod;
  }

}
