import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { AuthService } from '../../service/auth.service';
import * as Notiflix from 'notiflix';




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilAlumnoInfo = {
    alumno: "",
    curp: "",
    numControl: "",
    especialidad: "",
    grado: "",
    grupo: "",
    correo: "",
    turno: ""
  }

  perfilDocentesInfo = {
    numControl: "",
    direccion: "",
    gradoAcademico: "",
    telefono: "",
    RFC: "",
    CURP: "",
    CEDULA: "",
    foto: Blob,
    facebook: "",
    instagram: "",
    twitter: "",  
    fechaNac: ""
  }

  perfilAdministrativo = {
    numControl: "",
    direccion: "",
    telefono: "",
    departamento: "",
    turno: "",
    CURP: "", 
    foto: Blob,
    nivelOperativo: ""
  }

  datos: any;
  constructor(private app: AppComponent, private auth: AuthService, private userService: UsuarioService) {
    if (this.auth.isAuth()) {
      const datos = {
        numcontrol: this.auth.decodifica().numControl,
        rol: this.auth.decodifica().rol
      }
      if (datos.rol == "Alumno") {
        this.userService.datosUser(datos).subscribe((res: any) => {
          if (JSON.parse(res.data).nombre != "") {
            this.datos = JSON.parse(res.data);
            this.app.usuario = this.datos.nombre;
            //alert(this.datos);
            this.perfilAlumnoInfo.alumno = this.datos.nombre;
            this.perfilAlumnoInfo.correo = this.datos.correo;
            this.perfilAlumnoInfo.curp = this.datos.CURP;
            this.perfilAlumnoInfo.especialidad = this.datos.especialidad;
            this.perfilAlumnoInfo.numControl = this.datos.numControl;
            this.perfilAlumnoInfo.grado = this.datos.grado;
            this.perfilAlumnoInfo.grupo = this.datos.grupo;
            this.perfilAlumnoInfo.turno = this.datos.turno;
          }
        });
      }
      if(datos.rol == "Docente"){
        this.userService.datosUser(datos).subscribe((res: any) => {
          if (JSON.parse(res.data).nombre != "") {
            this.datos = JSON.parse(res.data);
            this.app.usuario = this.datos.nombre;
            this.perfilDocentesInfo.numControl = this.datos.numControl;
            this.perfilDocentesInfo.direccion = this.datos.direccion;
            this.perfilDocentesInfo.gradoAcademico = this.datos.gradoAcademico;
            this.perfilDocentesInfo.telefono = this.datos.telefono;
            this.perfilDocentesInfo.RFC = this.datos.RFC;
            this.perfilDocentesInfo.CURP = this.datos.CURP;
            this.perfilDocentesInfo.CEDULA = this.datos.CEDULA;
            this.perfilDocentesInfo.foto = this.datos.foto;
            this.perfilDocentesInfo.facebook = this.datos.facebook;
            this.perfilDocentesInfo.instagram = this.datos.instagram;
            this.perfilDocentesInfo.twitter = this.datos.twitter;
            this.perfilDocentesInfo.fechaNac = this.datos.fechaNac;
          }
        }
      )};
      if(datos.rol == "Administrativo"){
        this.userService.datosUser(datos).subscribe((res: any) => {
          if(JSON.parse(res.data).nombre != ""){
            this.datos = JSON.parse(res.data);
            this.app.usuario = this.datos.nombre;
            this.perfilAdministrativo.numControl = this.datos.numControl;
            this.perfilAdministrativo.direccion = this.datos.direccion;
            this.perfilAdministrativo.telefono = this.datos.telefono;
            this.perfilAdministrativo.departamento = this.datos.departamento;
            this.perfilAdministrativo.turno = this.datos.turno;
            this.perfilAdministrativo.CURP = this.datos.CURP;
            this.perfilAdministrativo.foto = this.datos.foto;
            this.perfilAdministrativo.nivelOperativo = this.datos.nivelOperativo;
          }
        });
      }
    }
  }

  ngOnInit(): void {
  }
  recarga() {

    this.userService.modificarPerfil(this.perfilAlumnoInfo).subscribe((res: any) => {
      if (res.ok == "ok") {
        Notiflix.Notify.info("Datos Cambiados");
      }
    });
  }

}
