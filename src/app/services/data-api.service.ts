import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService} from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private URL = "http://localhost:3000/api/";

  constructor( private http: HttpClient,  private authService: AuthService) { }

  //MAPBOX
  getRuta(inicio,fin){
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${inicio.longitud},${inicio.latitud};${fin.longitud},${fin.latitud}?steps=true&language=es&geometries=geojson&access_token=${environment.mapboxKey}`;
    return this.http.get<any>(url,{responseType: "json"});
  }

  //USUARIOS
  getUsuario(id){
    return this.http.get<any>(this.URL+`usuarios/${id}`)
  }
  editarUsuario(usuario){
    return this.http.put<any>(this.URL+`usuarios/${usuario._id}`,usuario);
  }
  getUsuarios(){
    return this.http.get<any>(this.URL+"usuarios");
  }
  borrarUsuario(id){
    return this.http.delete<any>(this.URL+`usuarios/${id}`);
  }

  //CLIENTES
  getCliente(id){
    return this.http.get<any>(this.URL+`clientes/${id}`)
  }
  editarCliente(cliente){
    return this.http.put<any>(this.URL+`clientes/${cliente._id}`,cliente);
  }
  getClientes(){
    return this.http.get<any>(this.URL+"clientes");
  }
  borrarCliente(id,isIdUsr=false){
    if(isIdUsr)
      return this.http.delete<any>(this.URL+`clientes/usuario/${id}`);
    return this.http.delete<any>(this.URL+`clientes/${id}`);
  }

  //EMPLEADOS
  getEmpleado(id){
    return this.http.get<any>(this.URL+`empleados/${id}`)
  }
  editarEmpleado(empleado){
    return this.http.put<any>(this.URL+`empleados/${empleado._id}`,empleado);
  }
  getEmpleados(){
    return this.http.get<any>(this.URL+"empleados");
  }
  borrarEmpleado(id,isIdUsr=false){
    if(isIdUsr)
      return this.http.delete<any>(this.URL+`empleados/usuario/${id}`);
    return this.http.delete<any>(this.URL+`empleados/${id}`);
  }

  //SOLICITUDES
  solicitarServicio(solicitud){
    return this.http.post<any>(this.URL+"solicitudes",solicitud);
  }
  getSolicitud(id){
    return this.http.get<any>(this.URL+`solicitudes/${id}`);
  }
  getSolicitudes(){
    return this.http.get<any>(this.URL+"solicitudes");
  }
  editarSolicitud(solicitud){
    return this.http.put<any>(this.URL+`solicitudes/${solicitud._id}`,solicitud);
  }
  borrarSolicitud(id){
    return this.http.delete<any>(this.URL+`solicitudes/${id}`);
  }

  //SERVICIOS
  getServicio(id,isIdSolicitud=false){
    if(isIdSolicitud)
      return this.http.get<any>(this.URL+`servicios/solicitud/${id}`);
    return this.http.get<any>(this.URL+`servicios/${id}`);
  }
  getServicios(rol=2){
    if(rol == 0)
      return this.http.get<any>(this.URL+`servicios`);
    else
      return this.http.get<any>(this.URL+`servicios/${rol}`);
  }
  getPendientes(rol=2){
    if(rol == 0)
      return this.http.get<any>(this.URL+`servicios/pendientes`);
    else
      return this.http.get<any>(this.URL+`servicios/${rol}/pendientes`);
  }
  editarServicio(servicio){
    return this.http.put<any>(this.URL+`servicios/${servicio._id}`,servicio);
  }
  borrarServicio(id){
    return this.http.delete<any>(this.URL+`servicios/${id}`);
  }
  getServiciosEmp(){
    return this.http.get<any>(this.URL+"servicios/empleados_ventas");
  }

}
