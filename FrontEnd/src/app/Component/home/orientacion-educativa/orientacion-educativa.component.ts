import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
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
  protected alumno: any = [] ;

  constructor(
    private nav: NavegacionService,
    private auth: AuthService,
    private just: JustificanteService,
    private user: UsuarioService,
    private admin: AdminService
 
  ) { 
    this.nav._usuario = this.auth.decodifica().nombre+ " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    this.nav._foto = this.auth.decodifica().foto;
    this.nav._orientacionEdu = true;
    this.obtenerDatos();
  }

  ngOnInit(): void {
    //this.obtenerDatos();
  }

  async obtenerDatos(){
    try{
      let res = await firstValueFrom(this.just.ListaJustificantes());
      if(res.data.length > 0){
        this.justificantes = res.data;
      }
      else{
        this.justificantes = [];
      }

    }catch(error){
      console.log(error);
    }
  }

  revisarDocumentos(numControl: number){
    //busar en el array de justificantes el id
    const datosSolicitante =  this.justificantes.find((element: any) => element.numControl == numControl);
    
    this.alumno = datosSolicitante;
    console.log(this.alumno);
  }
}
