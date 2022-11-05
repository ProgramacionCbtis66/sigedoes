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

  alumno : any;
  curp : any;
  correo : any;
  noctrl : any;
  especialidad : any;
  semestre : any;
  area : any;
  turno: any;
  datos : any;
  tabla = false;
  datoo : any;
  boton = false;
  paso3 = false;
  valortipo = {
    "tipo":"",
  }
  datosCons = {
    "asunto":"",
    "nombre":"",
    "matricula":"",
    "claveIns":"30DCT0236O",
    "semestre":"",
    "especialidad":"",
    "claveEsc":"352100002-16",
    "area":"",
    "turno":"",
    "horario":"7:00 AM - 13:00 PM",
    "periodo":"29 de Agosto al 13 de Diciembre del 2022."
  }
  dato = {
    "numcontrol":""
  }

  constructor(private auth:AuthService, private user:UsuarioService, private email:SendEmailService) { }
  home = {
    NoPago:"",
    numControl:""
  }
  ngOnInit(): void {

    if(this.auth.isAuth()){
      let token = this.auth.decodifica();

      this.dato.numcontrol = token.numControl;

      this.user.datosUser(this.dato).subscribe((res: any)=>{
        if(res !="" && res!=null){
          this.datos = JSON.parse(res.data);
          this.alumno= this.datos.nombre;
          this.curp = this.datos.CURP;
          this.correo= this.datos.correo;
          this.noctrl = this.datos.numControl;
          this.semestre = this.datos.grado;
          this.area = this.datos.area;
          this.turno = this.datos.turno;
          this.especialidad = this.datos.especialidad;
          console.log(this.alumno);
        }
      });

    }

    Notiflix.Notify.info("Bienvenido ");
  }
  public name() {

  }
  actualizar(){
    this.paso3 = true;

  }
  restart(){
    location.reload();
  }
  generarcons(){
    const email = {
      email:this.correo,
      asunto:this.datosCons.asunto,
      tipo:"Constancia",
      numControl: this.noctrl
    }
    console.log(email);
    this.email.envioConstancia(email).subscribe((res:any)=>{
      if(res.msg=="Enviado"){
      }
   });
   this.user.NoPagoDesactivo(this.home).subscribe((res:any)=>{
    if(res.msg == "ok"){
      this.datosCons.asunto = "";
    this.datosCons.semestre = "";
    this.datosCons.especialidad = "";
    this.datosCons.area = "";
    this.datosCons.turno = "";
    this.datosCons.nombre = "";
    this.datosCons.matricula = "";
    this.home.NoPago = "";
    }
   });
  }
  carga(){

  }
  comprobar(){
    this.datosCons.asunto = this.valortipo.tipo;
    this.datosCons.semestre = this.semestre;
    this.datosCons.especialidad = this.especialidad;
    this.datosCons.area = this.area;
    this.datosCons.turno = this.turno;
    this.datosCons.nombre = this.alumno;
    this.datosCons.matricula = this.noctrl;
    if(this.home.NoPago != null && this.home.NoPago != undefined && this.home.NoPago != ""){
      this.home.numControl = this.noctrl;
      Notiflix.Loading.standard("Revisando Código");
      this.user.NoPago(this.home).subscribe((res:any)=>{
        if(res.valido != "" && res.valido != null && res.valido != undefined){
          if(this.tabla == false){
            this.tabla = true;
            Notiflix.Loading.remove();
            if (this.datosCons.asunto != "" && this.datosCons.nombre != "" && this.datosCons.semestre != "" && this.datosCons.especialidad != "" && this.datosCons.area != "" && this.datosCons.turno != "" && this.datosCons.matricula != "" && this.datosCons.claveIns != "" && this.datosCons.claveEsc != "" && this.datosCons.horario != "" && this.datosCons.periodo != ""){
              if(this.boton){
               this.boton = false;
              } else{
               this.boton = true;
              }
             }
            }
            else{
              Notiflix.Loading.remove();
              this.tabla = false;
            }}else if(res.Error == "Número Invalido"){
                Notiflix.Loading.remove();
                Notiflix.Notify.info("El Número No Es Valido");
              }
              if(this.tabla == false){
                this.boton = false;
              }
    });}

    }
}
