import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Docente } from 'src/app/Modelo/Docente';
import { Administrativo } from 'src/app/Modelo/Administrativo';
import * as Notiflix from 'notiflix';
import { environment } from 'src/environments/environment';
import { NavegacionService } from 'src/app/service/navegacion.service';

import { UsuarioService } from 'src/app/service/usuarios.service';
import { Alumno } from 'src/app/Modelo/Alumno';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',

  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public proyecto: string = environment.proyecto;
  foto: any = ".././assets/img/tufoto.png";
  registrarse = 'Registro';
  informacion = 'Info';
  alumno: Alumno = new Alumno();
  docente: Docente = new Docente();
  administrativo: Administrativo = new Administrativo();
  tipoUsuario: string = "";
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private auth: AuthService,
    private router: Router,
    private nav: NavegacionService,
    private Base64: UsuarioService,
  ) {
    this.nav._logout = false; this.nav._registro = true; this.nav._iflogin = true;
  }

  ngOnInit(): void { }

  public area(): void {
    switch (this.alumno._especialidad) {
      case "Programación": case "Electricidad": case "Producción Industrial De Alimentos":
        this.alumno._area = "Físico Matemático"; break;
      case "Contabilidad":
        this.alumno._area = "Económico Administrativo"; break;
      case "Alimentos":
        this.alumno._area = "Químico Biológico"; break;
    }
  }
  public Registro(): void {

    var validEmail = /^[a-z0-9._%+-]+@cbtis66\.edu\.mx$/i;
    
    if (this.tipoUsuario == "Docente") {
      if (this.docente._nombre !== "" && this.docente._apellidoP !== "" && this.docente._apellidoM !== "" && this.docente._fechaNac !== null && validEmail.test(this.docente._correo) && this.docente._pass !== "" && this.docente._pass2 !== "" && this.docente._curp !== "" && this.docente && this.docente._CEDULA !== "" && this.docente._gradoAcademico !== "" && this.docente._foto != null) {
        this.docente._tipoUsuario = "Docente";
        this.docente._rol = "DO";
        this.docente._numControl = this.docente._correo;

        this.docente._foto = this.foto;
        this.docente._curp = this.docente._curp.toUpperCase();

        if (this.docente._pass === this.docente._pass2) {
          Notiflix.Loading.standard("Validando");
          this.auth.registro(this.docente).subscribe((res: any) => {
            if (res.Aceptado == "Datos Guardados") {
              Notiflix.Loading.remove();
              Notiflix.Notify.info("Registro de datos en verificación por el administrador");
              this.router.navigate(['/login']);
            } else if (res.Error == "Los Datos No Fueron Registrados") {
              Notiflix.Loading.remove();
              Notiflix.Notify.failure(res.Error);
            }
          });
          Notiflix.Loading.remove();
        } else {
          Notiflix.Notify.failure("Las contraseñas no coinciden");
        }
      } else {
        Notiflix.Notify.failure("Faltan Datos o correo invalido");
      }
    } else if (this.tipoUsuario == "Alumno") {
      if (this.alumno._nombre != "" && this.alumno._apellidoP != "" && this.alumno._apellidoM != "" && this.alumno._fechaNac != null && validEmail.test(this.alumno._correo) && this.alumno._pass != "" && this.alumno._pass2 != "" && this.alumno._curp != "" && this.alumno._numControl != "" && this.alumno._turno != "" && this.alumno._direccion != "" && this.alumno._telefono != "" && this.alumno._grupo != "" && this.alumno._especialidad != "" && this.alumno._grado != "" && this.alumno._area != "" && this.alumno._foto != null) {
        if (this.alumno._pass === this.alumno._pass2) {
          var fechaActual = new Date();
          var dia = fechaActual.getDate();
          var mes = fechaActual.getMonth() + 1;
          var year = fechaActual.getFullYear();
          this.alumno._fecha = dia + "/" + mes + "/" + year;
          this.alumno._tipoUsuario = "Alumno";
          this.alumno._rol = "AL";
          this.alumno._foto = this.foto;
          this.alumno._horario = "1";
          this.alumno._curp = this.alumno._curp.toUpperCase();
          Notiflix.Loading.standard("Validando");
          this.auth.registro(this.alumno).subscribe((res: any) => {
            if (res.Aceptado == "Datos Guardados") {
              Notiflix.Loading.remove();
              Notiflix.Notify.info("Registro de datos en verificación");
              this.router.navigate(['/login']);
            } else if (res.Error == "Los Datos No Fueron Registrados") {
              Notiflix.Loading.remove();
              Notiflix.Notify.failure(res.Error);
            }
          });
        } else {
          Notiflix.Notify.failure("Las contraseñas no coinciden");
        }
      } else {
        Notiflix.Notify.failure("Faltan Datos");
      }
    } else if (this.administrativo._nombre != "" && this.administrativo._apellidoP != "" && this.administrativo._apellidoM != "" && validEmail.test(this.administrativo._correo) && this.administrativo._curp != "" && this.administrativo._departamento != "" && this.administrativo._direccion != "" && this.administrativo._foto != null && this.administrativo._nivelOperativo != "" && this.administrativo._departamento != "") {
      this.administrativo._numControl = this.administrativo._correo;
      this.administrativo._rol = this.tipoUsuario;
      this.administrativo._foto = this.foto;
      this.administrativo._curp = this.administrativo._curp.toUpperCase();
      if (this.administrativo._pass === this.administrativo._pass2) {
        this.administrativo._tipoUsuario = this.tipoUsuario;
        Notiflix.Loading.standard("Validando");
        this.auth.registro(this.administrativo).subscribe((res: any) => {
          if (res.Aceptado == "Datos Guardados") {
            Notiflix.Loading.remove();
            Notiflix.Notify.info("Registro de datos en verificación");
            this.router.navigate(['/login']);
          } else if (res.Error == "Los Datos No Fueron Registrados") {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure(res.mensaje);
          }
        });
      } else {
        Notiflix.Notify.failure("Las contraseñas no coinciden");
      }
    } else {
      Notiflix.Notify.failure("Faltan Datos");
    }
  }

  public tipousuario(event: any): void {
    this.tipoUsuario = event.target.value;
    if (this.tipoUsuario == "Alumno") {
      this.registrarse = "Registro de Alumno";
      this.informacion = "  Info";

    } else if (this.tipoUsuario == "Docente") {
      this.registrarse = "Registro de Docente";
      this.informacion = "  Info";

    } else if (this.tipoUsuario == "CE") {
      this.registrarse = "Registro de Control Escolar";
      this.informacion = "  Info";

    } else if (this.tipoUsuario == "OE") {
      this.registrarse = "Registro de Orientacion Educativa";
      this.informacion = "  Info";

    } else {
      this.registrarse = "REGISTRO";
      this.informacion = "  Info";

    }
  }

  cargarFoto(event: any): void {
    const archivo = event.target.files[0];
    this.Base64.extraerBase64(archivo).then((imagenBase64: any) => {

      const foto64 = imagenBase64.base;

      this.Base64.redimensionarImagen(foto64, 150, 150).then((imagenRedimensionada: any) => {
        this.foto = imagenRedimensionada.base;
      }).catch((error: any) => {
        console.error('Error al redimensionar la imagen', error);
      });
    }).catch((error: any) => {
      console.error('Error al extraer la imagen en base64', error);
    });
  }

  activarInput() {
    this.fileInput.nativeElement.click();
  }

  valida(evt: any) {

    const input = evt.target.id;
    //longitud maxima de cada input
    const valor = evt.target.value;

    var code = (evt.which) ? evt.which : evt.keyCode;

    if (input == "nombre" || input == "ap" || input == "am") {
      if (code == 8) { // backspace.
        return true;
      } else if (code >= 65 && code <= 90 || code >= 97 && code <= 122 || code == 32) { // is a letter.
        return true;
      } else { // other keys.
        return false;
      }
    }
    if (input == "tel") {
      if (code == 8) { // backspace.
        return true;
      } else if (code >= 48 && code <= 57 && valor.length < 10) { // is a number.
        return true;
      } else { // other keys.
        return false;
      }
    }
    if (input == "curp") {
      if (code == 8) { // backspace.
        return true;
      } else if (code >= 65 && code <= 90 || code >= 48 && code <= 57 || code >= 97 && code <= 122) { // is a letter.
        return true;
      } else { // other keys.
        return false;
      }
    }
    if (input == "numControl") {
      if (code == 8) { // backspace.
        return true;
      } else if (code >= 48 && code <= 57) { // is a number.
        return true;
      } else { // other keys.
        return false;
      }
    }
    if (input == "correo") {
      const valor = evt.target.value;
      const emailRegex = /^[a-z0-9.]+@cbtis66\.edu\.mx$/;
      const validaCorreo = document.getElementById('validaCorreo');
      if (!emailRegex.test(valor)) {
        if (validaCorreo) {
          validaCorreo.innerHTML = 'Correo invalido';
          validaCorreo.style.visibility = 'visible';
          validaCorreo.style.color = 'red';
        }
      } else {
        if (validaCorreo) {
          validaCorreo.innerHTML = 'Correo valido';
          validaCorreo.style.visibility = 'visible';
          validaCorreo.style.color = 'green';
        }
      }
      if (code == 8) { // backspace.
        return true;
      } else if (code >= 65 && code <= 90 || code >= 97 && code <= 122 || code == 46 || code == 64 || code >= 48 && code <= 57) { // is a letter.
        return true;
      } else { // other keys.
        return false;
      }
    }
    if (input == "direccion") {
      if (code == 8) { // backspace.
        return true;
      } else if (code >= 65 && code <= 90 || code >= 97 && code <= 122 || code == 32 || code >= 48 && code <= 57 || code == 35) { 
        return true;
      } else { // other keys.
        return false;
      }
    }
    if (input == "rfc") {
      if (code == 8) { // backspace.
        return true;
      } else if (code >= 65 && code <= 90 || code >= 48 && code <= 57) { // is a letter.
        return true;
      } else { // other keys.
        return false;
      }
    }
    return false;
  }

}

