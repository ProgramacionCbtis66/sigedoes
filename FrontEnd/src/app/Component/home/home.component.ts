import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import * as Notiflix from 'notiflix';
import { UsuarioService } from 'src/app/service/usuarios.service';
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
  valor1 : any;
  tabla = true;
  datoo : any;
  datosCons = {
    "asunto":"",
    "nombre":"",
    "matricula":"",
    "claveIns":"",
    "semestre":"",
    "especialidad":"",
    "claveEsc":"",
    "area":"",
    "turno":"",
    "horario":"",
    "periodo":""
  }
  dato = {
    numcontrol:""
  }

  constructor(private auth:AuthService, private user:UsuarioService) { }
  home = {
    "NoPago":""
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
  tabladatos(){
    this.tabla = true;
  }
  comprobar(){
    if(this.home.NoPago != null && this.home.NoPago != undefined && this.home.NoPago != ""){
      Notiflix.Loading.standard("Revisando Código");
      this.user.NoPago(this.home).subscribe((res:any)=>{
        if(res.valido != "" && res.valido != null && res.valido != undefined){
          if(this.tabla == false){
            this.tabla = true;
            Notiflix.Loading.remove();
            }
            else{
              Notiflix.Loading.remove();
              this.tabla = false;
            }}else if(res.Error == "Número Invalido"){
                Notiflix.Loading.remove();
                Notiflix.Notify.info("El Número No Es Valido")
              }
            
    });}
    }
  data(){/*
   this.datoo = document.getElementById('radio1');
   if(this.datoo){
     Notiflix.Notify.info("Seleccionado Beca");
   }else if(this.datoo == null){
    Notiflix.Notify.info("no seleccionado");
   }*/
  }
}

