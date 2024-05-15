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
    fechaSolicitud: new Date().toLocaleDateString(),
    aportacion: "",
    descripcion: "Pago Realizado Con Éxito",
  };

  datosEsc: any = [];

  clavesEsp = {
    programacion: "",
    contabilidad: "",
    soporte: "",
    electricidad: "",
    alimentos: ""
  };
  ceap: any = [];
  usuario: any = [];
  alumno: any = [];
  nc: any = [];

  datosAlumno: any = [];
  datosDocente: any = [];
  datos: any = [];
  datosAdmisnitrativo: any = [];
  globales: any = [];
  recursas: any = [];
  asignarRecursas: any = {};
  maestros: any = [];
  asignarGlobales: any = {};

  aceptado: any = [];
  verificado = false;
  numero: string = "";

  allGlobalData = [];
  allRecursaData = [];

  selectGlobalRecursa = {imgCeap: "", imgFrm5: "", id: "", type: ""};

  constructor(protected userServicio: UsuarioService,
    protected nav: NavegacionService,
    protected email: SendEmailService,
    protected admin: AdminService,
    protected auth: AuthService,
    protected alumn: UsuarioService) {
    this.nav._usuario = this.auth.decodifica().nombre + " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    this.nav._perfil = false;
    this.getCEAP();
    this.obtenerdatEsc();
  }



  ngOnInit() {
    this.auth.isAuth() ? null : this.nav.salir();
  }
  
  async cargaSoliciudAceeso() {
    this.ngOnInit();
    try {
      const res = await firstValueFrom(this.auth.solicitudAcceso({ numControl: this.auth.decodifica().numControl }));
      if (res.validar) {
        if (res.docentes.length != 0) this.datosDocente = res.docentes;
        if (res.administrativos.length != 0) this.datosAdmisnitrativo = res.administrativos;
        if (res.alumnos.length != 0) this.datosAlumno = res.alumnos;
      }
      else {
        Notiflix.Notify.failure("Error, Intente De Nuevo " + res.err);
      }
    } catch (error) {
      Notiflix.Notify.failure("Error, Intente De Nuevo " + error);
    }
  }
  aceptar(op: any) {
    this.ngOnInit();
    this.admin.usuarioAceptado({ numControl: op }).subscribe((res: any) => {
      Notiflix.Notify.success(res);
      if (this.usuario.rol == "Alumno") { this.datosAlumno = []; }
      if (this.usuario.rol == "Docente") { this.datosDocente = []; }
      if (this.usuario.rol = "Control Escolar") { this.datosAdmisnitrativo = []; }
      if (this.usuario.rol = "Orientación Educativa") { this.datosAdmisnitrativo = []; }
      this.cargaSoliciudAceeso();
      this.CorreoAcpetacion(1);
      this.ngOnInit();
    });


  }
  Noaceptado(op: any) {
    this.ngOnInit();
    this.admin.usuarioAceptado({ numControl: op }).subscribe((res: any) => {
      Notiflix.Notify.failure(res);
      this.CorreoAcpetacion(2);
      if (this.usuario.rol == "Alumno") { this.datosAlumno = []; }
      if (this.usuario.rol == "Docente") { this.datosDocente = []; }
      if (this.usuario.rol = "Control Escolar") { this.datosAdmisnitrativo = []; }
      if (this.usuario.rol = "Orientación Educativa") { this.datosAdmisnitrativo = []; }
      this.cargaSoliciudAceeso();
      this.ngOnInit();
    });
    this.usuario = [];
    this.cargaSoliciudAceeso();
  }
  CorreoAcpetacion(op: any) {
    this.ngOnInit();
    const usuario = this.usuario;
    var nombre = `${this.usuario.nombre} ${this.usuario.apellidoP} ${this.usuario.apellidoM}`;
    this.email.correoAcpetacion({ correo: usuario.correo, tipo: "validacion", op: op, nombre: nombre, numControl: usuario.numControl, password: usuario.password }).subscribe((res: any) => {
      Notiflix.Notify.info("Correo Enviado");
    });
    this.ngOnInit();
  }
  verificar() {
    const numcontrol = {
      numControl: this.nc,
      rol: "AL"
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
    this.ngOnInit();
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
    this.ngOnInit();
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
    this.ngOnInit();
    this.userServicio.verInfo({ numControl: numControl, rol: rol }).subscribe((res: any) => {

      if (res.verificado) {
        this.usuario = res.data;
        if (res.data.rol == "AL") this.usuario.rol = "Alumno";
        if (res.data.rol == "DO") this.usuario.rol = "Docente";
        if (res.data.rol == "CE") this.usuario.rol = "Control Escolar";
        if (res.data.rol == "OE") this.usuario.rol = "Orientación Educativa";
      } else {
        Notiflix.Notify.failure("Error, Intente De Nuevo ");
      }
    });
    this.ngOnInit();
  }

  /*

  modulo datos de la escuela y claves especiales

  */

  async obtenerdatEsc() {

    const escuela = await firstValueFrom(this.admin.datosEsc());
    this.datosEsc = escuela.data;
    const claves = await firstValueFrom(this.admin.getClavesEsp());
    if (claves != null) {

      this.clavesEsp.programacion = claves.programacion.clave;
      this.clavesEsp.contabilidad = claves.contabilidad.clave;
      this.clavesEsp.electricidad = claves.electricidad.clave;
      this.clavesEsp.alimentos = claves.alimentos.clave;
      this.clavesEsp.soporte = claves.soporte.clave;
    }
    this.ngOnInit();
  }
  guardCambios() {
    this.ngOnInit();
    Notiflix.Loading.standard("Guardando");
    this.admin.guardarDatosEsc(this.datosEsc).subscribe((res: any) => {
      Notiflix.Loading.remove();
      Notiflix.Notify.info(res.ok);
    });
    // this.admin.guardarClavesEsp(this.clavesEsp).subscribe((res: any) => {
    //   Notiflix.Loading.remove();
    //   Notiflix.Notify.info(res.ok);
    // });
    this.ngOnInit();
  }
  progactu() {
    this.ngOnInit();
    this.admin.guardarClavesEsp(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  contaActu() {
    this.ngOnInit();
    this.admin.guardarClavesEsp(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  ElectricidadActu() {
    this.ngOnInit();
    this.admin.guardarClavesEsp(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  AlimentosActu() {
    this.admin.guardarClavesEsp(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });
  }
  SoporteActu() {
    this.admin.guardarClavesEsp(this.clavesEsp).subscribe((res: any) => {
      Notiflix.Notify.info(res.ok);
    });

  }


  /*

  modulo de asignacion de globales y Recursas

  */

  async getGlobales() {
    this.ngOnInit();
    const res = await firstValueFrom(this.admin.getMateriasGlobales());
    if (res.ok == "vacio") {
      this.globales = [];
    } else {
      this.globales = res.ok;
    }

  }
  async viewModalGlobal(dato: any, op: any) {
    this.ngOnInit();
    if (op == 'recursa') {
      this.asignarRecursas = dato;
    } else {
      this.asignarGlobales = dato;
    }
    const maestros = await firstValueFrom(this.admin.getMaestros());
    this.maestros = maestros.ok;
  }

  async getAsignaRecursaGlobal(dato: any, op: any) {
    this.ngOnInit();
    if (op == 'recursa') {
      const recursa = await firstValueFrom(this.admin.getAsignaRecursa(dato));
      if (recursa.ok != "vacio") {
        this.asignarRecursas = dato;
        this.asignarRecursas.lugar = recursa.ok.lugar;
        this.asignarRecursas.fecha = recursa.ok.fecha;
        this.asignarRecursas.hora = recursa.ok.hora;
        this.asignarRecursas.docenteDniApli = recursa.ok.docenteDni;
        this.asignarRecursas.idasigrecursa = recursa.ok.idasigrecursa;
      }
    } else {

      const global = await firstValueFrom(this.admin.getAsignaGlobal(dato))

      if (global.ok != "vacio") {
        this.asignarGlobales = dato;
        this.asignarGlobales.lugar = global.ok.lugar;
        this.asignarGlobales.fecha = global.ok.fecha;
        this.asignarGlobales.hora = global.ok.hora;
        this.asignarGlobales.docenteDniApli = global.ok.docenteDni;
        this.asignarGlobales.idasiglobd = global.ok.idasiglobd;
      }
    }
    const maestros = await firstValueFrom(this.admin.getMaestros());
    this.maestros = maestros.ok;
 
  }

  async asignaOtroMaestro(dato: any) {

  }

  subirRegistroGlobal() {
    this.ngOnInit();
    if (this.asignarGlobales.lugar != '' && this.asignarGlobales.hora != '' && this.asignarGlobales.fecha != '' && this.asignarGlobales.docenteDni != '' && this.asignarGlobales.docenteDni != undefined) {
      this.admin.guardarAsignacionGlobal(this.asignarGlobales).subscribe((res) => {
        if (res.ok == "ok") {
          Notiflix.Notify.info("Global Acreditado");
          this.getGlobales();
          this.asignarGlobales = {};
        } else {
          Notiflix.Notify.failure("Ha Ocurrido Un Error");
        }
      });

    } else {
      Notiflix.Notify.failure('Rellene Todos Los Campos');
    }

  }

  actualizarRegistroGlobal() {
    this.ngOnInit();
    if (this.asignarGlobales.lugar != '' && this.asignarGlobales.hora != '' && this.asignarGlobales.fecha != '' && this.asignarGlobales.docenteDni != '' && this.asignarGlobales.docenteDni != undefined) {
      this.admin.actualizaAsignacionGlobal(this.asignarGlobales).subscribe((res) => {
        if (res.ok == "ok") {
          Notiflix.Notify.info("Global Actualizado");
          this.getGlobales();
          this.asignarGlobales = {};
        } else {
          Notiflix.Notify.failure("Ha Ocurrido Un Error");
        }
      });

    } else {
      Notiflix.Notify.failure('Rellene Todos Los Campos');
    }
  }

  actualizarRegistroRecursa() {
    this.ngOnInit();
    if (this.asignarRecursas.lugar != '' && this.asignarRecursas.hora != '' && this.asignarRecursas.fecha != '' && this.asignarRecursas.docenteDni != '' && this.asignarRecursas.docenteDni != undefined) {
      this.admin.actualizaAsignacionRecursa(this.asignarRecursas).subscribe((res) => {
        if (res.ok == "ok") {
          Notiflix.Notify.info("Recursa Actualizado");
          this.getRecursas();
          this.asignarRecursas = {};
        } else {
          Notiflix.Notify.failure("Ha Ocurrido Un Error");
        }
      });

    } else {
      Notiflix.Notify.failure('Rellene Todos Los Campos');
    }
  }

  setDNI(DNI: any) {
    this.ngOnInit();
    this.asignarGlobales.docenteDni = DNI;
  }
  async getRecursas() {
    const r = await firstValueFrom(this.admin.getMateriasRecursa());
    if (r.ok == 'vacio') {
      this.recursas = [];
    } else {
      this.recursas = r.ok;
    }
  }
  subirRegistroRecursa() {
    this.ngOnInit();
    if (this.asignarRecursas.lugar != undefined && this.asignarRecursas.hora != undefined && this.asignarRecursas.fecha != undefined && this.asignarRecursas.docenteDni != undefined && this.asignarRecursas.lugar != '' && this.asignarRecursas.hora != '' && this.asignarRecursas.fecha != '') {
      this.admin.guardarAsignacionRecursa(this.asignarRecursas).subscribe((res) => {
        if (res.ok == 'ok') {
          Notiflix.Notify.info("Recursa Acreditado");
          this.getRecursas();
          this.asignarRecursas = {};
        } else {
          Notiflix.Notify.failure("Ha ocurrido Un Error");
        }
      });
    } else {
      Notiflix.Notify.failure("Rellene Todos Los Campos");
    }
  }
  setDNIr(dni: any) {
    this.ngOnInit();
    this.asignarRecursas.docenteDni = dni;
  }
  /*
   módulo de asignación de CEAP
  */

  async getCEAP() {
    this.ngOnInit();
    const res = await firstValueFrom(this.admin.getCEAP());
    if (res.ok == "vacio") {
      this.ceap = [];
    } else {
      this.ceap = res.ok;
    }
  }

  async actceap(dato: any) {
    this.ngOnInit();
    const res = await firstValueFrom(this.admin.actualizaCEAP(dato));
    if (res.ok == "ok") {
      Notiflix.Notify.info(`Costo de ${dato.concepto} Actualizado`, {
        timeout: 2000,
      });
    } else {
      Notiflix.Notify.failure("Ha Ocurrido Un Error");
    }
  }

  /*
  
  modulo de solicitus de globales y recursas
  
  */

  /*  Globales */
  solicitudesGlobales: any = [];
  filtroGlobales: any = [];
  filtroSolicitudesGlobales: any = [];
  globFil: any = [];

  async getSolicitudesGlobales() {
    this.ngOnInit();

    const res = await firstValueFrom(this.admin.getSolicitudesGlobales());
    await this.traerGlobalComprobante();
    if (res.ok == "vacio") {
      this.solicitudesGlobales = [];
    } else {
      this.solicitudesGlobales = res.ok;
      
      for(var i = 0; i <= this.solicitudesGlobales.length - 1; i++){
        this.solicitudesGlobales[i].gradoAndGrupo = this.alumn.obtenerGrado(this.solicitudesGlobales[i].grado, this.solicitudesGlobales[i].alumnoNumControl, this.solicitudesGlobales[i].Ingreso) + this.solicitudesGlobales[i].grupo;
      }
      
      this.globFil[0] = [...new Set(this.solicitudesGlobales.map((gd: any) => gd.grado))];
      this.globFil[1] = [...new Set(this.solicitudesGlobales.map((gp: any) => gp.grupo))];
      this.globFil[2] = [...new Set(this.solicitudesGlobales.map((esp: any) => esp.especialidad))];
      this.globFil[3] = [...new Set(this.solicitudesGlobales.map((tn: any) => tn.turno))];

      this.globFil[0] = this.globFil[0].sort();
      this.globFil[1] = this.globFil[1].sort();
      this.globFil[2] = this.globFil[2].sort();

      this.filtroSolicitudGlobales();
    }
  }

  async autorizarGlobal(event: any, dato: any) {
    const control = event.target.id;
    if (control == "Autorizado") {
      const autorizado = {
        estado: 2,
        idglobales: dato.idglobales,
        docenteDni: this.auth.decodifica().numControl,
      }
      if (control == 'Rechazado') {
        const autorizado = {
          estado: 8,
          idglobales: dato.idglobales,
          docenteDni: this.auth.decodifica().numControl,
        }
      }
      if (confirm("¿Esta usted seguro de Autorizar o Rechazar la Solicitud?")) {
        const res = await firstValueFrom(this.admin.autorizarGlobal(autorizado));
        if (res.ok == "ok") {
          if (control == 'Autorizada') Notiflix.Notify.info("Solicitud Autorizada");
          if (control == 'Rechazada') Notiflix.Notify.info("Solicitud Rechazada");
          this.getSolicitudesGlobales();
        } else {
          Notiflix.Notify.failure("Ha Ocurrido Un Error");
        }
      }
    }
  }

  async aprobarGlobalRecursaType(){
    if(this.selectGlobalRecursa.type == "global"){
      await this.aprobarGlobalComprobante();
    } else if(this.selectGlobalRecursa.type == "recursa"){
      await this.aprobarRecursaComprobante();
    }
  }

  async traerGlobalComprobante(){
    const res = await firstValueFrom(this.admin.traerGlobalDatos());
    this.allGlobalData = res.ok;
  }

  verGlobalComprobante(numGlobal: any){
    var res = this.allGlobalData.filter((data: any) => Number(data.id) == numGlobal);
    this.selectGlobalRecursa = res[0];
    this.selectGlobalRecursa.type = "global";
  }

  async aprobarGlobalComprobante(){
    var res = await firstValueFrom(this.admin.aprovedGlobalComprobante(this.selectGlobalRecursa));
    if(res.ok == "ok"){
      Notiflix.Notify.success("Comprobantes Verificados y Aceptados.");
      this.getSolicitudesGlobales();
    } else {
      Notiflix.Notify.failure("Ocurrio un Error al Aprobar");
      this.getSolicitudesGlobales();
    }
  }

  async traerRecursaComprobante(){
    const res = await firstValueFrom(this.admin.traerRecursaDatos());
    this.allRecursaData = res.ok;
  }

  verRecursaComprobante(numRecursa: any){
    var res = this.allRecursaData.filter((data: any) => Number(data.id) == numRecursa);
    this.selectGlobalRecursa = res[0];
    this.selectGlobalRecursa.type = "recursa";
  }

  async aprobarRecursaComprobante(){
    var res = await firstValueFrom(this.admin.aprovedRecursaComprobante(this.selectGlobalRecursa));
    if(res.ok == "ok"){
      Notiflix.Notify.success("Comprobantes Verificados y Aceptados.");
      this.getSolicitudesRecursas();
    } else {
      Notiflix.Notify.failure("Ocurrio un Error al Aprobar");
      this.getSolicitudesRecursas();
    }
  }

  async autorizarPagoGlobal(event: any, dato: any) {
    const control = event.target.id;
    if (control == "Autorizado") {
      var autorizado = {
        estado: 4,
        idglobales: dato.idgloables,
         
      }
      if (control == 'Rechazado') {
        autorizado = {
          estado: 7,
          idglobales: dato.idglobales,
          
        }
      }
      if (confirm("¿Esta usted seguro de Autorizar o Rechazar la Solicitud?")) {
        const res = await firstValueFrom(this.admin.autorizarGlobal(autorizado));
        if (res.ok == "ok") {
          if (control == 'Autorizada') Notiflix.Notify.info("Solicitud Autorizada");
          if (control == 'Rechazada') Notiflix.Notify.info("Por falta de documentos o documento ilegible, se rechaza la solicitud");
          this.getSolicitudesGlobales();
        } else {
          Notiflix.Notify.failure("Ha Ocurrido Un Error");
        }
        if (control == 'Autorizado') {
          var ae = {
            idgloables: dato.idgloables,
            idasiglobd: dato.idasiglobd,
            numControl: dato.numControl
          }
          const examen = await firstValueFrom(this.admin.aplicaionExamenGlobal(ae));
          dato.fecha = examen.ok.fecha;
          dato.hora = examen.ok.hora;
          dato.salon = examen.ok.salon;
        }
        const correo = await firstValueFrom(this.email.envioSolicitud({ correo: dato, tipo: "solicitudExmamenGlobal" }));
      }
    }
  }

  filtroSolicitudGlobales() {
    this.ngOnInit();
    var numControl = this.filtroGlobales.alumnoNumControl;
    var grado = this.filtroGlobales.grado;
    var grupo = this.filtroGlobales.grupo;
    var especialidad = this.filtroGlobales.especialidad;
    var turno = this.filtroGlobales.turno;

    this.filtroSolicitudesGlobales = this.solicitudesGlobales;

    if(numControl != "" && numControl != undefined) {
      this.filtroSolicitudesGlobales = this.filtroSolicitudesGlobales.filter((item: any) => item.alumnoNumControl == numControl);
    }
    if (grado != "-" && grado != undefined) {
      this.filtroSolicitudesGlobales = this.filtroSolicitudesGlobales.filter((item: any) => item.grado == grado);
    }
    if(grupo != "-" && grupo != undefined) {
      this.filtroSolicitudesGlobales = this.filtroSolicitudesGlobales.filter((item: any) => item.grupo == grupo);
    }
    if(especialidad != "-" && especialidad != undefined) {
      this.filtroSolicitudesGlobales = this.filtroSolicitudesGlobales.filter((item: any) => item.especialidad == especialidad);
    }
    if(turno != "-" && turno != undefined) {
      this.filtroSolicitudesGlobales = this.filtroSolicitudesGlobales.filter((item: any) => item.turno == turno);
    }
  }

  /*  Recursas */

  solicitudesRecursas: any = [];
  filtroRecusas: any = [];
  filtroSolicitudesRecusas: any = [];
  recurFil: any = [];

  async getSolicitudesRecursas() {
    this.ngOnInit();
    const res = await firstValueFrom(this.admin.getSolicitudesRecursas());
    await this.traerRecursaComprobante();
    if (res.ok == "vacio") {
      this.solicitudesRecursas = [];
    } else {
      this.solicitudesRecursas = res.ok;

      for(var i = 0; i <= this.solicitudesRecursas.length - 1; i++){
        this.solicitudesRecursas[i].gradoAndGrupo = this.alumn.obtenerGrado(this.solicitudesRecursas[i].grado, this.solicitudesRecursas[i].alumnoNumControl, this.solicitudesRecursas[i].Ingreso) + this.solicitudesRecursas[i].grupo;
      }
      
      this.recurFil[0] = [...new Set(this.solicitudesRecursas.map((gd: any) => gd.grado))];
      this.recurFil[1] = [...new Set(this.solicitudesRecursas.map((gp: any) => gp.grupo))];
      this.recurFil[2] = [...new Set(this.solicitudesRecursas.map((esp: any) => esp.especialidad))];
      this.recurFil[3] = [...new Set(this.solicitudesRecursas.map((tn: any) => tn.turno))];

      this.recurFil[0] = this.recurFil[0].sort();
      this.recurFil[1] = this.recurFil[1].sort();
      this.recurFil[2] = this.recurFil[2].sort();

      this.filtroSolicitudRecursas();
    }
  }

  async autorizarRecursa(event: any, dato: any) {
    const control = event.target.id;
    if (control == "Autorizado") {
      const autorizado = {
        estado: 3,
        idrecursas: dato.idrecursa
      }
      if (control == 'Rechazado') {
        const autorizado = {
          estado: 9,
          idrecursas: dato.idrecursa
        }
      }
      if (confirm("¿Esta usted seguro de Autorizar o Rechazar la Solicitud?")) {
        const res = await firstValueFrom(this.admin.autorizarRecursa(autorizado));
        if (res.ok == "ok") {
          if (control == 'Autorizada') Notiflix.Notify.info("Solicitud Autorizada");
          if (control == 'Rechazada') Notiflix.Notify.info("Solicitud Rechazada");
          this.getSolicitudesRecursas();
        } else {
          Notiflix.Notify.failure("Ha Ocurrido Un Error");
        }
      }
    }
  }

  async autorizarPagoRecursa(event: any, dato: any) {
    const control = event.target.id;
    if (control == "Autorizado") {
      var autorizado = {
        estado: 4,
        idrecursas: dato.idrecursas
      }

      if (control == 'Rechazado') {
        autorizado = {
          estado: 7,
          idrecursas: dato.idrecursas
        }
      }
      if (confirm("¿Esta usted seguro de Autorizar o Rechazar la Solicitud?")) {
        const res = await firstValueFrom(this.admin.autorizarRecursa(autorizado));
        if (res.ok == "ok") {
          if (control == 'Autorizada') Notiflix.Notify.info("Solicitud Autorizada");
          if (control == 'Rechazada') Notiflix.Notify.info("Por falta de documentos o documento ilegible, se rechaza la solicitud");
          this.getSolicitudesRecursas();
        } else {
          Notiflix.Notify.failure("Ha Ocurrido Un Error");
        }
        if (control == 'Autorizado') {
          var cr = {
            idrecursas: dato.idrecursas,
            idasigrecursa: dato.idasigrecursa,
            numControl: dato.numControl
          }
          const examen = await firstValueFrom(this.admin.cursoRecursa(cr));
          dato.fecha = examen.ok.fecha;
          dato.hora = examen.ok.hora;
          dato.salon = examen.ok.salon;
        }
        const correo = await firstValueFrom(this.email.envioSolicitud({ correo: dato, tipo: "solicitudRecursamiento" }));
      }
    }
  }
  
  filtroSolicitudRecursas() {
    this.ngOnInit();
    var numControl = this.filtroRecusas.alumnoNumControl;
    var grado = this.filtroRecusas.grado;
    var grupo = this.filtroRecusas.grupo;
    var especialidad = this.filtroRecusas.especialidad;
    var turno = this.filtroRecusas.turno;

    this.filtroSolicitudesRecusas = this.solicitudesRecursas;

    if(numControl != "" && numControl != undefined) {
      this.filtroSolicitudesRecusas = this.filtroSolicitudesRecusas.filter((item: any) => item.alumnoNumControl == numControl);
    }
    if (grado != "-" && grado != undefined) {
      this.filtroSolicitudesRecusas = this.filtroSolicitudesRecusas.filter((item: any) => item.grado == grado);
    }
    if(grupo != "-" && grupo != undefined) {
      this.filtroSolicitudesRecusas = this.filtroSolicitudesRecusas.filter((item: any) => item.grupo == grupo);
    }
    if(especialidad != "-" && especialidad != undefined) {
      this.filtroSolicitudesRecusas = this.filtroSolicitudesRecusas.filter((item: any) => item.especialidad == especialidad);
    }
    if(turno != "-" && turno != undefined) {
      this.filtroSolicitudesRecusas = this.filtroSolicitudesRecusas.filter((item: any) => item.turno == turno);
    }
  }

}
