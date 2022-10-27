import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public noti(){
    var data = "";
    Notiflix.Notify.info("El correo ha sido enviado");
  }
}
