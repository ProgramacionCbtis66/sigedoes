import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  usuario= "";
  logout =true;
  home=true;
  title = 'Constancias';
  mostrar: boolean = true;
  foto : string ="";
  logo : string = '.././assets/img/logocl.png';
  registro = false;
  iflogin = true;
  Administrador = false;

  constructor(private titulo : Title, private auth: AuthService, private router:Router){}

  visibleLoginRegistro(){
    if(this.auth.isAuth()){
      this.iflogin = false;
      this.mostrar = false;
    }else{
      this.mostrar = true;
      this.iflogin = true;
    }
  }

  salir(){
    this.auth.estatus = false;
    this.mostrar = true;
    this.registro = false;
    this.iflogin = true;
    this.Administrador = false;
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit(){
    this.titulo.setTitle(this.title);
    if(this.auth.isAuth()){
      this.mostrar = false;
      this.iflogin = true;
      this.logout =true;
      const user = this.auth.decodifica();
      this.foto = '.././assets/img/' + user["nombre"] + '.jpg';
      this.usuario = user["nombre"];
      if(user.rol== "Admin") {this.Administrador=true;}
      if(user.rol == 'user'){this.Administrador = false;}

    }else{
      this.mostrar = true;
      this.iflogin = true;
      this.logout =false;
    }
  }
}
