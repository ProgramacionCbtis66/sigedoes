import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-olvide-pass',
  templateUrl: './olvide-pass.component.html',
  styleUrls: ['./olvide-pass.component.css']
})
export class OlvidePassComponent implements OnInit {

  constructor() { }
  correo = {
    "correo":""
  }
  ngOnInit(): void {
  }
  public enviar(){
    var correo = this.correo.correo;
    if(correo != null && correo != undefined && correo != ""){
      Notiflix.Notify.info("El correo ha sido enviado");
    }
    }
}
