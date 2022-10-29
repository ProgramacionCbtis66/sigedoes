import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import * as Notiflix from 'notiflix';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alumnos ="";
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    
  }
  public name() {
    
  }


}
