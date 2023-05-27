import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ObservableService } from '../../service/observable.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-secundario',
  templateUrl: './secundario.component.html',
  styleUrls: ['./secundario.component.css'],
})
export class SecundarioComponent implements OnInit {
  public nombre:string | null = "";
  private boolean : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private loginService: ObservableService) {}
  ngOnInit(): void {
    this.nombre = localStorage.getItem("nombre");
  }


}
