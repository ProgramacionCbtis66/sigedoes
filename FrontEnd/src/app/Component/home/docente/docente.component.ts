import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Docente } from 'src/app/Modelo/Docente';
import { AuthService } from 'src/app/service/auth.service';
import { DocenteService } from 'src/app/service/docente.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  protected nombre: string = "Docente";
  protected proyecto = environment.proyecto;
  protected datosDocente = new Docente();
  constructor(
    private nav: NavegacionService,
    private docente: DocenteService,
    private auth: AuthService
  ) {
    this.nav._usuario = this.auth.decodifica().nombre+" "+this.auth.decodifica().apellidoP+" "+this.auth.decodifica().apellidoM;
    this.nav._docente = true;
    this.datos();
   }


  async datos(){
    this.datosDocente._numControl = this.auth.decodifica().numControl;
    const numControl = {
      numControl: this.datosDocente._numControl
    };
    
    try {
      const res = await  firstValueFrom(this.docente.datosDocente(numControl));
      if (res != '' && res != undefined) {
        const registro = JSON.parse(res.data);
        this.datosDocente._nombre = registro.nombre;
        this.datosDocente._apellidoP = registro.apellidoP;
        this.datosDocente._apellidoM = registro.apellidoM;
        this.datosDocente._fechaInicio = registro.fechaInicio;
        this.datosDocente._correo = registro.correo;
        this.datosDocente._CURP = registro.CURP;
        this.datosDocente._CEDULA = registro.CEDULA;
        this.datosDocente._RFC = registro.RFC;
        this.datosDocente._gradoAcademico = registro.gradoAcademico;
        this.datosDocente._foto = registro.foto;
        console.log(this.datosDocente);
      }
    } catch (error) {
      
    }
    
  }

  ngOnInit(): void {
    
  }

}
