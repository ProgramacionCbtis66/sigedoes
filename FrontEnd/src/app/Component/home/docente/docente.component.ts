import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { firstValueFrom } from 'rxjs';
import { Docente } from 'src/app/Modelo/Docente';
import { AuthService } from 'src/app/service/auth.service';
import { DocenteService } from 'src/app/service/docente.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css'],
})
export class DocenteComponent implements OnInit {
  protected nombre: string = 'Docente';
  protected disableGlobal: boolean = false;
  protected disableRecursa: boolean = false;
  protected encontrado = false;
  protected materiaRecursa: any;
  protected periodoRecursa: any;
  protected materiaGlobal: any;
  protected periodoGlobal: any;
  protected numControlAlumnoGlobal: string = '';
  protected numControlAlumnoRecursa: string = '';
  protected alumnosGlobales: any = [];
  protected alumnosRecursas: any = [];
  protected materias: any = [];
  protected materiasG: any = [];
  protected periodoEscolar: any = [];
  protected ListaAlumnosGlobales: any = [];
  protected ListaAlumnosRecursas: any = [];
  protected proyecto = environment.proyecto;
  protected datosDocente = new Docente();
  constructor(
    private nav: NavegacionService,
    private docente: DocenteService,
    private auth: AuthService,
    private alumno: UsuarioService,
    private location: Location,
    private Link: Router
  ) {
    this.nav._perfil = false;
    this.nav._usuario = this.auth.decodifica().nombre + ' ' + this.auth.decodifica().apellidoP + ' ' + this.auth.decodifica().apellidoM;
    this.nav._docente = true;
    this.datos();
    this.datosPeridoEscolar();
  }

  async datos() {
    this.ngOnInit();
    this.datosDocente._numControl = this.auth.decodifica().numControl;
    try {
      const res = await firstValueFrom(this.docente.datosDocente({
        numControl: this.datosDocente._numControl,
      }));
      if (res != '' && res != undefined) {
        this.datosDocente._nombre = res.data.nombre;
        this.datosDocente._apellidoP = res.data.apellidoP;
        this.datosDocente._apellidoM = res.data.apellidoM;
        this.datosDocente._correo = res.data.correo;
        this.datosDocente._curp = res.data.CURP;
        this.datosDocente._CEDULA = res.data.CEDULA;
        this.datosDocente._RFC = res.data.RFC;
        this.datosDocente._gradoAcademico = res.data.gradoAcademico;
        if (
          res.data.foto == null ||
          res.data.foto == undefined ||
          res.data.foto == ''
        ) {
          this.datosDocente._foto = '.././assets/img/tufoto.png';
        } else {
          this.datosDocente._foto = res.data.foto;
        }

      }
    } catch (error) { }
  }

  ngOnInit(): void {
    if (!this.auth.isAuth()) {
      this.nav._iflogin = true;
      this.nav.salir();
    }
  }

  validandoLlenado(datos: any, numcontrol: any): boolean {
    this.ngOnInit();
    for (let alumno of datos) {
      if (alumno.numControl == numcontrol) {
        return true;
      }
    }
    return false;
  }

