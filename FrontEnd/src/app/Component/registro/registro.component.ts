import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';
import * as Notiflix from 'notiflix';
import { notDeepEqual } from 'assert';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registrarse = 'Registrarse';
  informacion = 'Info';
  infografia : string = '.././assets/img/infografia.png';
  usuario = {
    "correo": "",
    "pass": "",
    "pass2":"",
    "UserName":"",
    "curp":"",
    "noctrl":"",
    "especialidad":"",
    "semestre":"",
    "area":"",
    "turno":""
  };

  constructor(private auth: AuthService,  private router: Router, private app : AppComponent) { app.registro=true; app.iflogin=false;}

  ngOnInit(): void {}
  Registro(){
   
    if (this.usuario.correo !== "" && this.usuario.pass !== "" && this.usuario.pass2 !== "" && this.usuario.UserName !== "" && this.usuario.curp !== "" && this.usuario.noctrl !== ""  && this.usuario.especialidad !== ""  && this.usuario.semestre !== "" && this.usuario.area !== "" && this.usuario.turno !== "")
    {
      Notiflix.Loading.standard("Accesando");
      this.auth.login(this.usuario).subscribe((res: any) => 
      {
        if (res.token !== null && res.token != undefined) 
        {
          localStorage.setItem('color', res.token);
          this.app.visibleLoginRegistro();
          Notiflix.Loading.remove();
          this.router.navigate(['/home']);
        } else if (res.Error == "Usuario y contraseña incorrecta") 
        {
          Notiflix.Loading.remove();
          Notiflix.Notify.warning("Usuario y contraseña incorrecta");
        } else 
        {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure("Error de conexion, intente mas tarde");
        }
      });
    } else {
      Notiflix.Notify.failure("Usuario o contraseña vacio, llene los campos");
    }
  }
}
  
