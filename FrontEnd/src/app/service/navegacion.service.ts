import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {

  private logout = new BehaviorSubject<boolean>(true);
  private home = new BehaviorSubject<boolean>(false)
  private homeAlumno = new BehaviorSubject<boolean>(true);
  private registro = new BehaviorSubject<boolean>(false);
  private iflogin = new BehaviorSubject<boolean>(false);
  private Administrador = new BehaviorSubject<boolean>(false);
  private  docente = new BehaviorSubject<boolean>(false);
  private forgotpass = new BehaviorSubject<boolean>(false);
  private foto = new BehaviorSubject<any>("");
  private usuario = new BehaviorSubject<string>("");
 

  get _foto(): any {return this.foto.getValue();}
  set _foto(value: any) {this.foto.next(value);}
  get _forgotpass(): boolean {return this.forgotpass.getValue();}
  set _forgotpass(value: boolean) {this.forgotpass.next(value);}
  get _usuario(): string {return this.usuario.getValue();}
  set _usuario(value: string) {this.usuario.next(value);}
  get _logout(): boolean {return this.logout.getValue();}
  set _logout(value: boolean) {this.logout.next(value);}
  get _home(): boolean {return this.home.getValue();}
  set _home(value: boolean) {this.home.next(value);}
  get _homeAlumno(): boolean {return this.homeAlumno.getValue();}
  set _homeAlumno(value: boolean) {this.homeAlumno.next(value);}
  get _registro(): boolean {return this.registro.getValue();}
  set _registro(value: boolean) {this.registro.next(value);}
  get _iflogin(): boolean {return this.iflogin.getValue();}
  set _iflogin(value: boolean) {this.iflogin.next(value);}
  get _Administrador(): boolean {return this.Administrador.getValue();}
  set _Administrador(value: boolean) {this.Administrador.next(value);}
  get _docente(): boolean {return this.docente.getValue();}
  set _docente(value: boolean) {this.docente.next(value);}
  
  constructor() { }

  salir(): void {
    this._homeAlumno=false;
    this._registro= false;
    this._iflogin=true;
    this._Administrador= false;
    this._docente=false;
    this._logout=false;
    this._home=false;
    this._usuario="";
    localStorage.clear();
  }
}
