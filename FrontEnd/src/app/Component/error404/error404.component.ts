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

<<<<<<< HEAD
  ngOnInit(): void {    
    
=======
  ngOnInit(): void {
  }
  public noti(){
    var data = "";
    Notiflix.Notify.info("El correo ha sido enviado");
  }
}
public enviar(){
  var correo = this.correo.correo;
  if(correo != null && correo != undefined && correo != ""){
    Notiflix.Notify.info("Correo Enviado");
  }
  }}
