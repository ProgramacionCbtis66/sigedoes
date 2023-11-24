import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { RecursaService } from 'src/app/service/recursa.service';
import { UsuarioService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-recursa',
  templateUrl: './recursa.component.html',
  styleUrls: ['./recursa.component.css']
})
export class RecursaComponent implements OnInit {
  protected recursaDatos = {
    alumnoNumControl: '',
    idMateria: '',
    idPeriodo: '',
    docenteDni: '',
    fecha: '',
    estado: 4,
    docenteDniApli: '',
  }

  constructor(
    private alumno: UsuarioService,
    private recursa: RecursaService,
    private auth: AuthService,
    private nav: NavegacionService,
  ){
    this.nav._usuario = this.auth.decodifica().nombre+ " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    this.nav._foto = this.auth.decodifica().foto;
    this.nav._recursa = true;
  }

  ngOnInit(): void {
  }

}
