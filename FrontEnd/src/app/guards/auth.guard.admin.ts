import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root',
})

export class AuthGuardAdmin implements CanActivate {

  private token: any;

  constructor(private auth: AuthService,
    private router: Router) { }

  canActivate(): boolean {
      if (this.auth.isAuth()) {
          this.token = this.auth.decodifica();
        if (this.token.rol == "CO"){
            return true;
        } else {
          if (this.auth.isAuth()){
              this.router.navigate(['homeAlumno']);
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
