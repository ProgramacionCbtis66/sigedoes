import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { SendEmailService } from 'src/app/service/send-email.service';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  proyecto = environment.proyecto;
  paso2 = false;
  nombre = "";
  curp: any;
  correo: any;
  noctrl: any;
  especialidad: any;
  semestre: any;
  area: any;
  turno: string = '';
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
    CTO:'',
    foto: ''
  };

  tabla = false;
  datoo: any;
  boton = false;
  emitidas: any;

  valortipo = "";
  datosCons = {
    asunto: '',
    alumno: this.datos.nombre,
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

  ) {
    this.nav._usuario = this.auth.decodifica().nombre;
  }
  
  async ngOnInit() {
    if (this.auth.isAuth() && this.nombre == "") {
      this.datos.numControl = this.auth.decodifica().numControl;
      const numControl = {
        numControl: this.datos.numControl
      };
      try {
        console.log(numControl);
        const res = await firstValueFrom (this.user.datosUser(numControl));
        if (res != '' && res != undefined) {
          this.datos = JSON.parse(res.data);
        }
      } catch (error) {
        console.error(error);
      }
      this.nav._usuario = this.datos.nombre;
      this.nombre = this.datos.nombre;
      try {
        this.nav._foto = this.datos.foto;
      } catch (error) {
        this.nav._foto = 'sinfoto';
      }
      
    }
  }

  actualizar() {
    this.datosCons.asunto = this.valortipo;
  }
  veridatos() {
    this.datosCons.asunto = this.valortipo;
    if(
      this.datosCons.asunto != '' &&
      this.datosCons.alumno != '' &&
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
        this.datosCons.asunto = '';
        this.datosCons.semestre = '';
        this.datosCons.especialidad = '';
        this.datosCons.area = '';
        this.datosCons.turno = '';
        this.datosCons.alumno = '';
        this.datosCons.matricula = '';
        this.home.NoPago = '';
        this.tabla = false;
        this.paso2 = false;
      }
    });
  }
  comprobar() {
    this.datosCons.asunto = this.valortipo;
    this.datosCons.asunto = this.valortipo;
    this.datosCons.semestre = this.semestre;
    this.datosCons.especialidad = this.especialidad;
    this.datosCons.area = this.area;
    this.datosCons.turno = this.turno;
    this.datosCons.alumno = this.nombre;
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
