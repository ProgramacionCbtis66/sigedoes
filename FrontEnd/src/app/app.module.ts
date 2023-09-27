import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { HomeComponent } from './Component/home/home.component';
import { RegistroComponent } from './Component/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Error404Component } from './Component/error404/error404.component';

//Servicios
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { OlvidePassComponent } from './Component/olvide-pass/olvide-pass.component';
import { AdminstradorComponent } from './Component/adminstrador/adminstrador.component';
import { PerfilComponent } from './Component/perfil/perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    Error404Component,
    OlvidePassComponent,
    AdminstradorComponent,
    PerfilComponent
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
export class AppModule { }
