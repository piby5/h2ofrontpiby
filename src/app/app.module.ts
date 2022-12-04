import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegistercliComponent } from './components/users/registercli/registercli.component';
import { RegisterempComponent } from './components/users/registeremp/registeremp.component';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { SolicitarComponent } from './components/solicitar/solicitar.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { VentasEmpComponent } from './components/ventas-emp/ventas-emp.component';

import { DataApiService } from './services/data-api.service';
import {TokenInterceptorService} from './services/token-interceptor.service';

import {AuthGuard} from './auth.guard';

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
const config: SocketIoConfig = { 
  url: environment.api_uri.split('/api')[0], 
  options: {
    query: {
      nameRoom: 'sala-1'
    },
    transports: ["websocket"] // use webSocket only
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistercliComponent,
    RegisterempComponent,
    HomeComponent,
    ProfileComponent,
    ServicioComponent,
    SolicitarComponent,
    ServiciosComponent,
    EmpleadosComponent,
    VentasEmpComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    DataApiService, 
    AuthGuard,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
