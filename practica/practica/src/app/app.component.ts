import { Component, OnInit } from '@angular/core';
import { ClientesService } from './service/clientes.service';
import { ObservableService } from './service/observable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'practica';
  public admin: boolean = false;
  public normal: boolean = false;
  constructor(
    private loginService: ObservableService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.loginService.getAdminBoolean()) {
      this.admin = true;
    } else if (this.loginService.getboolean()) {
      this.normal = true;
    } else {
      this.normal = false;
      this.admin = false;
    }
    localStorage.clear();
  }

  public AccessHome(): void {
    if (this.loginService.getboolean()) {
      this.router.navigateByUrl('Home');
    }
  }

  public AccessAdmin(): void {
    if (this.loginService.getAdminBoolean()) {
      this.router.navigateByUrl('Admin');
    }
  }

  public AccessLogin(): void {
    this.loginService.admin(false);
    this.loginService.login(false);
    this.router.navigateByUrl('Login');
    this.ngOnInit();
  }
  public deslogear(){
    this.normal = false;
    this.admin = false;
  }
}
