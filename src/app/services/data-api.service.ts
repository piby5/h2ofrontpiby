import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService} from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private URI = environment.api_uri;

  constructor( private http: HttpClient,  private authService: AuthService) { }

  //MAPBOX
  getRuta(inicio,fin){
    const URI = `https://api.mapbox.com/directions/v5/mapbox/driving/${inicio.longitud},${inicio.latitud};${fin.longitud},${fin.latitud}?steps=true&language=es&geometries=geojson&access_token=${environment.mapboxKey}`;
    return this.http.get<any>(URI,{responseType: "json"});
  }

  getUrlMapaEstatico(coords){
    const {longitud, latitud} = coords;
    const urlMapa = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s(${longitud},${latitud})/${longitud},${latitud},15.5,0,50/350x350?access_token=${environment.mapboxKey}`;
    return urlMapa;
  }

  //USUARIOS
  getUsuario(id){
    return this.http.get<any>(this.URI+`usuarios/${id}`)
  }
  editarUsuario(usuario){
    return this.http.put<any>(this.URI+`usuarios/${usuario._id}`,usuario);
  }
  getUsuarios(){
    return this.http.get<any>(this.URI+"usuarios");
  }
  borrarUsuario(id){
    return this.http.delete<any>(this.URI+`usuarios/${id}`);
  }

  //CLIENTES
  getCliente(id){
    return this.http.get<any>(this.URI+`clientes/${id}`)
  }
  editarCliente(cliente){
    return this.http.put<any>(this.URI+`clientes/${cliente._id}`,cliente);
  }
  getClientes(){
    return this.http.get<any>(this.URI+"clientes");
  }
  borrarCliente(id,isIdUsr=false){
    if(isIdUsr)
      return this.http.delete<any>(this.URI+`clientes/usuario/${id}`);
    return this.http.delete<any>(this.URI+`clientes/${id}`);
  }

  //EMPLEADOS
  getEmpleado(id){
    return this.http.get<any>(this.URI+`empleados/${id}`)
  }
  editarEmpleado(empleado){
    return this.http.put<any>(this.URI+`empleados/${empleado._id}`,empleado);
  }
  getEmpleados(){
    return this.http.get<any>(this.URI+"empleados");
  }
  borrarEmpleado(id,isIdUsr=false){
    if(isIdUsr)
      return this.http.delete<any>(this.URI+`empleados/usuario/${id}`);
    return this.http.delete<any>(this.URI+`empleados/${id}`);
  }

  //SOLICITUDES
  crearSolicitud(solicitud){
    return this.http.post<any>(this.URI+"solicitudes",solicitud);
  }
  getSolicitud(id){
    return this.http.get<any>(this.URI+`solicitudes/${id}`);
  }
  getSolicitudes(){
    return this.http.get<any>(this.URI+"solicitudes");
  }
  editarSolicitud(solicitud){
    return this.http.put<any>(this.URI+`solicitudes/${solicitud._id}`,solicitud);
  }
  borrarSolicitud(id){
    return this.http.delete<any>(this.URI+`solicitudes/${id}`);
  }

  //SERVICIOS
  crearServicio(servicio) {
    return this.http.post<any>(this.URI+'servicios', servicio);
  }

  getServicio(id,isIdSolicitud=false){
    if(isIdSolicitud)
      return this.http.get<any>(this.URI+`servicios/solicitud/${id}`);
    return this.http.get<any>(this.URI+`servicios/${id}`);
  }
  getServicios(/*rol=2*/){
    // if(rol == 0)
      return this.http.get<any>(this.URI+`servicios`);
    // else
    //   return this.http.get<any>(this.URI+`servicios/${rol}`);
  }
  getPendientes(/*rol=2*/){
    // if(rol == 0)
      return this.http.get<any>(this.URI+`servicios/pendientes`);
    // else
    //   return this.http.get<any>(this.URI+`servicios/${rol}/pendientes`);
  }
  editarServicio(servicio){
    return this.http.put<any>(this.URI+`servicios/${servicio._id}`,servicio);
  }
  borrarServicio(id){
    return this.http.delete<any>(this.URI+`servicios/${id}`);
  }
  getServiciosEmp(){
    return this.http.get<any>(this.URI+"servicios/empleados_ventas");
  }

}
