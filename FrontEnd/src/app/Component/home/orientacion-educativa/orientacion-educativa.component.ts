import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
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
    private admin: AdminService,
    private Link: Router
 
  ) { 
    this.nav._usuario = this.auth.decodifica().nombre+ " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    this.nav._foto = this.auth.decodifica().foto;
    this.nav._orientacionEdu = true;
    this.obtenerDatos();
  }

  ngOnInit(): void {
   if(!this.auth.isAuth()){
    this.nav._iflogin = true;
    this.Link.navigate(['/']);
   }
  }

  async obtenerDatos(){
    this.ngOnInit()
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
    this.ngOnInit()
    //busar en el array de justificantes el id
    const datosSolicitante =  this.justificantes.find((element: any) => element.numControl == numControl);
    
    this.alumno = datosSolicitante;
    
  }

  async aprobarJustificante(op: number){
    this.ngOnInit()
    try{
      this.alumno.estado=op;
      let res = await firstValueFrom(this.just.aprobarJustificante(this.alumno));
      if(res.data){
        Notiflix.Notify.success("Respuesta enviada al alumno");
          this.alumno.asunto= "Envio de Justificante";
          this.alumno.nombre = this.alumno.nombre + " " + this.alumno.apellidoP + " " + this.alumno.apellidoM;
          this.alumno.nombreOE = this.auth.decodifica().nombre + " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
          
        let email = await firstValueFrom(this.just.notificacion(this.alumno));
        this.obtenerDatos();
      }
    }catch(error){
      console.log("error",error);
    }
  }

  async rechazarJustificante(op: number){
    this.ngOnInit()
    try{
      this.alumno.estado=op;
      let res = await firstValueFrom(this.just.rechazarJustificante(this.alumno));
      if(res.data){
        Notiflix.Notify.success("Enviando  CORREO respuesta enviada al alumno");
        this.alumno.asunto= "Envio de Notificación de observaciones del Justificante";
        this.alumno.nombre = this.alumno.nombre + " " + this.alumno.apellidoP + " " + this.alumno.apellidoM;
        this.alumno.nombreOE = this.auth.decodifica().nombre + " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
        let email = await firstValueFrom(this.just.notificacion(this.alumno));
        this.obtenerDatos();
      }
    }catch(error){
      console.log(error);
    }
  }
}
