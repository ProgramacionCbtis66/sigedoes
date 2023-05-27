import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ObservableService } from 'src/app/service/observable.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public regreso:boolean = false;
  constructor(private loginService: ObservableService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.loginService.getAdminBoolean()) { this.regreso =true}else {this.regreso = false}

    return this.regreso;
    
  }
  
}
