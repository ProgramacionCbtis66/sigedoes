import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuarios.service';



@Component({
  selector: 'app-adminstrador',
  templateUrl: './adminstrador.component.html',
  styleUrls: ['./adminstrador.component.css']
})
export class AdminstradorComponent implements OnInit {

  datos: any;

  constructor(private userServicio:UsuarioService) { }

  ngOnInit(): void {
    this.userServicio.UsuariosNoReg().subscribe((res: any)=> {
      this.datos = JSON.parse(res.data);
    });
  }

  aceptar(op:any){
    confirm("Aceptado" + " "+ op);
  }


}
