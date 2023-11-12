import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { firstValueFrom, generate } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { SendEmailService } from 'src/app/service/send-email.service';
import { UsuarioService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html',
  styleUrls: ['./administrativo.component.css']
})
export class AdministrativoComponent implements OnInit {
  solicitud = {
    numControl: "",
    emitio: "",
    codigoPago: "",
    fechaSolicitud: new Date().toLocaleDateString('en-us'),
    aportacion: "",
    descripcion: "Pago Realizado Con Éxito",
  };

  datosEsc :any = [];

  clavesEsp = {
    programacion: "",
    contabilidad: "",
    soporte: "",
    electricidad: "",
    alimentos: ""
  };

  usuario : any = [];
  alumno: any = [];
  nc: any = [];

  datosAlumno: any = [];
  datosDocente: any = [];
  datos: any = [];
  datosAdmisnitrativo: any = [];

  aceptado: any = [];
  verificado = false;
  numero: string = "";

  constructor(private userServicio: UsuarioService,
    private nav: NavegacionService,
    private email: SendEmailService,
    private admin: AdminService,
    private auth: AuthService) {
    this.nav._usuario = this.auth.decodifica().nombre + " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    this.nav._foto = this.auth.decodifica().foto;
    this.nav._perfil = false;
  }
  ngOnInit() {
    this.auth.isAuth() ? null : this.nav.salir();
  }
  async cargaSoliciudAceeso() {
    try {
      const res = await firstValueFrom(this.auth.solicitudAcceso({ numControl:  this.auth.decodifica().numControl}));
      if (res.validar) {
        if (res.docentes.length!=0) this.datosDocente = res.docentes;
        if (res.administrativos.length!=0) this.datosAdmisnitrativo=res.administrativos;
        if (res.alumnos.length!=0) this.datosAlumno=res.alumnos;
      }
      else {
        Notiflix.Notify.failure("Error, Intente De Nuevo " + res.err);
      }
    } catch (error) {
      Notiflix.Notify.failure("Error, Intente De Nuevo " + error);
    }
  }
  aceptar(op: any) {
    this.admin.usuarioAceptado({numControl:op}).subscribe((res: any) => {
      Notiflix.Notify.success(res);
      if(this.usuario.rol=="Alumno"){this.datosAlumno = [];}
      if(this.usuario.rol=="Docente"){this.datosDocente = [];}
      if(this.usuario.rol = "Control Escolar"){this.datosAdmisnitrativo = [];}
      if(this.usuario.rol = "Orientación Educativa"){this.datosAdmisnitrativo = [];}
      this.cargaSoliciudAceeso();
      this.CorreoAcpetacion(this.usuario);
      this.ngOnInit();
    });
   
    
  }
  Noaceptado(op: any) {
    this.admin.usuarioAceptado({numControl:op}).subscribe((res: any) => {
      Notiflix.Notify.failure(res);
      //this.CorreoAcpetacion(op);
      if(this.usuario.rol=="Alumno"){this.datosAlumno = [];}
      if(this.usuario.rol=="Docente"){this.datosDocente = [];}
      if(this.usuario.rol = "Control Escolar"){this.datosAdmisnitrativo = [];}
      if(this.usuario.rol = "Orientación Educativa"){this.datosAdmisnitrativo = [];}
      this.cargaSoliciudAceeso();
      this.ngOnInit();
    });
    this.usuario = [];  
    this.cargaSoliciudAceeso();
  }
  CorreoAcpetacion(usuario: any) {
    var nombre =  `${this.usuario.nombre} ${this.usuario.apellidoP} ${this.usuario.apellidoM}`;
    this.email.correoAcpetacion({correo: usuario.correo, tipo:"validacion", op:1, nombre: nombre, numControl: usuario.numControl, password: usuario.password}).subscribe((res: any) => {
      Notiflix.Notify.info("Correo Enviado");
    });
    this.ngOnInit();
  }
  verificar() {
    const numcontrol = {
      numControl: this.nc,
      rol:"AL"
    };
    if (this.nc == null || this.nc == "") {
      Notiflix.Notify.failure("No se ha ingresado un número de control");
    }
    else {
      this.userServicio.datosUser(numcontrol).subscribe((res: any) => {
        if (res.dato != "" && res.dato != null) {
          this.alumno = res.dato;
          this.verificado = true;

        } else { this.verificado = false; }
      });
      this.ngOnInit();
    }
  }
  GenerarCodigoPago() {
    this.numero = "hola";
    const numPago = {
      numPago: this.generateRandomString(12),
      numcontrol: this.nc
    };
    this.admin.verificaNoPago(numPago).subscribe((res: any) => {
      
      if (res.valido == "Aceptado") {
        this.numero = numPago.numPago;
      } else { this.numero = this.generateRandomString(12); }
    });
    this.ngOnInit();
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
      };

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
  obtenerDatos(numControl: any, rol: any) {
  
    this.userServicio.verInfo({ numControl: numControl, rol: rol }).subscribe((res: any) => {
     
      if (res.verificado) {
        this.usuario = res.data;
        if(res.data.rol=="AL") this.usuario.rol = "Alumno";
        if(res.data.rol=="DO") this.usuario.rol = "Docente";
        if(res.data.rol=="CE") this.usuario.rol = "Control Escolar";
        if(res.data.rol=="OE") this.usuario.rol = "Orientación Educativa";
      } else {
        Notiflix.Notify.failure("Error, Intente De Nuevo ");
      }
    });
    this.ngOnInit();
  }
  obtenerdatEsc() {
    this.userServicio.datosEsc().subscribe((res: any) => {
      this.datosEsc = res.data;
    });
    this.admin.getClavesEsp().subscribe((res: any) => {
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
    this.ngOnInit();
  }
  guardCambios() {
    Notiflix.Loading.standard("Guardando");
    this.admin.guardarDatosEsc(this.datosEsc).subscribe((res: any) => {
      Notiflix.Loading.remove();
      Notiflix.Notify.info(res.ok);
    });
    this.admin.guardarClavesEsp(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Loading.remove();
      Notiflix.Notify.info(res.ok);
    });
    this.ngOnInit();
  }
  progactu() {
    this.admin.guardarClavesEspProg(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  contaActu() {
    this.admin.guardarClavesEspconta(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  ElectricidadActu() {
    this.admin.guardarClavesEspElectricidad(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  AlimentosActu() {
    this.admin.guardarClavesEspAlimentos(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  SoporteActu() {
    this.admin.guardarClavesEspSoporte(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }

  /*
  
  modulo de asignacion de globales
  
  */

  

}
