import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './Component/error404/error404.component';
import { LoginComponent } from './Component/login/login.component';
import { RegistroComponent } from './Component/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';

import { PerfilComponent } from './Component/perfil/perfil.component';
import { OlvidePassComponent } from './Component/olvide-pass/olvide-pass.component';

import { AuthLogin } from './guards/auth.guard.login';

import { DocenteComponent } from './Component/home/docente/docente.component';
import { AlumnoComponent } from './Component/home/alumno/alumno.component';
import { AdministrativoComponent } from './Component/home/administrativo/administrativo.component';
import { ConstanciasComponent } from './Component/home/alumno/constancias/constancias.component';
import { OrientacionEducativaComponent } from './Component/home/orientacion-educativa/orientacion-educativa.component';
import { JutificantesComponent } from './Component/home/alumno/justificantes/jutificantes.component';
import { RecursaComponent } from './Component/home/alumno/recursa/recursa.component';
import { GlobalComponent } from './Component/home/alumno/global/global.component';


const routes: Routes = [
  {path:"", redirectTo: "homeAlumno", pathMatch:"full"},
  {path:"controlEscolar",component: AdministrativoComponent,canActivate:[AuthGuard]},
  {path:"homeAlumno", component: AlumnoComponent, canActivate:[AuthGuard]},
  {path:"justificante", component: JutificantesComponent, canActivate:[AuthGuard]},
  {path:"Alumnoconstancia", component: ConstanciasComponent, canActivate:[AuthGuard]},
  {path:"orientacionEdu", component: OrientacionEducativaComponent, canActivate:[AuthGuard]},
  {path:"homeDocente", component: DocenteComponent, canActivate:[AuthGuard]},
  {path:"forgotPassword", component: OlvidePassComponent, canActivate:[AuthLogin]},
  {path:"login", component: LoginComponent, canActivate:[AuthLogin]},
  {path:"registro", component: RegistroComponent,canActivate:[AuthLogin]},
  {path:"perfil", component: PerfilComponent},
  {path:"recursa", component: RecursaComponent,canActivate:[AuthLogin]},
  {path:"global", component: GlobalComponent,canActivate:[AuthLogin]},
  {path:"**", component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
