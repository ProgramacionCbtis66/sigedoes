import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';
import * as Notiflix from 'notiflix';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = "Inicio de Sesión";
  logoCbtis = '.././assets/img/foto.jpg';
  juan = "";
  usuario = {
    "nombre": "",
    "pass": ""
  };

  constructor(private auth: AuthService, private router: Router, private app: AppComponent) {app.registro=false ;}

  ngOnInit(): void {

  }
  forgotPassword(){
    this.router.navigate(['forgotPassword']);
  }

  registrarse(){
    this.router.navigate(['registro']);
  }
  Acceso() {
    if (this.usuario.nombre !== "" && this.usuario.pass !== "") {
      Notiflix.Loading.standard("Accesando");
      this.auth.login(this.usuario).subscribe((res: any) => {
        if (res.token !== null && res.token != undefined) {
          localStorage.setItem('color', res.token);
          localStorage.setItem('nombre',this.usuario.nombre);
          localStorage.setItem('data',res.dataa.user);
          localStorage.setItem('correo',res.dataa.correo);
          localStorage.setItem('curp',res.dataa.curp);
          localStorage.setItem('noctrl',res.dataa.iduser);
          localStorage.setItem('especialidad',res.dataa.especialidad);
          localStorage.setItem('area',res.dataa.area);
          localStorage.setItem('turno',res.dataa.turno);
          this.app.visibleLoginRegistro();

          Notiflix.Loading.remove();
          if(this.auth.decodifica().rol =="Admin"){
            this.app.Administrador=true;
          }
          this.router.navigate(['/home']);
        } else if (res.Error == "Usuario y contraseña incorrecta") {
          Notiflix.Loading.remove();
          Notiflix.Notify.warning(res.Error);
        } else {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure(res.Error);
        }
      });
    } else {
      Notiflix.Notify.failure("Usuario o contraseña vacio, llene los campos");
    }
  }
}
