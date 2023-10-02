import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { NavegacionService } from 'src/app/service/navegacion.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  constructor(private nav:NavegacionService) { }

  ngOnInit(): void {
    this.nav._mostrar=false;
  }

}
