import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './comp/principal/principal.component';
import { SecundarioComponent } from './comp/secundario/secundario.component';
import { AdminComponent } from './comp/admin/admin.component';
import { RegistroComponent } from './comp/registro/registro.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    SecundarioComponent,
    AdminComponent,
    RegistroComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
