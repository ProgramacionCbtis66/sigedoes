import { Component,OnInit } from '@angular/core';
import { ObservableService } from 'src/app/service/observable.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  public nombre:string = "";
  public contra:string = "";
  constructor(private loginService: ObservableService){}
  ngOnInit(): void {
      
  }
  public Ingresar(){
     
  }
}
