import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegistercliComponent } from './components/users/registercli/registercli.component';
import { RegisterempComponent } from './components/users/registeremp/registeremp.component';

import {FormsModule} from '@angular/forms';
import { HomeComponent } from './components/home/home.component';


import { DataApiService } from './services/data-api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './components/users/profile/profile.component';

import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { TaskComponent } from './components/task/task.component';
import { PrivateTaskComponent } from './components/private-task/private-task.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { SolicitarComponent } from './components/solicitar/solicitar.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistercliComponent,
    RegisterempComponent,
    HomeComponent,
    ProfileComponent,
    TaskComponent,
    PrivateTaskComponent,
    SolicitudComponent,
    ServicioComponent,
    SolicitarComponent,
    SolicitudesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataApiService, AuthGuard,{provide:HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
