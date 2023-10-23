import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { AuthService } from '../../service/auth.service';
import * as Notiflix from 'notiflix';
import { NavegacionService } from 'src/app/service/navegacion.service';
 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: any = {};
   
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private nav: NavegacionService,
    private auth: AuthService,
    private userService: UsuarioService,
    private Base64: UsuarioService
  ) {
    this.nav._perfil = true;
    this.nav._foto = this.auth.decodifica().foto;
  }

  ngOnInit(): void {
    if (this.auth.isAuth()) {

      const datos = {
        numControl: this.auth.decodifica().numControl,
        rol: this.auth.decodifica().rol
      }
      this.userService.datosUser(datos).subscribe((res: any) => {
        if (res.dato != "" && res.dato != undefined) {
          res.dato.nombre = (res.dato).nombre + " " + (res.dato).apellidoP + " " + (res.dato).apellidoM;
          this.nav._usuario = res.dato.nombre;
          if (res.dato.foto == null) { res.dato.foto = ".././assets/img/tufoto.png"; }
          this.perfil = res.dato;
        }
      });
    }
  }
  recarga() {
    this.perfil.nombre = this.auth.decodifica().nombre;
    this.userService.modificarPerfil(this.perfil).subscribe((res: any) => {
      if (res.ok == "ok") {
        Notiflix.Notify.info("Datos Actualizados");
      }
    });
  }
  validar(event: any) {

    //validar contraseña segura con expresiones regulares
    const controName = event.target.id;
    if (controName == "pass") {
      let pass = event.target.value;
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%#*?&])([A-Za-z\d$@$!%#*?&]|[^ ]){8,15}$/;
      //que singinica cada caracter
      // ^: inicio de la cadena
      // (?=.*[a-z]): al menos una letra minuscula
      // (?=.*[A-Z]): al menos una letra mayuscula
      // (?=.*\d): al menos un numero
      // (?=.*[$@$!%*?&]): al menos un caracter especial
      // ([A-Za-z\d$@$!%*?&]|[^ ]){8,15}: de 8 a 15 caracteres sin espacios
      // $: fin de la cadena
      if (regex.test(pass)) {
        //escribir en la etiqueta con id alidandoPass la palabra "valida"
        document.getElementById('validandoPass')!.innerHTML = "Valida";
        //cambiar el color de la etiqueta a verde
        document.getElementById('validandoPass')!.style.color = "green";
      } else {
        //escribir en la etiqueta con id alidandoPass la palabra "invalida"
        document.getElementById('validandoPass')!.innerHTML = "Invalida";
        //cambiar el color de la etiqueta a rojo
        document.getElementById('validandoPass')!.style.color = "red";
      }
    }
    if (controName == "pass2") {
      //valor del formulario pass2
      let pass = document.getElementById('pass') as HTMLInputElement;

      const pass2 = event.target.value;
      if (pass.value == pass2) {
        document.getElementById('validandoPass2')!.innerHTML = "Coinciden";
        document.getElementById('validandoPass2')!.style.color = "green";
      } else {
        document.getElementById('validandoPass2')!.innerHTML = "No Coinciden";
        document.getElementById('validandoPass2')!.style.color = "red";
      }
    }
  }

  activarInput() {
    this.fileInput.nativeElement.click();

  }

  cargarFoto(event: any): void {
    const archivo = event.target.files[0];
    this.Base64.extraerBase64(archivo).then((imagenBase64: any) => {

      const foto64 = imagenBase64.base;

      this.Base64.redimensionarImagen(foto64, 150, 150).then((imagenRedimensionada: any) => {
        this.perfil.foto = imagenRedimensionada.base;
      }).catch((error: any) => {
        console.error('Error al redimensionar la imagen', error);
      });
    }).catch((error: any) => {
      console.error('Error al extraer la imagen en base64', error);
    });
  }

}
