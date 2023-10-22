import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { AuthService } from '../../service/auth.service';
import * as Notiflix from 'notiflix';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { Alumno } from 'src/app/Modelo/Alumno';
import { Docente } from 'src/app/Modelo/Docente';
import { Administrativo } from 'src/app/Modelo/Administrativo';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
 




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: any = {};
  perfilAlumnoInfo: Alumno = new Alumno();
  perfilDocentesInfo: Docente = new Docente();
  perfilAdministrativo: Administrativo = new Administrativo();
  imageUrl: SafeUrl | undefined | null |string = null;


  constructor(private nav: NavegacionService,
    private auth: AuthService,
    private sanitizer: DomSanitizer,
    private userService: UsuarioService) {
    this.nav._perfil = true;


  }

  ngOnInit(): void {
    if (this.auth.isAuth()) {

      const datos = {
        numControl: this.auth.decodifica().numControl,
        rol: this.auth.decodifica().rol
      }

      if (datos.rol == "AL") {
        this.userService.datosUser(datos).subscribe((res: any) => {
          if ((res.data).nombre != "") {
            this.nav._usuario = (res.data).nombre + " " + (res.data).apellidoP + " " + (res.data).apellidoM;
            this.perfilAlumnoInfo._nombre = (res.data).nombre + " " + (res.data).apellidoP + " " + (res.data).apellidoM;
            this.perfilAlumnoInfo._direccion = (res.data).direccion;
            this.perfilAlumnoInfo._correo = (res.data).correo;
            this.perfilAlumnoInfo._curp = (res.data).CURP;
            this.perfilAlumnoInfo._especialidad = (res.data).especialidad;
            this.perfilAlumnoInfo._numControl = (res.data).numControl;
            this.perfilAlumnoInfo._semestre = (res.data).grado;
            this.perfilAlumnoInfo._grupo = (res.data).grupo;
            this.perfilAlumnoInfo._turno = (res.data).turno;
            this.perfilAlumnoInfo._telefono = (res.data).telefono;
            this.perfilAlumnoInfo._foto = (res.data).foto;
            this.perfilAlumnoInfo._facebook = (res.data).facebook;
            this.perfilAlumnoInfo._instagram = (res.data).instagram;
            this.perfilAlumnoInfo._twitter = (res.data).twitter;
          }
        });
        this.perfil = this.perfilAlumnoInfo;
      }
      if (datos.rol == "DO") {
        this.userService.datosUser(datos).subscribe((res: any) => {
          if (res.dato != "" && res.dato != undefined) {
            this.nav._usuario = (res.dato).nombre + " " + (res.dato).apellidoP + " " + (res.dato).apellidoM;
            this.perfilDocentesInfo._nombre = (res.dato).nombre + " " + (res.dato).apellidoP + " " + (res.dato).apellidoM;
            this.perfilDocentesInfo._numControl = (res.dato).numControl;
            this.perfilDocentesInfo._direccion = (res.dato).direccion;
            this.perfilDocentesInfo._gradoAcademico = (res.dato).gradoAcademico;
            this.perfilDocentesInfo._telefono = (res.dato).telefono;
            this.perfilDocentesInfo._RFC = (res.dato).RFC;
            this.perfilDocentesInfo._curp = (res.dato).CURP;
            this.perfilDocentesInfo._CEDULA = (res.dato).CEDULA;
            this.perfilDocentesInfo._foto = (res.dato).foto;
            this.perfilDocentesInfo._facebook = (res.dato).facebook;
            this.perfilDocentesInfo._instagram = (res.dato).instagram;
            this.perfilDocentesInfo._twitter = (res.dato).twitter;
            this.perfilDocentesInfo._fechaNac = (res.dato).fechaNac;
          }
        });
        this.perfil = this.perfilDocentesInfo;

      }
      if (datos.rol == "CE" || datos.rol == "OE") {
        this.userService.datosUser(datos).subscribe((res: any) => {
          if ((res.dato).nombre != undefined) {
            this.nav._usuario = (res.dato).nombre + " " + (res.dato).apellidoP + " " + (res.dato).apellidoM;
            this.perfilAdministrativo._nombre = (res.dato).nombre + " " + (res.dato).apellidoP + " " + (res.dato).apellidoM;
            this.perfilAdministrativo._numControl = (res.dato).numControl;
            this.perfilAdministrativo._direccion = (res.dato).direccion;
            this.perfilAdministrativo._telefono = (res.dato).telefono;
            this.perfilAdministrativo._departamento = (res.dato).departamento;
            this.perfilAdministrativo._turno = (res.dato).turno;
            this.perfilAdministrativo._curp = (res.dato).CURP;
            this.perfilAdministrativo._imageUrl = (res.dato).foto
            this.perfilAdministrativo._foto = (res.dato).foto;
            this.perfilAdministrativo._nivelOperativo = (res.dato).nivelOperativo;
            this.perfilAdministrativo._facebook = (res.dato).facebook;
            this.perfilAdministrativo._instagram = (res.dato).instagram;
            this.perfilAdministrativo._twitter = (res.dato).twitter;
          }
        });
        this.perfil = this.perfilAdministrativo;
      }
    } else {
      this.nav.salir();
    }
  }
  recarga() {

    this.userService.modificarPerfil(this.perfilAlumnoInfo).subscribe((res: any) => {
      if (res.ok == "ok") {
        Notiflix.Notify.info("Datos Cambiados");
      }
    });
  }


}