  async buscarAlumnoOut(evento: any) {
    if (evento.target.id == "loadGlobal") {
      try {
        var result = await firstValueFrom(this.docente.buscarAlumnoExistente(this.numControlAlumnoGlobal));
        if (result.Error != "no") {
          var obj = {
            anio: this.alumno.obtenerGrado(result.almnResult.grado, result.almnResult.numControl, result.almnResult.Ingreso, "year"),
            idperiodoescolar: this.periodoEscolar.length + 1,
            periodo: this.alumno.obtenerGrado(result.almnResult.grado, result.almnResult.numControl, result.almnResult.Ingreso, "periodo"),
            periodoescolar: this.alumno.obtenerGrado(result.almnResult.grado, result.almnResult.numControl, result.almnResult.Ingreso, "semestral")
          }

          var count = 0;

          for (var i = 0; i <= this.periodoEscolar.length - 1; i++) {
            if (this.periodoEscolar[i].periodoescolar != obj.periodoescolar) {
              count++;
            } else if (this.periodoEscolar[i].periodoescolar == obj.periodoescolar) {
              obj.idperiodoescolar = this.periodoEscolar[i].idperiodoescolar;
            }
          }

          if (count >= this.periodoEscolar.length) {
            this.periodoEscolar.push(obj);
          }

          this.periodoGlobal = obj.idperiodoescolar;
          var event = {
            target: {
              id: "selectGlobalesP"
            }
          };
          this.datosMateria(event);
          Notiflix.Notify.success("Alumno Disponible");
        } else {
          Notiflix.Notify.failure("No se encontro el Alumno");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async buscarAlumno(evento: any) {
    this.ngOnInit();
    if (this.verificaCamposMP()) {
      let listaEncontrado;
      let numeroCtrl: any = {};

      if (evento.target.id == 'global') {
        var lamateria = this.materiasG.filter(
          (item: any) => item.idMateria == this.materiaGlobal
        );

        numeroCtrl = {
          numControl: this.numControlAlumnoGlobal,
          materia: this.materiaGlobal,
          tipo: lamateria[0].tipo,
          periodo: this.periodoGlobal,
          control: 'global',
          dmateria: lamateria[0].descripcion,
          rol: 'AL',
        };
        listaEncontrado = this.validandoLlenado(
          this.alumnosGlobales,
          this.numControlAlumnoGlobal
        );
        const res = await firstValueFrom(
          this.docente.validandoTablaGR(numeroCtrl)
        );
        this.encontrado = !res.data;
        if (res.data) Notiflix.Notify.warning(res.mensaje);
      }
      if (evento.target.id == 'recursa') {
        var lamateria = this.materias.filter(
          (item: any) => item.idMateria == this.materiaRecursa
        );
        numeroCtrl = {
          numControl: this.numControlAlumnoRecursa,
          materia: this.materiaRecursa,
          tipo: lamateria[0].tipo,
          periodo: this.periodoRecursa,
          control: 'recursa',
          dmateria: lamateria[0].descripcion,
          rol: 'AL',
        };

        listaEncontrado = this.validandoLlenado(
          this.alumnosRecursas,
          this.numControlAlumnoRecursa
        );
        const res = await firstValueFrom(
          this.docente.validandoTablaGR(numeroCtrl)
        );
        this.encontrado = !res.data;
        if (res.data) Notiflix.Notify.warning(res.mensaje);
      }
      //buscar en el array alumnosGlobales un nombre

      if (!listaEncontrado) {
        if (this.encontrado) {
          try {
            const respuesta = await firstValueFrom(
              this.alumno.verInfo(numeroCtrl)
            );
            if (respuesta.data != '' && respuesta.data != undefined) {
              respuesta.data.semestral = this.alumno.obtenerGrado(Number(respuesta.data.grado), respuesta.data.numControl, respuesta.data.Ingreso, "semestral");
              if (evento.target.id == 'global') {
                respuesta.data.materia = this.materiaGlobal;
                respuesta.data.periodo = this.periodoGlobal;

                this.alumnosGlobales.push(respuesta.data);
                this.numControlAlumnoGlobal = '';
                this.disableGlobal = true;
              }
              if (evento.target.id == 'recursa') {
                respuesta.data.materia = this.materiaRecursa;
                respuesta.data.periodo = this.periodoRecursa;
                this.alumnosRecursas.push(respuesta.data);
                this.numControlAlumnoRecursa = '';
                this.disableRecursa = true;
              }
            } else {
              Notiflix.Notify.failure(
                'Alumno no encontrado en tabla de alumnos'
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        Notiflix.Notify.warning(
          'Alumno ya esta en la lista de recursa o esta en lista de globales vigente '
        );
      }
    } else {
      Notiflix.Notify.warning('Llena todos los campos');
    }
  }

  limpiarCampos() {
    this.ngOnInit();
    this.numControlAlumnoGlobal = '';
    this.numControlAlumnoRecursa = '';
    this.materiaGlobal = undefined;
    this.materiaRecursa = undefined;
    this.periodoGlobal = undefined;
    this.periodoRecursa = undefined;
    this.encontrado = false;
  }

  verificaCamposMP(): boolean {
    this.ngOnInit();
    if (
      this.numControlAlumnoGlobal !== '' &&
      this.materiaGlobal !== undefined &&
      this.periodoGlobal !== undefined
    ) {
      return true;
    }
    if (
      this.numControlAlumnoRecursa !== '' &&
      this.materiaRecursa !== undefined &&
      this.periodoRecursa !== undefined
    ) {
      return true;
    }

    return false;
  }

  eliminarAlumno(alumno: any, array: any) {
    this.ngOnInit();
    if (array == 'global') {
      this.alumnosGlobales = this.alumnosGlobales.filter(
        (item: any) => item.numControl != alumno
      );
      if (this.alumnosGlobales.length <= 0) this.disableGlobal = false;
    }
    if (array == 'recursa') {
      this.alumnosRecursas = this.alumnosRecursas.filter(
        (item: any) => item.numControl != alumno
      );
      if (this.alumnosRecursas.length <= 0) this.disableRecursa = false;
    }
  }

  async datosMateria(event: any) {
    this.ngOnInit();
    const control = event.target.id;
    var datos: any = '';
    if (control == 'selectRecursasP') {
      datos = await firstValueFrom(
        this.docente.datosMateria(this.periodoRecursa)
      );
    } else {
      datos = await firstValueFrom(
        this.docente.datosMateria(this.periodoGlobal)
      );
    }

    if (datos.data != '' && datos.data != undefined) {
      this.materias = datos.data;
      this.materiasG = this.materias.filter(
        (item: any) => item.tipo == 'BASICA'
      );
    }
  }

  async datosPeridoEscolar() {
    this.ngOnInit();
    const datos = await firstValueFrom(this.docente.datosPeriodoEscolar(''));
    if (datos.data != '' && datos.data != undefined) {
      this.periodoEscolar = datos.data;
    }
  }

  enviarRecursa(event: any) {
    this.ngOnInit();
    Notiflix.Loading.pulse('Enviando alumnos a recursar...', {
      interval: 3000,
    } as any);
    if (this.alumnosRecursas.length > 0) {
      let datos = {
        alumnos: this.alumnosRecursas,
        materia: this.materiaRecursa,
        periodo: this.periodoRecursa,
        docente: this.auth.decodifica().numControl,
        tipo: 'recursa',
      };
      this.docente.enviarRG(datos).subscribe((res: any) => {
        if (res.data) {
          Notiflix.Loading.remove();
          Notiflix.Notify.success('Alumnos enviados a recursar');
          this.alumnosRecursas = [];
          //recargar pagina
          this.location.go(this.location.path());
        } else {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure('Algo salio mal');
        }
      });
    } else {
      Notiflix.Loading.remove();
      Notiflix.Notify.warning('No hay alumnos en la lista');
    }
    this.disableRecursa = false;
  }

  enviarGlobales(event: any) {
    this.ngOnInit();
    Notiflix.Loading.pulse('Enviando alumnos a Global...', {
      interval: 2000,
    } as any);
   
    if (this.alumnosGlobales.length > 0) {
      let datos = {
        alumnos: this.alumnosGlobales,
        materia: this.alumnosGlobales[0].materia,
        periodo: this.alumnosGlobales[0].periodo,
        docente: this.auth.decodifica().numControl,
        tipo: 'global',
      };
      this.docente.enviarRG(datos).subscribe((res: any) => {
        if (res.data) {
          Notiflix.Loading.remove();
          Notiflix.Notify.success('Alumnos enviados a Global');

          this.alumnosGlobales = [];
        } else {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure('Algo salio mal');
        }
      });
    } else {
      Notiflix.Loading.remove();
      Notiflix.Notify.warning('No hay alumnos en la lista');
    }
    this.disableGlobal = false;
  }

  async cargarAlumnosGlobalesAsignados() {
    this.ngOnInit();
    if ( this.ListaAlumnosGlobales.length <= 0 ||  this.ListaAlumnosGlobales == undefined) 
      {
      try {
        const res = await firstValueFrom(this.docente.ListaAlumnosGlobalesAsignados({
            docenteDni: this.auth.decodifica().numControl,
          })
        );
        if (res.data != undefined && res.data != '') {
          this.ListaAlumnosGlobales = res.data;
        } else {
          Notiflix.Notify.warning('No hay alumnos asignados');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async enviarCalificacionesGlobales(
    idglobales: any,
    idasiglobd: any,
    calificacion: any
  ) {
    this.ngOnInit();
    if (calificacion != undefined && calificacion != '') {
      const filtro = this.ListaAlumnosGlobales.filter(
        (item: any) => item.idasiglobd == idasiglobd
      );
      try {
        const res = await firstValueFrom(this.docente.enviarCalificacionesGlobales(filtro[0]));
        if (res.data) {
          Notiflix.Notify.success('Calificaciones enviadas');
          //borrar de la lista
          this.ListaAlumnosGlobales = this.ListaAlumnosGlobales.filter((item: any) => item.idasiglobd != idasiglobd);
        } else {
          Notiflix.Notify.warning(res.mensaje);
        }
      } catch (error) {
        Notiflix.Notify.warning('error al enviar calificaciones');
        console.log(error);
      }
    } else {
      Notiflix.Notify.warning('Asigne una calificacion');
    }
  }

  async cargarAlumnosRecursasAsignados() {
    this.ngOnInit();
    if (this.alumnosRecursas.length <= 0 || this.alumnosRecursas == undefined) {
      try {
        const res = await firstValueFrom(
          this.docente.ListaAlumnosRecursasAsignados({
            docenteDni: this.auth.decodifica().numControl,
          })
        );
        if (res.data != undefined && res.data != '') {
          this.ListaAlumnosRecursas = res.data;
        } else {
          Notiflix.Notify.warning('No hay alumnos asignados');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async enviarCalificacionesRecursas(
    idrecursa: any,
    idasigrecursa: any,
    calificacion: any
  ) {
    this.ngOnInit();
    if (calificacion != undefined && calificacion != '') {
      const filtro = this.ListaAlumnosRecursas.filter(
        (item: any) => item.idrecursa == idrecursa
      );
      try {
        const res = await firstValueFrom(
          this.docente.enviarCalificacionesRecursas(filtro[0])
        );
        if (res.data) {
          Notiflix.Notify.success('Calificaciones enviadas');
          //borrar de la lista
          this.ListaAlumnosRecursas = this.ListaAlumnosRecursas.filter(
            (item: any) => item.idasigrecursa != idasigrecursa
          );
        } else {
          Notiflix.Notify.warning(res.mensaje);
        }
      } catch (error) {
        Notiflix.Notify.warning('error al enviar calificaciones');
        console.log(error);
      }
    } else {
      Notiflix.Notify.warning('Asigne una calificacion');
    }
  }
}
