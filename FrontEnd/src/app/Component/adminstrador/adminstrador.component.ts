import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { SendEmailService } from 'src/app/service/send-email.service';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { AppComponent } from 'src/app/app.component';
import { firstValueFrom } from 'rxjs';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-adminstrador',
  templateUrl: './adminstrador.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./adminstrador.component.css']
})
export class AdminstradorComponent implements OnInit {

  solicitud = {
    numControl: "",
    emitio: "",
    codigoPago: "",
    fechaSolicitud: new Date().toLocaleDateString('en-us'),
    aportacion: "",
    descripcion: "Pago Realizado Con Éxito",
  }
  data = {
    "numcontrol": ""
  }

  datosEsc = {
    nomEscuela: "",
    CTO: "",
    direccionEsc: "",
    correoEsc: "",
    telefEsc: "",
    nomDirec: "",
    periodo: ""
  }
  clavesEsp = {
    programacion: "",
    contabilidad: "",
    soporte: "",
    electricidad: "",
    alimentos: ""
  }
  usuario = {
    "nombre": "",
    "correo": "",
    "curp": "",
    "noctrl": "",
    "especialidad": "",
    "semestre": "",
    "area": "",
    "turno": "",
    "direccion": "",
    "CTO": "30DCT0236O",
    "grupo": "",
    "pass": ""
  }
  alumno = {
    "nombre": "",
    "grado": "",
    "grupo": "",
    "especialidad": "",
    "correo": "",
    "turno": "",
    "escuela": "",
    "numControl": ""
  }
  nc: any;
  datos: any;
  aceptado: any;
  verificado = false;
  numero: string = "";

  constructor(private userServicio: UsuarioService,
    private app: AppComponent,
    private email: SendEmailService,
    private admin: AdminService,
    private auth: AuthService) { }

  async ngOnInit() {

    let token = this.auth.decodifica();
      this.data.numcontrol = token.numControl;
      this.app.usuario =  token.nombre;
    try {
      const res = await firstValueFrom(this.userServicio.datosUser(this.data));
      this.datos = JSON.parse(res.data);
      this.app.usuario = this.auth.decodifica().nombre;
      this.app.home.next(false);
      this.app.iflogin.next(false);
      this.app.logout.next(true);
    } catch (error) {
      console.log(error);
    }
  }
  si() {

  }
  aceptar(op: any) {
    this.aceptado = op;
    this.aceptado.op = 1;
    this.aceptado.tipo = "validacion";
    this.aceptado.numControl = this.usuario.noctrl;
    this.aceptado.correo = this.usuario.correo;
    this.aceptado.nombre = this.usuario.nombre;
    this.aceptado.password = this.usuario.pass;
    this.admin.usuarioAceptado(this.aceptado).subscribe((res: any) => {
      Notiflix.Notify.success(res);
      this.CorreoAcpetacion(op);
      this.ngOnInit();
    });
  }
  Noaceptado(op: any) {
    this.aceptado = op;
    this.aceptado.op = 3;
    this.aceptado.tipo = "validacion";
    this.aceptado.numControl = this.usuario.noctrl;
    this.admin.usuarioAceptado(this.aceptado).subscribe((res: any) => {
      Notiflix.Notify.failure(res);
      //this.CorreoAcpetacion(op);
      this.ngOnInit();
    });
  }

  CorreoAcpetacion(correo: any) {
    this.email.correoAcpetacion(correo).subscribe((res: any) => {
      Notiflix.Notify.info("Correo Enviado");
    });
  }


  verificar() {

    const numcontrol = {
      numcontrol: this.nc
    }
    if (this.nc == null || this.nc == "") {
      Notiflix.Notify.failure("No se ha ingresado un número de control");
    }
    else {
      this.userServicio.datosUser(numcontrol).subscribe((res: any) => {
        if (res.data != "" && res.data != null) {
          const datos = JSON.parse(res.data);
          this.alumno.nombre = datos.nombre;
          this.alumno.correo = datos.correo;
          this.alumno.grado = datos.grado;
          this.alumno.grupo = datos.grupo;
          this.alumno.especialidad = datos.especialidad;
          this.alumno.turno = datos.turno;
          this.alumno.escuela = datos.Esc_nombre;
          this.alumno.numControl = datos.numControl;
          this.verificado = true;

        } else { this.verificado = false }
      });
    }
  }

  GenerarCodigoPago() {
    this.numero = "";
    const numPago = {
      numPago: this.generateRandomString(12),
      numcontrol: this.nc
    }
    this.userServicio.verificaNoPago(numPago).subscribe((res: any) => {
      if (res.valido == "Aceptado") {
        this.numero = numPago.numPago;
      } else { this.GenerarCodigoPago(); }
    });
  }

