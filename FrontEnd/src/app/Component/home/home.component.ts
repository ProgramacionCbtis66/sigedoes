import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import * as Notiflix from 'notiflix';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alumno = localStorage.getItem('nombre');
  curp = localStorage.getItem('curp');
  correo = localStorage.getItem('correo');
  noctrl = localStorage.getItem('noctrl');
  especialidad = localStorage.getItem('especialidad');
  semestre = localStorage.getItem('semestre');
  area = localStorage.getItem('area');
  turno = localStorage.getItem('turno');

  constructor(private auth:AuthService) { }
  home = {
    "NoPago":""
  }
  ngOnInit(): void {
    let nombre = localStorage.getItem('nombre');
    Notiflix.Notify.info("Bienvenido "+nombre);
  }
  public name() {
    
  }

  comprobar(){
    if(this.home.NoPago != null && this.home.NoPago != undefined && this.home.NoPago != ""){
      Notiflix.Notify.info("Revisando Código");
    }
  }
}
