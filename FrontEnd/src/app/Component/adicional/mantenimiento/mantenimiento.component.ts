import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  protected llave: string = ".././assets/img/llave.png";

  constructor() { }

  ngOnInit(): void {
  }

}
