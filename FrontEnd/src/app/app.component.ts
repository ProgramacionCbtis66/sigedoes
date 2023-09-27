import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  usuario= "";
  dato = "Configuracion";
  logout = new BehaviorSubject<boolean>(true);
  home=new BehaviorSubject<boolean>(true)
  title = 'Constancias';
  mostrar = new BehaviorSubject<boolean>(true);
  foto : string ="";
  logo : string = '.././assets/img/logocl.png';
  registro = new BehaviorSubject<boolean>(false);
  iflogin = new BehaviorSubject<boolean>(true);
  Administrador = new BehaviorSubject<boolean>(false);

  constructor(private titulo : Title, private auth: AuthService, private router:Router){}

  visibleLoginRegistro(){
    if(this.auth.isAuth()){
      this.iflogin.next(false);
      this.mostrar.next(false);
    }else{
      this.mostrar.next(true);
      this.iflogin.next(true);
    }
  }

  salir(){
    this.auth.estatus = false;
    this.mostrar.next(true);
    this.registro.next(false);
    this.iflogin.next(true);
    this.Administrador.next(false);
    localStorage.clear();
    this.router.navigate(['login']);
  }

   ngOnInit(){
    this.titulo.setTitle(this.title);
    console.log(this.registro.value);
    if(this.auth.isAuth()){
      this.mostrar.next(false);
      this.iflogin.next(true);
      this.logout.next(true);
      const user = this.auth.decodifica();
      this.foto = '.././assets/img/' + user["nombre"] + '.jpg';
      this.usuario = user["nombre"];
      console.log(this.usuario );

      if(user.rol== "Admin") {this.Administrador.next(true);}
      if(user.rol == 'user'){this.Administrador.next(false);}

    }else{
      this.mostrar.next(true);
      this.iflogin.next(true);
      this.logout.next(false);
    }
  }
}
