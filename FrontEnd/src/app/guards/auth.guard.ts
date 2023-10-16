import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,  UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean |UrlTree {
    const activatedRoute = route.routeConfig?.path;
    if (this.authService.isAuth()) {
      
      if(this.authService.decodifica().rol=="AL"){
        if(activatedRoute=="Alumnoconstancia" || activatedRoute=="homeAlumno"){ return true;}
        else { this.router.navigate(['/homeAlumno']);}
      } 
      if(this.authService.decodifica().rol=="DO"){
        if(activatedRoute=="homeDocente") {return true;}
        else {this.router.navigate(['/homeDocente']);}
      } 
      if(this.authService.decodifica().rol=="CO"){
        if(activatedRoute=="admin") {return true;}
        else { this.router.navigate(['/admin']);}
      }
      if(this.authService.decodifica().rol=="OD"){
        if(activatedRoute=="orientacionEdu") {return true;}
        else { this.router.navigate(['/orientacionEdu']);}
      }
      return false;
    } else {
      this.router.navigate(['/login']);
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
