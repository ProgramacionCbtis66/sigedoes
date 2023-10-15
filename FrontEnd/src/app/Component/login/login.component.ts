import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as Notiflix from 'notiflix';
import { environment } from 'src/environments/environment';
import { NavegacionService } from 'src/app/service/navegacion.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = "Inicio de Sesión";
  logoCbtis = '.././assets/img/inicio.png';
  forgotimg = '.././assets/img/forgotp.png';
  usuario = { "nombre": "", "pass": "" };


  public proyecto: string = environment.proyecto;

  constructor(private auth: AuthService, private router: Router, private nav: NavegacionService) {
    nav._iflogin = true;
  }

  ngOnInit(): void { }
  public registrarse(): void { this.router.navigate(['registro']); }
  public Acceso(): void {
    if (this.usuario.nombre !== "" && this.usuario.pass !== "") {
      try {
        
        this.auth.acceso(this.usuario).subscribe(
          (res: any) => {
            if (res.token !== null && res.token != undefined) {
              localStorage.setItem('color', res.token);
              Notiflix.Notify.success("Bienvenido " + this.auth.decodifica().nombre + " " + this.auth.decodifica().apellidoPaterno + " " + this.auth.decodifica().apellidoMaterno+" "+this.auth.decodifica().rol);
              if (this.auth.isAuth()) {
                if (this.auth.decodifica().rol == "CO") {
                  this.nav._Administrador = true;
                  this.nav._iflogin = false;
                  this.router.navigate(['/admin']);
                }
                if (this.auth.decodifica().rol == "DO") {
                  this.nav._docente = true;
                  this.nav._iflogin = false;
                  this.router.navigate(['/homeDocente']);
                }
                if (this.auth.decodifica().rol == "AL") {
                  this.nav._homeAlumno = true;
                  this.nav._iflogin = false;
                  this.router.navigate(['/homeAlumno']);
                }

              } else if (res.Error == "Usuario y contraseña incorrecta") {
                 
                Notiflix.Notify.warning(res.Error);
              } else {
                
                Notiflix.Notify.failure(res.Error);
              }
            }
          },
          (error) => {
            // Manejar el error aquí
            
            Notiflix.Notify.failure("Error : " + "APi rechaza la peticion por dominio no autorizado");
            console.error(error); // Puedes mostrar el error en la consola o en la interfaz de usuario
          }
        );
      } catch (error) {
        
        Notiflix.Notify.failure("Error : " + "APi rechaza la peticion por dominio no autorizado");
      }

    } else {
      Notiflix.Notify.failure("Usuario o contraseña vacio, llene los campos");
    }
  }
}
