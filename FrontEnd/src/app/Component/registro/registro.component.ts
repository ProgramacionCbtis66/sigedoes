import { Component, OnInit } from '@angular/core';

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

}