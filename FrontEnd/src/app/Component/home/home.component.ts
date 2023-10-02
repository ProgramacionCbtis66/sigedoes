import {  Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import * as Notiflix from 'notiflix';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { SendEmailService } from '../../service/send-email.service';
import { firstValueFrom } from 'rxjs';
import { NavegacionService } from 'src/app/service/navegacion.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  paso2 = false;
  alumno = "";
  curp: any;
  correo: any;
  noctrl: any;
  especialidad: any;
  semestre: any;
  area: any;
  turno: any;
  datos= {
    nombre:'',
    CURP:'',
    correo:'',
    numControl:'',
    grado:'',
    area:'',
    turno:'',
    especialidad:'',
    Esc_Periodo:'',
    CTO:''
  };
  tabla = false;
  datoo: any;
  boton = false;
  emitidas: any;
  datosRegistro = {
    NoCtrl: '',
    emitio: '',
    fecha: '',
    CodPago: '',
  };
  valortipo = {
    tipo: '',
  };
  datosCons = {
    asunto: '',
    nombre: '',
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
  dato = {
    numcontrol: '',
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

  ) {
    this.nav._usuario = this.auth.decodifica().nombre;
  }
  
  async ngOnInit() {
    if (this.auth.isAuth() && this.alumno == "") {
      this.dato.numcontrol = this.auth.decodifica().numControl;
      try {
        const res = await firstValueFrom (this.user.datosUser(this.dato));
        if (res != '' && res != undefined) {
          this.datos = JSON.parse(res.data);
          console.log(this.datos);
        }
      } catch (error) {
        console.error(error);
      }
      this.nav._usuario = this.datos.nombre;
      this.alumno = this.datos.nombre;
    }
  }

  actualizar() {
    this.datosCons.asunto = this.valortipo.tipo;
  }
  veridatos() {
    this.datosCons.asunto = this.valortipo.tipo;
    if(
      this.datosCons.asunto != '' &&
      this.datosCons.nombre != '' &&
      this.datosCons.semestre != '' &&
      this.datosCons.especialidad != '' &&
      this.datosCons.area != '' &&
      this.datosCons.turno != '' &&
      this.datosCons.matricula != '' &&
      this.datosCons.claveIns != '' &&
      this.datosCons.claveEsc != '' &&
      this.datosCons.horario != '' &&
      this.datosCons.periodo != ''
    ) {
      this.tabla = true;
    }
    if (this.datosCons.asunto == '') {
      Notiflix.Notify.failure('Tiene Que Elegir El Tipo De Constancia');
    }
  }
  generarcons() {
    const email = {
      email: this.correo,
      asunto: this.datosCons.asunto,
      datos: this.datosCons,
      tipo: 'Constancia',
      numControl: this.noctrl,
      codigoPago: this.home.NoPago,
    };

    this.email.envioConstancia(email).subscribe((res: any) => {
      if (res == 'Correcto') {
        Notiflix.Notify.success('Constancia Enviada A Su Correo Con Éxito');
      }
    });
    this.user.obtenerDatos(this.home).subscribe((res: any) => {
      this.datosRegistro = {
        NoCtrl: this.dato.numcontrol,
        emitio: res.emitio,
        fecha: res.nombre,
        CodPago: this.home.NoPago,
      };
      this.user.subirEmitido(this.datosRegistro).subscribe((res: any) => {});
    });

    this.user.NoPagoDesactivo(this.home).subscribe((res: any) => {
      if (res.msg == 'ok') {
        this.datosCons.asunto = '';
        this.datosCons.semestre = '';
        this.datosCons.especialidad = '';
        this.datosCons.area = '';
        this.datosCons.turno = '';
        this.datosCons.nombre = '';
        this.datosCons.matricula = '';
        this.home.NoPago = '';
        this.tabla = false;
        this.paso2 = false;
      }
    });
  }
  comprobar() {
    this.datosCons.asunto = this.valortipo.tipo;
    this.datosCons.asunto = this.valortipo.tipo;
    this.datosCons.semestre = this.semestre;
    this.datosCons.especialidad = this.especialidad;
    this.datosCons.area = this.area;
    this.datosCons.turno = this.turno;
    this.datosCons.nombre = this.alumno;
    this.datosCons.matricula = this.noctrl;

    if (
      this.home.NoPago != null &&
      this.home.NoPago != undefined &&
      this.home.NoPago != ''
    ) {
      this.home.numControl = this.noctrl;
      Notiflix.Loading.standard('Revisando Código');

      this.user.NoPago(this.home).subscribe((res: any) => {
        if (res.valido != '' && res.valido != null && res.valido != undefined) {
          this.paso2 = true;
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
}
