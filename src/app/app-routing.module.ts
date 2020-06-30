import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterempComponent } from './components/users/registeremp/registeremp.component';
import { RegistercliComponent } from './components/users/registercli/registercli.component';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from './auth.guard';

import { ServicioComponent } from './components/servicio/servicio.component';
import { SolicitarComponent } from './components/solicitar/solicitar.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ServiciosComponent } from './components/servicios/servicios.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'registeremp', component:RegisterempComponent},
  {path:'registercli', component:RegistercliComponent},
  {path:'perfil', component:ProfileComponent, canActivate: [AuthGuard]},

  {path:'solicitar', component:SolicitarComponent, canActivate: [AuthGuard]},
  {path:'solicitudes/:id/editar', component:SolicitarComponent, canActivate: [AuthGuard]},

  {path:'servicios/solicitud/:id', component:ServicioComponent, canActivate: [AuthGuard]},
  {path:'servicios/:id', component:ServicioComponent, canActivate: [AuthGuard]},
  {path:'servicios', component:ServiciosComponent, canActivate: [AuthGuard]},

  {path: '', pathMatch:'full', component: HomeComponent},
  {path: '**', pathMatch:'full', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
