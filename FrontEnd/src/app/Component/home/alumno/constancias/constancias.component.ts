import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { SendEmailService } from 'src/app/service/send-email.service';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-constancias',
  templateUrl: './constancias.component.html',
  styleUrls: ['./constancias.component.css']
})
export class ConstanciasComponent implements OnInit {

  proyecto = environment.proyecto;
  paso2 = false;
  datos: any = [];
  tabla = false;
  boton = false;
  emitidas: any;
  valortipo = "";
  constancia = {
    asunto: '',
    alumno: '',
    matricula: '',
    claveIns: '',
    semestre: '',
    especialidad: '',
    claveEsc: '352100002-16',
    area: '',
    turno: '',
    horario: '7:00 AM - 14:00 PM',
    periodo: '',
  };
  home = {
    NoPago: '',
    numControl: '',
  };
 
  constructor(
    private nav: NavegacionService,
    private auth: AuthService,
    private user: UsuarioService,
    private email: SendEmailService,
    private Link: Router,

  ) {
    this.nav._usuario = this.auth.decodifica().nombre + " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    this.nav._foto = this.auth.decodifica().foto;
  }
  
  async ngOnInit() {
    if (this.auth.isAuth()){
      const numControl = {
        numControl: this.auth.decodifica().numControl,
        rol: this.auth.decodifica().rol
      };
      try {
        const res = await firstValueFrom (this.user.datosUser(numControl));
        if (res != '' && res != undefined) {
          this.datos = res.dato;
          this.datos.nombreCompleto = res.dato.nombre + " " + res.dato.apellidoP + " " + res.dato.apellidoM;
        }
      } catch (error) {
        console.error(error);
      }
    }else{
      this.Link.navigate(['/']);
    }
  }

  actualizar() {
     this.ngOnInit();
    this.constancia.asunto = this.valortipo;
  }
 async veridatos() {
    this.ngOnInit();
    this.constancia.asunto = this.valortipo;
    if(
      this.constancia.asunto != '' &&
      this.constancia.alumno != '' &&
      this.constancia.semestre != '' &&
      this.constancia.especialidad != '' &&
      this.constancia.area != '' &&
      this.constancia.turno != '' &&
      this.constancia.matricula != '' &&
      this.constancia.claveIns != '' &&
      this.constancia.claveEsc != '' &&
      this.constancia.horario != '' &&
      this.constancia.periodo != ''
    ) {
      this.tabla = true;
    }
    if (this.constancia.asunto == '') {
      Notiflix.Notify.failure('Tiene Que Elegir El Tipo De Constancia');
    }
  }
  generarcons() {
    this.ngOnInit();
      const email = {
          email: this.datos.correo,
          asunto: this.constancia.asunto,
          datos: this.constancia,
          tipo: 'Constancia',
          numControl: this.auth.decodifica().numControl,
          codigoPago: this.home.NoPago,
          correo: this.datos.correo,
      };

    this.email.envioConstancia(email).subscribe((res: any) => {
      if (res == 'Correcto') {
        Notiflix.Notify.success('Constancia Enviada A Su Correo Con Éxito');
      }
    });
    this.user.obtenerDatos(this.home).subscribe((res: any) => {
      const datosRegistro = {
        NoCtrl: this.datos.numControl,
        emitio: res.emitio,
        fecha: res.nombre,
        CodPago: this.home.NoPago,
      };
      this.user.subirEmitido(datosRegistro).subscribe((res: any) => {});
    });

    this.user.NoPagoDesactivo(this.home).subscribe((res: any) => {
      if (res.msg == 'ok') {
        this.constancia.asunto = '';
        this.constancia.semestre = '';
        this.constancia.especialidad = '';
        this.constancia.area = '';
        this.constancia.turno = '';
        this.constancia.alumno = '';
        this.constancia.matricula = '';
        this.home.NoPago = '';
        this.tabla = false;
        this.paso2 = false;
      }
    });
  }
 async comprobar() {
    this.ngOnInit();
    this.constancia.asunto = this.valortipo;
    this.constancia.asunto = this.valortipo;
    this.constancia.semestre = this.datos.grado;
    this.constancia.especialidad = this.datos.especialidad;
    this.constancia.area = this.datos.area;
    this.constancia.turno = this.datos.turno;
    this.constancia.alumno = this.datos.nombreCompleto;
    this.constancia.matricula = this.auth.decodifica().numControl;
    if (
      this.home.NoPago != null &&
      this.home.NoPago != undefined &&
      this.home.NoPago != ''
    ) {
      this.home.numControl = this.auth.decodifica().numControl;
      Notiflix.Loading.standard('Revisando Código de Pago');
      this.user.NoPago(this.home).subscribe((res: any) => {
        if (res.valido != '' && res.valido != null && res.valido != undefined) {
          this.paso2 = true;
          this.constancia.periodo = res.escuela.Esc_Periodo;
          this.constancia.claveIns = res.escuela.CTO;
          Notiflix.Loading.remove();
        } else {
          Notiflix.Loading.remove();
          Notiflix.Notify.info('El Número No Es Valido');
          this.tabla = false;
        }
        if (this.tabla == false) this.boton = false;
      });
    }
  }

  async crearOrden(){
    this.ngOnInit();
    Notiflix.Loading.standard('Generando Orden de Pago');
    const item = [{
      title: "Pago Constancia",
      unit_price: 40,
      currency_id: "MXN",
      quantity: 1,
    },
      {
        numControl: this.datos.numControl,
      }
    ];
    try{
      const pago = await firstValueFrom(this.user.pagoConstancias(item));
     
      Notiflix.Loading.remove();
      Notiflix.Loading.standard('Redireccionando a Mercado Pago');
      window.open( pago.web, "_blank" );
      Notiflix.Loading.remove();

    } catch (error){
      console.error(error);
    }
  }
}
