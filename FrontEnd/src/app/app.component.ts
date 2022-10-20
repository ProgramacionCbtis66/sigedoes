import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Club H';
  mostrar: boolean = true;
  foto : string ="";
  logo : string = '.././assets/img/logo.jpg';

  constructor(private titulo : Title, private auth: AuthService){}

  visibleLoginRegistro(){
     
    if(this.auth.isAuth()){
      this.mostrar = false;
    }else{
      this.mostrar = true;
    }
  }

  inicio(){
    if(this.auth.isAuth()){
      const user = this.auth.decodifica();
      this.foto = '.././assets/img/' + user["nombre"] + '.jpg';
    }
  }


  ngOnInit(){
    this.titulo.setTitle(this.title);
    this.visibleLoginRegistro();
    this.inicio();
  }

}
