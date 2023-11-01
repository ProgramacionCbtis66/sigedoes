import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { firstValueFrom } from 'rxjs';
import { Docente } from 'src/app/Modelo/Docente';
import { AuthService } from 'src/app/service/auth.service';
import { DocenteService } from 'src/app/service/docente.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  protected nombre: string = "Docente";
  protected materiaRecursa: any;
  protected periodoRecursa: any;
  protected materiaGlobal: any;
  protected periodoGlobal: any;
  protected numControlAlumnoGlobal: string = "";
  protected numControlAlumnoRecursa: string = "";
  protected alumnosGlobales: any = [];
  protected alumnosRecursas: any = [];
  protected materias: any = [];
  protected materiasG: any = [];
  protected periodoEscolar: any = [];
  protected proyecto = environment.proyecto;
  protected datosDocente = new Docente();
  constructor(
    private nav: NavegacionService,
    private docente: DocenteService,
    private auth: AuthService,
    private alumno: UsuarioService,
  ) {
    this.nav._usuario = this.auth.decodifica().nombre + " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    this.nav._docente = true;
    this.datos();
    this.datosMateria()
    this.datosPeridoEscolar()
  }

  async datos() {
    this.datosDocente._numControl = this.auth.decodifica().numControl;
    const numControl = {
      numControl: this.datosDocente._numControl
    };

    try {
      const res = await firstValueFrom(this.docente.datosDocente(numControl));
      if (res != '' && res != undefined) {
        const registro = res.data;
        this.datosDocente._nombre = registro.nombre;
        this.datosDocente._apellidoP = registro.apellidoP;
        this.datosDocente._apellidoM = registro.apellidoM;
        this.datosDocente._correo = registro.correo;
        this.datosDocente._curp = registro.CURP;
        this.datosDocente._CEDULA = registro.CEDULA;
        this.datosDocente._RFC = registro.RFC;
        this.datosDocente._gradoAcademico = registro.gradoAcademico;
        if (registro.foto == null || registro.foto == undefined || registro.foto == "") {
          this.datosDocente._foto = ".././assets/img/tufoto.png";
        } else {
          this.datosDocente._foto = registro.foto;
        }
        this.nav._foto = this.datosDocente._foto;
      }
    } catch (error) {

    }
  }

  ngOnInit(): void {

  }

  validandoLlenado(datos: any, numcontrol: any): boolean {
    for (let alumno of datos) {
      if (alumno.numControl == numcontrol) {
        return true;
      }
    }
    return false;
  }

  validandotabla(datos: any): boolean {
    if (datos.control == "global") {
      this.docente.validandoTablaGR(datos).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
            Notiflix.Notify.warning("Alumno ya esta en la lista de Global con la materia " + res.data.materia + " en el periodo " + res.data.periodo)+ " con el estatus " + res.data.estatus;
          return true;
        }else{
          
          return false;
        }
      });
    }else{
      this.docente.validandoTablaGR(datos).subscribe((res: any) => {
        if (res.status == 200) {
          return true;
        }else{
          return false;
        }
      });
    }
    return false;
  }

  async buscarAlumno(evento: any) {
    let encontrado, listaEncontrado;
    let numeroCtrl:any = {};
    if (evento.target.id == "global") {
       numeroCtrl = {
        numControl: this.numControlAlumnoGlobal,
        materia: this.materiaGlobal,
        periodo: this.periodoGlobal,
        control: "global"
      };
      listaEncontrado = this.validandoLlenado(this.alumnosGlobales, this.numControlAlumnoGlobal);
      encontrado = this.validandotabla(numeroCtrl);
      
    }
    if (evento.target.id == "recursa") {
      numeroCtrl = {
        numControl: this.numControlAlumnoRecursa,
        materia: this.materiaRecursa,
        periodo: this.periodoRecursa,
        control: "recursa"
      };
      listaEncontrado = this.validandoLlenado(this.alumnosRecursas, this.numControlAlumnoRecursa);
      encontrado = this.validandotabla(numeroCtrl);
    }
    //buscar en el array alumnosGlobales un nombre

    if (!listaEncontrado) {
      if(!encontrado){
       
      try {
        const respuesta = await firstValueFrom(this.alumno.verInfo(numeroCtrl));

        if (respuesta.data != '' && respuesta.data != undefined) {
          if (evento.target.id == "global") this.alumnosGlobales.push(respuesta.data);
          if (evento.target.id == "recursa") this.alumnosRecursas.push(respuesta.data);
        } else {
          Notiflix.Notify.failure("Alumno no encontrado en tabla de alumnos");
        }
      } catch (error) {
        console.log(error);
      }
    }
    } else {
      Notiflix.Notify.warning("Alumno ya esta en la lista");
    }
  }

  eliminarAlumno(alumno: any, array: any) {
    if (array == "global") { this.alumnosGlobales = this.alumnosGlobales.filter((item: any) => item.numControl != alumno); }
    if (array == "recursa") { this.alumnosRecursas = this.alumnosRecursas.filter((item: any) => item.numControl != alumno); }
  }

  async datosMateria() {
    const datos = await firstValueFrom(this.docente.datosMateria(""));
    if (datos.data != '' && datos.data != undefined) {
      this.materias = datos.data;
      this.materiasG = this.materias.filter((item: any) => item.tipo == "BASICA");
    }
  }

  async datosPeridoEscolar() {
    const datos = await firstValueFrom(this.docente.datosPeriodoEscolar(""));
    if (datos.data != '' && datos.data != undefined) {
      this.periodoEscolar = datos.data;
    }
  }

  enviarRecursa(event: any) {
    Notiflix.Loading.pulse('Enviando alumnos a recursar...');
    if (this.alumnosRecursas.length > 0) {
      let datos = {
        alumnos: this.alumnosRecursas,
        materia: this.materiaRecursa,
        periodo: this.periodoRecursa,
        docente: this.auth.decodifica().numControl
      }
      this.docente.enviarRecursa(datos).subscribe((res: any) => {
        if (res.status == 200) {
          Notiflix.Loading.remove();
          Notiflix.Notify.success("Alumnos enviados a recursar");
          this.alumnosRecursas = [];
        } else {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure("Algo salio mal");
        }
      });
    } else {
      Notiflix.Loading.remove();
      Notiflix.Notify.warning("No hay alumnos en la lista");
    }
  }

  enviarGlobales(event: any) {
    Notiflix.Loading.pulse('Enviando alumnos a Global...');
    if (this.alumnosGlobales.length > 0) {
      let datos = {
        alumnos: this.alumnosGlobales,
        materia: this.materiaGlobal,
        periodo: this.periodoGlobal,
        docente: this.auth.decodifica().numControl
      }

      this.docente.enviarRecursa(datos).subscribe((res: any) => {
        if (res.status == 200) {
          Notiflix.Loading.remove();
          Notiflix.Notify.success("Alumnos enviados a recursar");
          this.alumnosGlobales = [];
        } else {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure("Algo salio mal");
        }
      });
    } else {
      Notiflix.Loading.remove();
      Notiflix.Notify.warning("No hay alumnos en la lista");
    }
  }

}
