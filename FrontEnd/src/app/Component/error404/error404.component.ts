import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
  correo = {
    "correo":""
  }
  constructor() { }

  ngOnInit(): void {    
    
}
public enviar(){
  var correo = this.correo.correo;
  if(correo != null && correo != undefined && correo != ""){
    Notiflix.Notify.info("Correo Enviado");
  }
  }}
