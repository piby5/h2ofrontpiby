import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterempComponent } from './components/users/registeremp/registeremp.component';
import { RegistercliComponent } from './components/users/registercli/registercli.component';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from './auth.guard';
import {TaskComponent} from './components/task/task.component';
import {PrivateTaskComponent} from './components/private-task/private-task.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { SolicitarComponent } from './components/solicitar/solicitar.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'registeremp', component:RegisterempComponent},
  {path:'registercli', component:RegistercliComponent},
  {path:'tasks', component:TaskComponent},
  {path:'private', component:PrivateTaskComponent, canActivate: [AuthGuard]},
  {path:'solicitar', component:SolicitarComponent, canActivate: [AuthGuard]},
  {path:'solicitudes', component:SolicitudesComponent, canActivate: [AuthGuard]},
  {path:'solicitudes/:id', component:SolicitudComponent, canActivate: [AuthGuard]},
  {path:'solicitudes/:id/editar', component:SolicitarComponent, canActivate: [AuthGuard]},
  {path:'servicios/:id', component:ServicioComponent, canActivate: [AuthGuard]},
  {path:'**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
