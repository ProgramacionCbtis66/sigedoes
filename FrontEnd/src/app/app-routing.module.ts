import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './Component/error404/error404.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { PdfComponent } from './Component/pdf/pdf.component';
import { RegistroComponent } from './Component/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthLogin } from './guards/auth.guard2';


const routes: Routes = [

  {path:"home", component: HomeComponent, canActivate:[AuthGuard]},
  {path:"login", component: LoginComponent, canActivate:[AuthLogin]},
  {path:"registro", component: RegistroComponent,canActivate:[AuthLogin] },
  {path:"pdf", component: PdfComponent},
  {path:"", redirectTo: "home", pathMatch:"full"},
  {path:"**", component: Error404Component },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
