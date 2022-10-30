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
    
  }
}