  generateRandomString(num: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@&';
    let result1 = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
  }

  enviarSolicitud() {
    if (this.numero !== "") {
      const admin = this.auth.decodifica();
      this.solicitud.emitio = admin.nombre;
      this.solicitud.numControl = this.alumno.numControl;
      this.solicitud.codigoPago = this.numero;
      this.admin.enviarSolicitud(this.solicitud).subscribe((res: any) => {

        if (res.msg == "ok") {
          Notiflix.Notify.success("Registrado");

        }
      });

      let Email = {
        numControl: this.nc,
        tipo: "numPago",
        correo: this.alumno.correo,
        numPago: this.solicitud.codigoPago
      }

      this.email.envioSolicitud(Email).subscribe((res: any) => {
        if (res = "Correo enviado satisfactoriamente") {
          Notiflix.Notify.success("Solicitud Enviada A Su Correo");
        }
      });

      this.nc = "";
      this.solicitud.numControl = "";
      this.solicitud.emitio = "";
      this.solicitud.codigoPago = "";
      this.alumno.nombre = "";
      this.alumno.grado = "";
      this.alumno.grupo = "";
      this.alumno.especialidad = "";
      this.alumno.correo = "";
      this.alumno.turno = "";
      this.alumno.escuela = "";
      this.alumno.numControl = "";
    } else {
      alert("Número de pago no disponible");
    }
  }
  obtenerDatos(numControl: any) {
    this.data.numcontrol = numControl;
    this.usuario.noctrl = numControl;
    this.userServicio.verInfo(this.data).subscribe((res: any) => {
      if (res.ok = "ok") {
        const datos = res.data
        this.usuario.nombre = datos.nombre;
        this.usuario.correo = datos.correo;
        this.usuario.direccion = datos.direccion;
        this.usuario.curp = datos.CURP;
        this.usuario.area = datos.area;
        this.usuario.especialidad = datos.especialidad;
        this.usuario.grupo = datos.grupo;
        this.usuario.semestre = datos.grado;
        this.usuario.turno = datos.turno;
        const noctrl = {
          numcontrol: numControl
        }
        this.userServicio.getContra(noctrl).subscribe((res: any) => {
          this.usuario.pass = res.contra;
        });
      }
      else if (res.err = "err") {
        Notiflix.Notify.info("Error, Intente De Nuevo");
      }
    });
  }
  obtenerdatEsc() {
    this.userServicio.datosEsc().subscribe((res: any) => {
      const datos = JSON.parse(res.data);
      this.datosEsc.CTO = datos.CTO;
      this.datosEsc.correoEsc = datos.Esc_correo;
      this.datosEsc.direccionEsc = datos.Esc_direccion;
      this.datosEsc.nomDirec = datos.Esc_Director;
      this.datosEsc.nomEscuela = datos.Esc_nombre;
      this.datosEsc.periodo = datos.Esc_Periodo;
      this.datosEsc.telefEsc = datos.Esc_telefono;
    });
    this.userServicio.getClavesEsp().subscribe((res: any) => {
      if (res.programacion != undefined && res.contabilidad != undefined && res.electricidad != undefined && res.alimentos != undefined && res.soporte != undefined) {
        const prog = JSON.parse(res.programacion);
        const conta = JSON.parse(res.contabilidad);
        const electricidad = JSON.parse(res.electricidad);
        const alimentos = JSON.parse(res.alimentos);
        const soporte = JSON.parse(res.soporte);
        this.clavesEsp.programacion = prog.Clave;
        this.clavesEsp.contabilidad = conta.Clave;
        this.clavesEsp.electricidad = electricidad.Clave;
        this.clavesEsp.alimentos = alimentos.Clave;
        this.clavesEsp.soporte = soporte.Clave;
      }
    });
  }
  guardCambios() {
    Notiflix.Loading.standard("Guardando");
    this.userServicio.guardarDatosEsc(this.datosEsc).subscribe((res: any) => {
      Notiflix.Loading.remove();
      Notiflix.Notify.info(res.ok);
    });
    this.userServicio.guardarClavesEsp(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Loading.remove();
      Notiflix.Notify.info(res.ok);
    });
  }
  progactu() {
    this.userServicio.guardarClavesEspProg(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  contaActu() {
    this.userServicio.guardarClavesEspconta(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  ElectricidadActu() {
    this.userServicio.guardarClavesEspElectricidad(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  AlimentosActu() {
    this.userServicio.guardarClavesEspAlimentos(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  SoporteActu() {
    this.userServicio.guardarClavesEspSoporte(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
}
