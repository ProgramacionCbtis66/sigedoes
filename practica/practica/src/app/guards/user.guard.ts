import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ObservableService } from '../service/observable.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  public guardian:boolean = false;
  constructor(private loginService:ObservableService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if(this.loginService.getboolean()){this.guardian = true}else{ this.guardian = false}
    
    return this.guardian;
  }
  
}
