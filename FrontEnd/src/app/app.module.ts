import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import * as Notiflix from 'notiflix';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { RegistroComponent } from './Component/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Error404Component } from './Component/error404/error404.component';

//Servicios
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { OlvidePassComponent } from './Component/olvide-pass/olvide-pass.component';
import { PerfilComponent } from './Component/perfil/perfil.component';
import { DocenteComponent } from './Component/home/docente/docente.component';
import { AlumnoComponent } from './Component/home/alumno/alumno.component';
import { AdministrativoComponent } from './Component/home/administrativo/administrativo.component';

import { ConstanciasComponent } from './Component/home/alumno/constancias/constancias.component';
import { OrientacionEducativaComponent } from './Component/home/orientacion-educativa/orientacion-educativa.component';
import { JutificantesComponent } from './Component/home/alumno/justificantes/jutificantes.component';
import { GlobalComponent } from './Component/home/alumno/global/global.component';
import { RecursaComponent } from './Component/home/alumno/recursa/recursa.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    Error404Component,
    OlvidePassComponent,
    PerfilComponent,
    DocenteComponent,
    AlumnoComponent,
    AdministrativoComponent,
    ConstanciasComponent,
    OrientacionEducativaComponent,
    JutificantesComponent,
    GlobalComponent,
    RecursaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers:[
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    Title,
    JwtHelperService,
  ],
    

  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    Notiflix.Notify.init({
      position: 'center-top', // Cambia la posición a la esquina superior izquierda
      distance:'15px',
      fontSize:'15px',
      width:'380px',
      timeout: 1700,
    });
  }
}