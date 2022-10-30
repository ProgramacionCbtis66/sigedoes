import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';
import * as Notiflix from 'notiflix';
import { notDeepEqual } from 'assert';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registrarse = 'Registrarse';
  informacion = 'Info';
  infografia : string = '.././assets/img/infografiaa.png';
  usuario = {
    "correo": "",
    "pass": "",
    "pass2":"",
    "curp":"",
    "noctrl":"",
    "especialidad":"",
    "semestre":"",
    "area":"",
    "turno":"",
    "nombre":""
  };

  constructor(private auth: AuthService,  private router: Router, private app : AppComponent) { app.registro=true; app.iflogin=false;}

  ngOnInit(): void {}
  Registro(){
   let contra = this.usuario.pass2;
   let contra2 = this.usuario.pass;
    if(contra == contra2){
    if ( this.usuario.correo !== "" && this.usuario.pass !== "" && this.usuario.pass2 !== ""  && this.usuario.curp !== "" && this.usuario.noctrl !== "" && this.usuario.especialidad !== ""  && this.usuario.semestre !== "" && this.usuario.area !== "" && this.usuario.turno !== "")
    {
      Notiflix.Loading.standard(this.usuario.especialidad);
      this.auth.registro(this.usuario).subscribe((res: any) => 
      {
        if (res.token !== null && res.token != undefined) 
        {
          Notiflix.Loading.remove();
          this.router.navigate(['/login']);
        } 
      });
    } else {
      Notiflix.Notify.failure("Por favor llene todos los campos");
    }}else{
      Notiflix.Notify.failure("Las contraseñas no coinciden");
    }
  }
}
  
