import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';
import * as Notiflix from 'notiflix';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registrarse = 'Registrarse';
  informacion = 'Info';
  infografia: string = '.././assets/img/infografiaa.png';
  usuario = {
    "nombre": "",
    "correo": "",
    "pass": "",
    "pass2": "",
    "curp": "",
    "noctrl": "",
    "especialidad": "",
    "semestre": "",
    "area": "",
    "turno": "",
    "direccion": "",
    "CTO": "30DCT0236O",
    "grupo": ""
  }
  datanecesario = {
    "numControl": "",
    "nombre": "",
    "direccion": "",
    "especialidad": "",
    "area": "",
    "grado": "",
    "grupo": "",
    "turno": "",
    "horario": "",
    "CTO": "",
    "correo": "",
    "alta": "0",
    "CURP": "",

  }

  constructor(private auth: AuthService, private router: Router, private app: AppComponent) { app.registro = true; app.iflogin = false; }

  ngOnInit(): void { }

  area(){
    switch(this.usuario.especialidad){
      case "Programacion" : case "Electricidad" : case "Soporte" :
        this.usuario.area = "Físico Matemático"; break;
      case "Contabilidad":
        this.usuario.area = "Económico Administrativo"; break;
      case "Alimentos":
          this.usuario.area = "Químico Biológico"; break;
    }
    alert(this.usuario.area);
  }

  Registro() {
    let contra = this.usuario.pass2;
    let contra2 = this.usuario.pass;
    if (contra == contra2) {
      if (this.usuario.correo !== "" && this.usuario.pass !== "" && this.usuario.pass2 !== "" && this.usuario.curp !== "" && this.usuario.noctrl !== "" && this.usuario.especialidad !== "" && this.usuario.semestre !== "" && this.usuario.area !== "" && this.usuario.turno !== "" && this.usuario.grupo != "") {
        Notiflix.Loading.standard("Validando");
        this.auth.registro(this.usuario).subscribe((res: any) => {
          if (res.Aceptado == "Datos Aceptados") {
            Notiflix.Loading.remove();
            Notiflix.Notify.info("Registro de datos en verificación");
            this.router.navigate(['/login']);
          } else if (res.Error == "Los Datos No Fueron Aceptados") {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure(res.Error);
          }
        });
      } else {
        Notiflix.Notify.failure("Por favor llene todos los campos");
      }
    } else {
      Notiflix.Notify.failure("Las contraseñas no coinciden");
    }
  }
  
  areaa(){
    if(this.usuario.especialidad == "Programacion" || this.usuario.especialidad == "Soporte Y Mantenimieto Equipo De Computo" || this.usuario.especialidad == "Electricidad"){
      this.usuario.area = "Físico Matemático";
    }else if(this.usuario.especialidad == "Contabilidad"){
      this.usuario.area = "Económico Administrativo";
    }else if(this.usuario.especialidad == "Producción Industrial De Alimentos"){
      this.usuario.area = "Químico Biológico";
    }
  }
}

