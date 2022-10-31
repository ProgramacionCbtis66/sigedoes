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
          console.log(this.datos);
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

  comprobar(){
    if(this.home.NoPago != null && this.home.NoPago != undefined && this.home.NoPago != ""){
      Notiflix.Notify.info("Revisando Código");
    }
  }
}
