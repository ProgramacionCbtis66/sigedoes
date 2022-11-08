import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import * as Notiflix from 'notiflix';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { SendEmailService } from '../../service/send-email.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  alumno: any;
  curp: any;
  correo: any;
  noctrl: any;
  especialidad: any;
  semestre: any;
  area: any;
  turno: any;
  datos: any;
  tabla = false;
  datoo: any;
  boton = false;
  emitidas: any;
  datosRegistro: any;
  paso3 = false;
  valortipo = {
    "tipo": "",
  }
  datosCons = {
    "asunto": "",
    "nombre": "",
    "matricula": "",
    "claveIns": "",
    "semestre": "",
    "especialidad": "",
    "claveEsc": "352100002-16",
    "area": "",
    "turno": "",
    "horario": "7:00 AM - 14:00 PM",
    "periodo": ""
  }
  dato = {
    "numcontrol": ""
  }

  constructor(private auth: AuthService, private user: UsuarioService, private email: SendEmailService) { }
  home = {
    NoPago: "",
    numControl: ""
  }
  ngOnInit(): void {

    if (this.auth.isAuth()) {
      let token = this.auth.decodifica();

      this.dato.numcontrol = token.numControl;

      this.user.datosUser(this.dato).subscribe((res: any) => {
        if (res != "" && res != null) {
          this.datos = JSON.parse(res.data);
          this.alumno = this.datos.nombre;
          this.curp = this.datos.CURP;
          this.correo = this.datos.correo;
          this.noctrl = this.datos.numControl;
          this.semestre = this.datos.grado;
          this.area = this.datos.area;
          this.turno = this.datos.turno;
          this.especialidad = this.datos.especialidad;
          this.datosCons.periodo = this.datos.Esc_Periodo;
          this.datosCons.claveIns = this.datos.CTO;

        }
      });

    }

    Notiflix.Notify.info("Bienvenido ");
  }


  generarcons() {
    const email = {
      email: this.correo,
      asunto: this.datosCons.asunto,
      tipo: "Constancia",
      numControl: this.noctrl,
      codigoPago: this.home.NoPago
    }
    this.email.envioConstancia(email).subscribe((res: any) => { });
    this.user.obtenerDatos(this.home).subscribe((res: any) => {
      console.log(res);
      this.datosRegistro = {
        "NoCtrl": this.dato.numcontrol,
        "emitio": res.emitio,
        "fecha": res.fechaSolicitud,
        "CodPago": this.home.NoPago
      }
    });
    this.user.subirEmitido(this.datosRegistro).subscribe((res: any) => {
    });
    this.user.NoPagoDesactivo(this.home).subscribe((res: any) => {
      if (res.msg == "ok") {
        this.datosCons.asunto = "";
        this.datosCons.semestre = "";
        this.datosCons.especialidad = "";
        this.datosCons.area = "";
        this.datosCons.turno = "";
        this.datosCons.nombre = "";
        this.datosCons.matricula = "";
        this.home.NoPago = "";
        this.tabla = false;
      }
    });



  }

  actualizar() {
    this.paso3 = true;
  }

  comprobar() {
    {
      this.datosCons.asunto = this.valortipo.tipo;
      this.datosCons.semestre = this.semestre;
      this.datosCons.especialidad = this.especialidad;
      this.datosCons.area = this.area;
      this.datosCons.turno = this.turno;
      this.datosCons.nombre = this.alumno;
      this.datosCons.matricula = this.noctrl;
    }
    if (this.home.NoPago != null && this.home.NoPago != undefined && this.home.NoPago != "") {
      this.home.numControl = this.noctrl;
      Notiflix.Loading.standard("Revisando Código");
      this.user.NoPago(this.home).subscribe((res: any) => {
        if (res.valido != "" && res.valido != null && res.valido != undefined) {
          this.tabla = true;
          Notiflix.Loading.remove();
          if (this.datosCons.asunto != "" && this.datosCons.nombre != "" && this.datosCons.semestre != "" && this.datosCons.especialidad != "" && this.datosCons.area != "" && this.datosCons.turno != "" && this.datosCons.matricula != "" && this.datosCons.claveIns != "" && this.datosCons.claveEsc != "" && this.datosCons.horario != "" && this.datosCons.periodo != "") {
            if (this.boton) {
              this.boton = false;
            } else {
              this.boton = true;
            }
          }

        } else {
          Notiflix.Loading.remove();
          Notiflix.Notify.info("El Número No Es Valido");
          this.tabla = false;
        }
        if (this.tabla == false) this.boton = false;
      });
    }

  }
}
