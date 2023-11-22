import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {

  private logout = new BehaviorSubject<boolean>(true);
  private home = new BehaviorSubject<boolean>(false)
  private homeAlumno = new BehaviorSubject<boolean>(false);
  private registro = new BehaviorSubject<boolean>(false);
  private iflogin = new BehaviorSubject<boolean>(false);
  private Administrador = new BehaviorSubject<boolean>(false);
  private docente = new BehaviorSubject<boolean>(false);
  private forgotpass = new BehaviorSubject<boolean>(false);
  private foto = new BehaviorSubject<any>("");
  private usuario = new BehaviorSubject<string>("");
  private orientacionEdu = new BehaviorSubject<boolean>(false);
  private perfil = new BehaviorSubject<boolean>(false);
  private regresar = new BehaviorSubject<boolean>(false);
  private recursa = new BehaviorSubject<boolean>(false);
  private global = new BehaviorSubject<boolean>(false);

  

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
  get _orientacionEdu():any { return this.orientacionEdu.getValue(); }
  set _orientacionEdu(value:boolean) { this.orientacionEdu.next(value);} 
  get _perfil():any { return this.perfil.getValue(); }
  set _perfil(value:boolean) { this.perfil.next(value);}
  get _recursa():any { return this.recursa.getValue(); }
  set _recursa(value:boolean) { this.recursa.next(value);}
  get _global():any { return this.global.getValue(); }
  set _global(value:boolean) { this.global.next(value);}
  get _regresar():any { return this.regresar.getValue(); }
  set _regresar(value:boolean) { this.regresar.next(value);}

  
  constructor(private routerLink:Router) { }

  salir(): void {
    this._perfil=false;
    this._regresar=false;
    this._homeAlumno=false;
    this._registro= false;
    this._orientacionEdu=false;
    this._iflogin=true;
    this._Administrador= false;
    this._docente=false;
    this._foto="";
    this._forgotpass=false;
    this._logout=false;
    this._home=false;
    this._recursa=false;
    this._global=false;
    this._usuario="";
    localStorage.clear();
    this.routerLink.navigate(['/']);
  }
}
