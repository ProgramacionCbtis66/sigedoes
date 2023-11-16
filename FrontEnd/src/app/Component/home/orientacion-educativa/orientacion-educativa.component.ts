import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { JustificanteService } from 'src/app/service/justificante.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { UsuarioService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-orientacion-educativa',
  templateUrl: './orientacion-educativa.component.html',
  styleUrls: ['./orientacion-educativa.component.css']
})
export class OrientacionEducativaComponent implements OnInit {
  protected nombre:string = "administrativo";
  protected justificantes: any= [];
  protected alumno: any;

  constructor(
    private nav: NavegacionService,
    private auth: AuthService,
    private just: JustificanteService,
    private user: UsuarioService
    //private alumno: Justifi,
  ) { 
    this.nav._usuario = this.auth.decodifica().nombre+ " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    this.nav._foto = this.auth.decodifica().foto;
    this.nav._orientacionEdu = true;
    this.cargaSolicitudes();
  }

  ngOnInit(): void {
  }

  async cargaSolicitudes(){
    try{
      let res = await firstValueFrom(this.just.ListaJustificantes());
      this.justificantes = res;
    }
  }
}
