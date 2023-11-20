import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { JustificanteService } from 'src/app/service/justificante.service';
import { NavegacionService } from 'src/app/service/navegacion.service';


@Component({
  selector: 'app-jutificantes',
  templateUrl: './jutificantes.component.html',
  styleUrls: ['./jutificantes.component.css']
})
export class JutificantesComponent implements OnInit {
  protected justificante: any = [];
  protected justForm: any = [];

  constructor(
    private nav: NavegacionService,
    private auth: AuthService,
    private just: JustificanteService
  ){
    this.nav._usuario = this.auth.decodifica().nombre+ " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    this.nav._foto = this.auth.decodifica().foto;
    this.nav._homeAlumno = true;
  }

  ngOnInit(): void {
    if(!this.auth.isAuth()){
      this.nav._iflogin = true;
      this.nav.salir();
    }
  }

  async enviarJust(){
    this.ngOnInit();
    try{
      let res = await firstValueFrom(this.just.enviarJustificante(this.justificante));
      console.log(this.justForm);
    } catch(error){
      console.error(error);
    }
  }

}
