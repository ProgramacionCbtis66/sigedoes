import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { SendEmailService } from 'src/app/service/send-email.service';
import decode from 'jwt-decode';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-olvide-pass',
  templateUrl: './olvide-pass.component.html',
  styleUrls: ['./olvide-pass.component.css']
})

export class OlvidePassComponent implements OnInit {
  correo = {
    "correo":""
  }

  constructor(private auth: AuthService, private enviarCorreo: SendEmailService) { }

  ngOnInit(): void {
  }


  public enviar(){
    if(this.correo.correo != null && this.correo.correo != undefined && this.correo.correo != ""){
      Notiflix.Loading.standard("Accesando");
        this.auth.olvContra(this.correo).subscribe((res: any)=>{
            if(res.usuario !== null && res.usuario !== undefined){
                Notiflix.Loading.remove();
                    this.enviarCorreo.enviarUserContra(decode(res.usuario)).subscribe((res:any)=>{
                        Notiflix.Notify.success("Correo enviado Satisfactoriamente")
                    this.correo.correo = "";
                    });

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
