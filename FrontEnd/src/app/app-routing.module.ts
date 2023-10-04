import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './Component/error404/error404.component';
import { LoginComponent } from './Component/login/login.component';
import { RegistroComponent } from './Component/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthLogin } from './guards/auth.guard2';
import { PerfilComponent } from './Component/perfil/perfil.component';
import { OlvidePassComponent } from './Component/olvide-pass/olvide-pass.component';

import { AuthGuardAdmin } from './guards/auth.guard.admin';
import { DocenteComponent } from './Component/docente/docente.component';
import { AlumnoComponent } from './Component/home/alumno/alumno.component';
import { AdministrativoComponent } from './Component/home/administrativo/administrativo.component';


const routes: Routes = [
  {path:"", redirectTo: "homeAlumno", pathMatch:"full"},
  {path:"admin",component: AdministrativoComponent,canActivate:[AuthGuardAdmin]},
  {path:"homeAlumno", component: AlumnoComponent, canActivate:[AuthGuard]},
  {path:"homeDocente", component: DocenteComponent, canActivate:[AuthGuard]},
  {path:"forgotPassword", component: OlvidePassComponent, canActivate:[AuthLogin]},
  {path:"login", component: LoginComponent, canActivate:[AuthLogin]},
  {path:"registro", component: RegistroComponent,canActivate:[AuthLogin]},
  {path:"perfil", component: PerfilComponent},

  {path:"**", component: Error404Component },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
