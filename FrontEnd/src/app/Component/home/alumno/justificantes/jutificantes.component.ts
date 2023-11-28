import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Notiflix from 'notiflix';
import { Notify } from 'notiflix';
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
  @ViewChild('fileInput1') fileInput1!: ElementRef;
  @ViewChild('fileInput2') fileInput2!: ElementRef;
  @ViewChild('fileInput3') fileInput3!: ElementRef;
  protected justificante = {
    idjustificante: 0,
    numControl: this.auth.decodifica().numControl,
    motivo: "",
    inetutor: 'assets/img/documentfoto.png',
    cartatutor: 'assets/img/documentfoto.png',
    documentoreferencia: 'assets/img/documentfoto.png',
    tipo: 'dias',
    fecha: '',
    estado: 0,
    correoTutor: "",
    nombreTutor: "",
    horas1: "",
    horas2: "",
    fecha1: "",
    fecha2: "",
  }
  protected diasHoras:boolean = true;
  protected images: any = [];

  protected foto: any = [];

  constructor(
    private nav: NavegacionService,
    private auth: AuthService,
    private just: JustificanteService,
    private Base64: UsuarioService
  ){
    this.nav._usuario = this.auth.decodifica().nombre+ " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
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
    let timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    this.justificante.fecha = today.toLocaleDateString();
    try{
      let res = await firstValueFrom(this.just.enviarJustificante(this.justificante));
      console.log(res); 
      
      // Puedes hacer algo con la respuesta aquí
      if(res.status === 'Registrado') {
        console.log('Los datos se registraron correctamente.');
        Notiflix.Notify.success("Justificante Enviado");
      } else {
        console.log('Hubo un error al registrar los datos.');
      }
    } catch(error){
      console.error(error);
    }
  }

  foto64(event: any): any{
    this.ngOnInit();
    const archivo = event.target.files[0];
    const control = event.target.id;
    this.Base64.extraerBase64(archivo).then((imagenBase64: any) => {

      const foto64 = imagenBase64.base;

      this.Base64.redimensionarImagen(foto64, 150, 150).then((imagenRedimensionada: any) => {
        if(control == "foto1"){
          this.justificante.documentoreferencia = imagenRedimensionada.base;
        }
        if(control == "foto2"){
          this.justificante.inetutor = imagenRedimensionada.base;
        }
        if(control == "foto3"){
          this.justificante.cartatutor = imagenRedimensionada.base;
        }
      }).catch((error: any) => {
        return null;
      });
    }).catch((error: any) => {
      return null;
    });
  }

  activarInput(event: any){
    this.ngOnInit();
    const control = event.target.id;
    if(control == "fileinput1"){
      this.fileInput1.nativeElement.click();
    }
    if(control == "fileinput2"){
      this.fileInput2.nativeElement.click();
    }
    if(control == "fileinput3"){
      this.fileInput3.nativeElement.click();
    }
  }

  cambiarSelecionDia(event: any){
    this.ngOnInit();
    const horaDia = event.target.value;
    if(horaDia == "dias"){
      this.diasHoras = true;
      this.justificante.tipo = "dias";
      this.justificante.horas1 = "";
      this.justificante.horas2 = "";
    }
    if(horaDia == "horas"){
      this.diasHoras = false;
      this.justificante.tipo = "horas";
      this.justificante.horas1 = "";
      this.justificante.horas2 = "";
    }
  }

}
