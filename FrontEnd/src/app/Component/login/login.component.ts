import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titulo = "Inicio de Sesión";
  usuario = {
    "nombre": "",
    "pass": ""
  };

  constructor(private auth:AuthService, private router:Router, private app:AppComponent ) { }

  ngOnInit(): void {

  }

  Acceso(){
   if(this.usuario.nombre!==""){
    this.auth.login(this.usuario).subscribe((res:any) => {
      localStorage.setItem('color', res.token);
      this.app.visibleLoginRegistro();
      this.router.navigate(['/home']);
    });
   }else{
    localStorage.setItem('color', 'sin colores');
   }
  }

}
