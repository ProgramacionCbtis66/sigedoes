import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';
import { SendEmailService } from 'src/app/service/send-email.service';
import { UsuarioService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-olvide-pass',
  templateUrl: './olvide-pass.component.html',
  styleUrls: ['./olvide-pass.component.css']
})

export class OlvidePassComponent implements OnInit {
  correo = {
    "correo":""
  }

  constructor(private userService: UsuarioService, private enviarCorreo: SendEmailService) { }

  ngOnInit(): void {
  }


  public enviar(){
    if(this.correo.correo != null && this.correo.correo != undefined && this.correo.correo != ""){
      Notiflix.Loading.standard("Accesando");
        this.userService.forgotPassword(this.correo).subscribe((res: any)=>{
            if(res !== null && res !== undefined){
                Notiflix.Loading.remove();
                if(res == "Encontrado"){
                    this.enviarCorreo.enviarUserContra(this.correo).subscribe((res:any)=>{
                        Notiflix.Notify.success("Correo enviado Satisfactoriamente")
                    });
                }
            }else{
              Notiflix.Loading.remove();
              Notiflix.Notify.failure("Correo No valido");
            }
        });

    }else{
      Notiflix.Notify.warning("Favor de proporcionar un correo");
    }
    }
}
