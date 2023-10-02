import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {

  private logout = new BehaviorSubject<boolean>(true);
  private home = new BehaviorSubject<boolean>(true)
  private mostrar = new BehaviorSubject<boolean>(true);
  private registro = new BehaviorSubject<boolean>(false);
  private iflogin = new BehaviorSubject<boolean>(true);
  private Administrador = new BehaviorSubject<boolean>(false);
  private  docente = new BehaviorSubject<boolean>(false);
  private usuario = new BehaviorSubject<string>("");
 

  get _usuario(): string {return this.usuario.getValue();}
  set _usuario(value: string) {this.usuario.next(value);}
  get _logout(): boolean {return this.logout.getValue();}
  set _logout(value: boolean) {this.logout.next(value);}
  get _home(): boolean {return this.home.getValue();}
  set _home(value: boolean) {this.home.next(value);}
  get _mostrar(): boolean {return this.mostrar.getValue();}
  set _mostrar(value: boolean) {this.mostrar.next(value);}
  get _registro(): boolean {return this.registro.getValue();}
  set _registro(value: boolean) {this.registro.next(value);}
  get _iflogin(): boolean {return this.iflogin.getValue();}
  set _iflogin(value: boolean) {this.iflogin.next(value);}
  get _Administrador(): boolean {return this.Administrador.getValue();}
  set _Administrador(value: boolean) {this.Administrador.next(value);}
  get _docente(): boolean {return this.docente.getValue();}
  set _docente(value: boolean) {this.docente.next(value);}
  
  constructor() { }
}
