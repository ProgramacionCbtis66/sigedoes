import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { GlobalService } from 'src/app/service/global.service';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { firstValueFrom } from 'rxjs';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {

  @ViewChild('fileInput1') fileInput1!: ElementRef;
  @ViewChild('fileInput2') fileInput2!: ElementRef;

  protected listaGlobales: any = [];
  protected datoPago: any = {};

  constructor(
    private Base64: UsuarioService,
    private global: GlobalService,
    private auth: AuthService,
    private nav: NavegacionService,

  ) {
    this.nav._usuario = this.auth.decodifica().nombre + " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    
    this.nav._global = true;
    this.cargarGlobales();
  }

  ngOnInit(): void {
    if (!this.auth.isAuth()) {
      this.nav._iflogin = true;
      this.nav.salir();
      this.cargarGlobales();
    }
  }

  async cargarGlobales() {
    this.ngOnInit();
    try {
      let res = await firstValueFrom(this.global.listaGlobal({ numControl: this.auth.decodifica().numControl }));
      this.listaGlobales = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async solicitarGlobal(dato: any) {
    this.ngOnInit();
    const filtro = this.listaGlobales.filter((global: any) => global.estado <= 4 && global.estado > 0);
    if (filtro.length < 3) {
      if(dato.idasiglobd != null){
        dato.numControl = this.auth.decodifica().numControl;
        const res = await firstValueFrom(this.global.crearSolicitud(dato));
        if (res.data) {
          this.cargarGlobales();
          Notiflix.Notify.success("Solicitud enviada y pendiente por confirmar");
        }
      } else {
        Notiflix.Notify.failure("No es tiempo aún de Globales");
      }
    } else {
      Notiflix.Notify.warning("Este proceso solo permite 3 solicitudes");
    }
  }

  activarInput(event: any) {
    this.ngOnInit()
    const control = event.target.id;
    if (control == "fileinput1") {
      this.fileInput1.nativeElement.click();
    }
    if (control == "fileinput2") {
      this.fileInput2.nativeElement.click();
    }

  }

  foto64(event: any): any {
    this.ngOnInit();
    const archivo = event.target.files[0];
    const control = event.target.id;
    this.Base64.extraerBase64(archivo).then((imagenBase64: any) => {

      const foto64 = imagenBase64.base;

      this.Base64.redimensionarImagen(foto64, 150, 150).then((imagenRedimensionada: any) => {
        if (control == "foto1") {
          this.datoPago.ceap = imagenRedimensionada.base;
        }
        if (control == "foto2") {
          this.datoPago.frm5 = imagenRedimensionada.base;
        }
      }).catch((error: any) => {
        return null;
      });
    }).catch((error: any) => {
      return null;
    });
  }

  async enviarPago() {
    this.ngOnInit();
    try {
      this.datoPago.numControl = this.auth.decodifica().numControl;
      const res = await firstValueFrom(this.global.enviarPago(this.datoPago));
      console.log(res.data);
      if (res.data) {
        this.cargarGlobales();
        Notiflix.Notify.success("Solicitud enviada y pendiente por confirmar");
      }
    } catch (error) {
      console.log(error);
    }
  }

}
