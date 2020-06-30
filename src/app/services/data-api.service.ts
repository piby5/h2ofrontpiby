import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private URL = "http://localhost:3000/api/";

  constructor( private http: HttpClient,  private authService: AuthService) { }

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

  editarServicio(servicio){
    return this.http.put<any>(this.URL+"servicios",servicio);
  }

  borrarServicio(id){
    return this.http.delete<any>(this.URL+`servicios/${id}`);
  }

}
