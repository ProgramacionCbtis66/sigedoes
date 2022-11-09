import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuth()) {
      if(this.authService.decodifica().rol!="Admin") return true;
      else return false;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

export class AuthGuardAdmin implements CanActivate {

  private token: any;

  constructor(private auth: AuthService,
    private router: Router) { }

  canActivate(): boolean {
      if (this.auth.isAuth()) {
          this.token = this.auth.decodifica();

        if (this.token.rol == "Admin"){
          this.router.navigate(['Admin']);
            return true;
        } else {
          if (this.auth.isAuth()){
              this.router.navigate(['Home']);
              return true;
          }else{
              return false;
          }
        }
      }else{
        return false;
      }
    }
}
