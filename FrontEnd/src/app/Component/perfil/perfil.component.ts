import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { AuthService } from '../../service/auth.service';


// @Component({
//   selector: 'app-perfil',
//   templateUrl: './perfil.component.html',
//   styleUrls: ['./perfil.component.css']
// })
// export class PerfilComponent implements OnInit {

//   datos : any;
//   constructor(private Auth:AuthService, private userService:UsuarioService) { }

//   ngOnInit(): void {
//     if (this.Auth.isAuth() )
//     {
//       const datos = {
//         numcontrol : this.Auth.decodifica().numControl
//       }
//       this.userService.datosUser(datos).subscribe((res: any)=>{
//         if(JSON.parse(res.data).nombre!=""){
//           this.datos = JSON.parse(res.data);
//           alert(this.datos);
//         }
//       });
//     }
//   }

// }

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
  })
  export class PerfilComponent implements OnInit {
  
    datos : any;
    constructor(private Auth:AuthService, private userService:UsuarioService) { }
  
    ngOnInit(): void {
      if (this.Auth.isAuth() )
      {
        const datos = {
          numcontrol : this.Auth.decodifica().numControl
        }
        this.userService.datosUser(datos).subscribe((res: any)=>{
          if(JSON.parse(res.data).nombre!=""){
            this.datos = JSON.parse(res.data);
            //alert(this.datos);
          }
        });
      }
    }
  
  }
