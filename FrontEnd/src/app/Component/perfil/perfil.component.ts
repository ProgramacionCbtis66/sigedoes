import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { AuthService } from '../../service/auth.service';




@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
  })
  export class PerfilComponent implements OnInit {

    perfilInfo = {
      alumno: "",
      curp: "",
      numControl: "",
      especialidad: "",
      grado: "",
      grupo: "",
      correo: "",
      turno: ""

    }
    datos : any;
    constructor(private app: AppComponent, private Auth:AuthService, private userService:UsuarioService) { }

    ngOnInit(): void {
      if (this.Auth.isAuth() )
      {
        const datos = {
          numcontrol : this.Auth.decodifica().numControl
        }
        this.userService.datosUser(datos).subscribe((res: any)=>{
          if(JSON.parse(res.data).nombre!=""){
            this.datos = JSON.parse(res.data);
            this.app.usuario = this.datos.nombre;
            //alert(this.datos);
          }
        });
      }
    }

  }
