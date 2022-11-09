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
      this.mostrar = false;
    }else{
      this.mostrar = true;
      this.iflogin = true;
    }
  }

  inicio(){
    if(this.auth.isAuth()){
      alert("admin");
      const user = this.auth.decodifica();
      this.foto = '.././assets/img/' + user["nombre"] + '.jpg';
      if(user.rol== "Admin") {alert("admin");this.Administrador=true;this.mostrar = true;}
      if(user.rol == 'user'){this.Administrador = true}
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
    this.visibleLoginRegistro();
    this.inicio();
    const user = this.auth.decodifica();
    console.log(user.rol);
    if(user.rol == 'user'){this.Administrador = true}
  }
}
