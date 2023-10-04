import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  protected nombre: string = "Docente";
  protected proyecto = environment.proyecto;
  protected datosDocente = { 
    "numControl": 0,
    "nombre": "",
    "curp": "",
    "rfc": "",
    "especialidad": "",
  }
  constructor() {
    
   }

  ngOnInit(): void {
  }

}
