import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

export class AuthGuardAdmin implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem("color");
    if (token !== null && token !== "") {
      let rol = this.authService.decodifica();
     
      if (this.authService.isAuth()) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }else{return false;}
    }

}
