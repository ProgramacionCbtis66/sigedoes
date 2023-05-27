import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './comp/principal/principal.component';
import { SecundarioComponent } from './comp/secundario/secundario.component';
import { AdminComponent } from './comp/admin/admin.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { RegistroComponent } from './comp/registro/registro.component';

const routes: Routes = [
  {path:"Login",component:PrincipalComponent},
  {path:"Home",component:SecundarioComponent,canActivate:[UserGuard]},
  {path:"Admin",component:AdminComponent, canActivate:[AdminGuard]},
  {path:"Registro",component:RegistroComponent},
  {path: '**', redirectTo: '/Login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
