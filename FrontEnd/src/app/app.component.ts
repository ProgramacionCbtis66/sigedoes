import {  Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { NavegacionService } from './service/navegacion.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public dato: string = "Configuracion";
  public foto: string = "";
  public logo: string = '.././assets/img/logocl.png';
  public title: string = environment.proyecto;
  public usuario: string  =  "";
  

  constructor(private titulo: Title, 
    private auth: AuthService, 
    private router: Router,
      protected nav: NavegacionService) { }


  public visibleLoginRegistro(): void {
    if (this.auth.isAuth()) {
      this.nav._iflogin= false;
      this.nav._mostrar= true;
    } else {
      this.nav._mostrar = false;
      this.nav._iflogin = true;
    }
  }

  public salir(): void {
    this.auth.estatus = false;
    this.nav._mostrar=false;
    this.nav._registro= false;
    this.nav._iflogin=true;
    this.nav._Administrador= false;
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public ngOnInit(): void {
    this.titulo.setTitle(this.title);
    if (this.auth.isAuth()) {
      this.nav._mostrar=true;
      this.nav._iflogin=true;
      this.nav._logout=true;
      const user = this.auth.decodifica();
      this.foto = '.././assets/img/' + user["nombre"] + '.jpg';
      this.usuario = user["nombre"];
      if (user.rol == "Admin") { this.nav._Administrador=true; }
      if (user.rol == 'user') { this.nav._Administrador=false; }
      if (user.rol == 'Docente') { this.nav._docente=true; }

    } else {
      this.nav._mostrar=false;
      this.nav._iflogin=true;
      this.nav._logout=false;
    }
  }
}
