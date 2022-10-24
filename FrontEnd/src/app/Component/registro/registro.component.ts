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

  usuario = {
    "correo": "",
    "pass": "",
    "usuario":"",
    "IdUsuario":"",
    "UserName":""
  };
  constructor() { }

  ngOnInit(): void {
  }

  Registro(){
    if (this.usuario.IdUsuario != "" && this.usuario.UserName != "" && this.usuario.correo != "" && this.usuario.pass != "" && this.usuario.usuario != ""){
      Notiflix.Loading.standard("Accesando");
    }
    else if(this.usuario.IdUsuario != "" || this.usuario.UserName != "" || this.usuario.correo != "" || this.usuario.pass != "" || this.usuario.usuario != ""){
      Notiflix.Notify.failure("Falta llenar un campo!");
    }
  }
}