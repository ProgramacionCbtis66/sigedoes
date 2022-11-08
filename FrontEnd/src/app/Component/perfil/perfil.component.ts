import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private Auth:AuthService) { }

  ngOnInit(): void {
    if (this.Auth.isAuth() )
    {
      const NumControl=
    }
  }

}
