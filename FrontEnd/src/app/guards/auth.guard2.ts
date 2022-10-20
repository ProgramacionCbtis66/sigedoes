import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})


export class AuthLogin implements CanActivate {


  constructor(private authService: AuthService,
    private router: Router) { }


  canActivate(): boolean {
   if (this.authService.isAuth()) {
      this.router.navigate(['home'])
      return false;
    } else {
      return true;
    }
  }
}

