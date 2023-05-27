import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  map,
  switchMap,
  combineLatest,
} from 'rxjs';
import { ClientesService, Persona } from 'src/app/service/clientes.service';
import { ObservableService } from 'src/app/service/observable.service';
import * as Notiflix from 'notiflix';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  public registro: boolean = false;
  public aceptado: boolean = false;
  public admin: boolean = false;
  public usuarios = [
    { nombre: 'juan', email: 'juanpedro@gmail.com', password: '1234' },
    { nombre: 'pedro', email: 'pedrojuan@gmail.com', password: '4321' },
    { nombre: 'lopez', email: 'lopez@gmail.com', password: '12345' },
  ];
  public nombre: string = '';
  public contra: string = '';
  person$: Observable<Persona[]>;

  constructor(
    private sharingService: ClientesService,
    private loginService: ObservableService,
    private router: Router,
    private appComponen: AppComponent
  ) {
    this.person$ = combineLatest([
      sharingService.SharingObservable,
      sharingService.SharingCombinableObservable,
    ]).pipe(
      switchMap((people) => {
        people.forEach(
          (person) =>
            (sharingService.SharingDependentObservableData = person.name)
        );

        return sharingService.SharingDependentObservable;
      })
    );
  }

  ngOnInit(): void {
    this.loginService.mostrarlogin().subscribe((value) => console.log());
    this.loginService.mostrarAdmin().subscribe((value) => console.log());
    this.appComponen.deslogear();
  }

  public Ingresar() {
    Notiflix.Notify.info('Procesando');
    for (let i = 0; i < this.usuarios.length; i++) {
      if (
        this.nombre == this.usuarios[i].nombre &&
        this.contra == this.usuarios[i].password
      ) {
        this.aceptado = true;
        break;
      }
    }

    if (this.nombre == 'juanito' && this.contra == '123') {
      this.loginService.admin(true);
      this.appComponen.ngOnInit();
      this.router.navigateByUrl('/Admin');
      localStorage.setItem('nombre', this.nombre);
    } else if (this.aceptado) {
      this.loginService.login(true);
      this.appComponen.ngOnInit();
      this.router.navigateByUrl('/Home');
      this.aceptado = false;
      localStorage.setItem('nombre', this.nombre);
    } else {
      this.appComponen.ngOnInit();
      Notiflix.Notify.failure('No Estas Registrado');
    }
  }

  public cambio() {
    if (this.registro) {
      if (this.nombre != '' && this.contra != '') {
        Notiflix.Notify.success('Registrado!');
        this.registro = false;
      } else {
        Notiflix.Notify.failure('Rellena Los Campos');
      }
    } else {
      this.registro = true;
    }
  }
}
