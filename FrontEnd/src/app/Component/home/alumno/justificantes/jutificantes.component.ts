import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { JustificanteService } from 'src/app/service/justificante.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { UsuarioService } from 'src/app/service/usuarios.service';


@Component({
  selector: 'app-jutificantes',
  templateUrl: './jutificantes.component.html',
  styleUrls: ['./jutificantes.component.css']
})
export class JutificantesComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  protected justificante: any = [];
  protected justForm: any = [];
  protected images: any = [];

  protected foto: any = [];

  constructor(
    private nav: NavegacionService,
    private auth: AuthService,
    private just: JustificanteService,
    private Base64: UsuarioService
  ){
    this.nav._usuario = this.auth.decodifica().nombre+ " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    this.nav._foto = this.auth.decodifica().foto;
    this.nav._homeAlumno = true;
  }

  ngOnInit(): void {
    if(!this.auth.isAuth()){
      this.nav._iflogin = true;
      this.nav.salir();
    }
  }

  async enviarJust(){
    this.ngOnInit();
    try{
      //let res = await firstValueFrom(this.just.enviarJustificante(this.justificante));
      console.log(this.images);
      this.just.enviarJustificante(this.justForm).subscribe((response) => {
        console.log('Respuesta del servidor:', response);
        // Puedes hacer algo con la respuesta aquí
        if(response.status === 'Registrado') {
          console.log('Los datos se registraron correctamente.');
        } else {
          console.log('Hubo un error al registrar los datos.');
        }
      });
    } catch(error){
      console.error(error);
    }
  }

  cargarFoto(event: any, index: number): void {
    const archivo = event.target.files[0];
    this.Base64.extraerBase64(archivo).then((imagenBase64: any) => {

      const foto64 = imagenBase64.base;

      this.Base64.redimensionarImagen(foto64, 150, 150).then((imagenRedimensionada: any) => {
        this.foto[index] = imagenRedimensionada.base;
        console.log(this.foto);
        if(index == 0){
          this.images[0] = this.foto[0];
        }
        if(index == 1){
          this.images[1] = this.foto[1];
        }
        if(index == 2){
          this.images[3] = this.foto[3];
        }
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
