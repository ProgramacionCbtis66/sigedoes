import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NavegacionService } from 'src/app/service/navegacion.service';
import { GlobalService } from 'src/app/service/global.service';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {
  protected globalDatos = {
    alumnoNumControl: '',
    idMateria: '',
    idPeriodo: '',
    fecha: '',
    estado: 0,
  }
  protected listaGlobales: any = [];

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

}
