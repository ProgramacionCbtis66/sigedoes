import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { GlobalService } from 'src/app/service/global.service';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { firstValueFrom } from 'rxjs';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {

  protected listaGlobales: any = [];
  protected datoPago: any ={};

  constructor(
    private alumno: UsuarioService,
    private global: GlobalService,
    private auth: AuthService,
    private nav: NavegacionService,
  ){
    this.nav._usuario = this.auth.decodifica().nombre+ " " + this.auth.decodifica().apellidoP + " " + this.auth.decodifica().apellidoM;
    this.nav._foto = this.auth.decodifica().foto;
    this.nav._global = true;
    this.cargarGlobales();
  }

  ngOnInit(): void {
    if(!this.auth.isAuth()){
      this.nav._iflogin = true;
      this.nav.salir();
      this.cargarGlobales();
    }
  }

  async cargarGlobales(){
    this.ngOnInit();
    try{
      let res = await firstValueFrom(this.global.listaGlobal({numControl: this.auth.decodifica().numControl}));
      this.listaGlobales = res.data;
      console.log(res);
    } catch (error){
      console.log(error);
    }
  }

  async solicitarGlobal(dato: any){
    this.ngOnInit();
    dato.numControl=this.auth.decodifica().numControl;
    console.log(dato);
    const res = await firstValueFrom(this.global.crearSolicitud(dato));
     console.log(res);
    if(res.data ){
      this.cargarGlobales();
      Notiflix.Notify.success("Solicitud enviada y pendiente por confirmar");
    }
  }



}
