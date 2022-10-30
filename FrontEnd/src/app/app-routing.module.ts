import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './Component/error404/error404.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { RegistroComponent } from './Component/registro/registro.component';
import { AuthGuard,AuthGuardAdmin } from './guards/auth.guard';
import { AuthLogin } from './guards/auth.guard2';
import { ConstanciaComponent } from './Component/constancia/constancia.component';
import { OlvidePassComponent } from './Component/olvide-pass/olvide-pass.component';


const routes: Routes = [
  {path:"", redirectTo: "home", pathMatch:"full"},
  {path:"home", component: HomeComponent, canActivate:[AuthGuard]},
  {path:"forgotPassword", component: OlvidePassComponent, canActivate:[AuthLogin]},
  {path:"login", component: LoginComponent, canActivate:[AuthLogin]},
  {path:"registro", component: RegistroComponent,canActivate:[AuthLogin] },
  {path:"constancia", component: ConstanciaComponent, canActivate:[AuthGuardAdmin]},

  {path:"**", component: Error404Component },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
