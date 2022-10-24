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

  usuario = {
    "correo": "",
    "pass": "",
    "pass2":"",
    "UserName":"",
  };
  
  constructor() { }

  ngOnInit(): void {
    
  }
  verificar(){
    
  }
  Registro(){
    let contra = "";
    let contra2 = "";
    let correo = "";
    let noUsuario = "";
    contra = this.usuario.pass;
    contra2 = this.usuario.pass2;
    correo = this.usuario.correo;
    noUsuario = this.usuario.UserName;

    if(contra != "" && contra2 != "" && correo != "" && noUsuario != ""){

      if(contra == contra2){
        Notiflix.Notify.info("Las contraseñas coinciden");
        Notiflix.Loading.standard("Guardando Datos");}
      else{
          Notiflix.Notify.failure("Las Contraseñas No Coinciden");
        }
    }else{
      Notiflix.Notify.warning("Debe De Llenar Todos Los Campos")
    }
    }

    public contraseña() {
      Notiflix.Loading.standard("Ingresando");
    let contra = "";
    let contra2 = "";
    contra = this.usuario.pass;
    contra2 = this.usuario.pass2;
    if(contra == contra2){
      Notiflix.Notify.info("Las contraseñas coinciden");
    }else{
      Notiflix.Notify.failure("Las Contraseñas No Coinciden");
    }
  }

  }
