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

  title = 'Constancias';
  mostrar: boolean = true;
  foto : string ="";
  logo : string = '.././assets/img/logocl.png';
  registro = false;
  iflogin = true;

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
      const user = this.auth.decodifica();
      this.foto = '.././assets/img/' + user["nombre"] + '.jpg';
    }
  }
  salir(){
    this.auth.estatus = false;
    this.mostrar = true;
    localStorage.clear();
    this.router.navigate(['login']);
  }


  ngOnInit(){
    this.titulo.setTitle(this.title);
    this.visibleLoginRegistro();
    this.inicio();
  }

}
