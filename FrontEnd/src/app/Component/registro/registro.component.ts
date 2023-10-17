import {  Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Docente } from './modelo/ClaseDocente';
import { Usuario } from './modelo/CalseUsuario';
import * as Notiflix from 'notiflix';
import { environment } from 'src/environments/environment';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/service/usuarios.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',

  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public proyecto: string = environment.proyecto;
  foto: any = ".././assets/img/tufoto.png";
  registrarse = 'Registro';
  informacion = '  Info';
  infografia: string = '.././assets/img/infografiaa.png';
  usuario: Usuario = new Usuario();
  docente: Docente = new Docente();
  tipoUsuario: string = "";
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private auth: AuthService, 
    private router: Router, 
    private nav: NavegacionService,
    private sanitizer: DomSanitizer,
    private Base64 :UsuarioService
    ) { this.nav._logout= false;this.nav._registro=true; this.nav._iflogin=false; }

  ngOnInit(): void {}

  public area(): void {
    switch (this.usuario._especialidad) {
      case "Programacion": case "Electricidad": case "Soporte":
        this.usuario._area = "Físico Matemático"; break;
      case "Contabilidad":
        this.usuario._area = "Económico Administrativo"; break;
      case "Alimentos":
        this.usuario._area = "Químico Biológico"; break;
    }
    alert(this.usuario._area);
  }
  public Registro(): void {
    let contra = this.usuario._pass2;
    let contra2 = this.usuario._pass;
    if (contra == contra2) {
      if(this.tipoUsuario == "Docente"){
        if (this.usuario._correo !== "" && this.usuario._pass !== "" && this.usuario._pass2 !== "" && this.usuario._curp !== "" && this.usuario._noctrl !== ""){
          this.usuario
        }
      }
      if (this.usuario._correo !== "" && this.usuario._pass !== "" && this.usuario._pass2 !== "" && this.usuario._curp !== "" && this.usuario._noctrl !== "" && this.usuario._especialidad !== "" && this.usuario._semestre !== "" && this.usuario._area !== "" && this.usuario._turno !== "" && this.usuario._grupo != "") {
        Notiflix.Loading.standard("Validando");
        this.auth.registro(this.usuario).subscribe((res: any) => {
          if (res.Aceptado == "Datos Aceptados") {
            Notiflix.Loading.remove();
            Notiflix.Notify.info("Registro de datos en verificación");
            this.router.navigate(['/login']);
          } else if (res.Error == "Los Datos No Fueron Aceptados") {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure(res.Error);
          }
        });
      } else {
        Notiflix.Notify.failure("Por favor llene todos los campos");
      }
    } else {
      Notiflix.Notify.failure("Las contraseñas no coinciden");
    }
  }
  public tipousuario(event: any): void {
    this.tipoUsuario = event.target.value;
    if (this.tipoUsuario == "Alumno") {
      this.registrarse = "Registro de Alumno";
      this.informacion = "  Info";
      this.infografia = ".././assets/img/infografiaa.png";
    } else if (this.tipoUsuario == "Docente") {
      this.registrarse = "Registro de Docente";
      this.informacion = "  Info";
      this.infografia = ".././assets/img/infografiaa.png";
    } else if (this.tipoUsuario == "Administrativo") {
      this.registrarse = "Registro de Administrativo";
      this.informacion = "  Info";
      this.infografia = ".././assets/img/infografiaa.png";
    }
  }

  cargarFoto(event: any): void {
    const archivo = event.target.files[0];
    this.Base64.extraerBase64(archivo).then((imagenBase64: any) => {

      const foto64 = imagenBase64.base;

      this.Base64.redimensionarImagen(foto64, 110, 110).then((imagenRedimensionada: any) => {
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
}

