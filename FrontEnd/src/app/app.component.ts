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
  public proyecto = environment.proyecto;
  public fecha = new Date().getFullYear();
  public dato: string = "Configuracion";
  public logo: string = '.././assets/img/logoredwhite.png';
  public title: string = environment.proyecto;
  public usuario: string  =  "";
  telefono = environment.telefono;
  foto = "";
  

  constructor(private titulo: Title, 
    private auth: AuthService, 
    private router: Router,
      protected nav: NavegacionService) { }


  public visibleLoginRegistro(): void {
    this.auth.isAuth();
  }

  public salir(): void {
    this.nav.salir();
    this.router.navigate(['login']);
  }

  public ngOnInit(): void {
    this.titulo.setTitle("SIGEDOES");
    if (this.auth.isAuth()) {
      const user = this.auth.decodifica();
      this.foto = user["foto"];
      this.usuario = user["nombre"];
      if (user.rol == "Admin") { this.nav._Administrador=true; } 
      if (user.rol == 'user') { this.nav._homeAlumno=true; }
      if (user.rol == 'Docente') { this.nav._docente=true; }
    }
  }
}
