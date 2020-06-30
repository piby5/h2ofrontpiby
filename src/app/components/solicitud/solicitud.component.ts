import { Component, OnInit } from '@angular/core';
//import { ServicioService } from 'src/app/services/servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataApiService } from 'src/app/services/data-api.service';
//import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  tipoAuto = ["HATCHBACK","SEDÁN","SUV","PICK-UP"];
  tipoServicio = ["EXPRÉS","COMPLETO"];

  public servicio = {
    _id:null,
    fechaHora:{
      inicio:null,
      fin:null
    },
    solicitud:null,
    info:{
      fecha:'',
      tipoAuto:null,
      tipoServicio:null,
      coordenadas:{
        longitud:'',
        latitud:''
      }
    },
    total:null
  };
  urlMapa = '';

  constructor(private _apiService:DataApiService,private ruta:ActivatedRoute,private router:Router) { 
    const { id } = this.ruta.snapshot.params;
    this._apiService.getServicio(id,true).subscribe( res => {
      this.servicio = res;
      console.log(this.servicio);
      const lng = this.servicio.info.coordenadas.longitud;
      const lat = this.servicio.info.coordenadas.latitud;
      this.urlMapa = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s(${lng},${lat})/${lng},${lat},15.5,0,50/300x300?access_token=${environment.mapboxKey}`;
    });
  }

  ngOnInit(): void {

  }

  editar(){
    this.router.navigate([`solicitudes/${this.servicio.solicitud}/editar`]);
  }

  cancelar(){
    this._apiService.borrarServicio(this.servicio._id).subscribe( res => {
      this._apiService.borrarSolicitud(this.servicio.solicitud).subscribe( resp => {
        console.log(resp);
        this.router.navigate(['/solicitar']);
      });
    });
  }

}
