import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { SendEmailService } from 'src/app/service/send-email.service';
import { UsuarioService } from 'src/app/service/usuarios.service';



@Component({
  selector: 'app-adminstrador',
  templateUrl: './adminstrador.component.html',
  styleUrls: ['./adminstrador.component.css']
})
export class AdminstradorComponent implements OnInit {

  datos: any;
  aceptado :any; /*{
    "numControl":"",
    "op":0,
    "correo":"",
  }*/

  constructor(private userServicio:UsuarioService, private email:SendEmailService) { }

  ngOnInit(): void {
    this.userServicio.UsuariosNoReg().subscribe((res: any)=> {
      this.datos = JSON.parse(res.data);

    });
  }

  aceptar(op:any){
    this.aceptado = op;
    this.aceptado.op = 1;
    this.aceptado.tipo = "validacion";
    this.userServicio.usuarioAceptado(this.aceptado).subscribe((res: any)=>{
      Notiflix.Notify.success(res);
      this.CorreoAcpetacion(op);
      this.ngOnInit();
    });
  }
  Noaceptado(op:any){
    this.aceptado = op;
    this.aceptado.op = 3;
    this.aceptado.tipo = "validacion";

    this.userServicio.usuarioAceptado(this.aceptado).subscribe((res: any)=>{
      Notiflix.Notify.failure(res);
      this.CorreoAcpetacion(op);
      this.ngOnInit();
    });
  }

  CorreoAcpetacion(correo: any) {
    this.email.correoAcpetacion(correo).subscribe((res: any)=>{
      Notiflix.Notify.info(res);
    });
  }
}
