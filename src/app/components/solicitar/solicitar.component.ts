import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from "mapbox-gl";
import { isNullOrUndefined } from 'util';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.css']
})
export class SolicitarComponent implements OnInit {

  mapa:Mapboxgl;
  marker:Mapboxgl.Marker;
  geolocateControl:Mapboxgl.GeolocateControl;

  public solicitud = {
    _id:null,
    tipoServicio: 0,
    tipoAuto: 0,
    coordenadas: {
      longitud: -102.291,
      latitud: 21.8818
    },
    fecha: new Date(),
    tipoPago: 0
  };

  constructor(private _apiService: DataApiService, private router: Router,private ruta:ActivatedRoute) { 
    this.ruta.params.subscribe( res => {
      //console.log(res);
        const {id} = res;
        this._apiService.getSolicitud(id).subscribe( solicitud => {
          this.solicitud=solicitud;
          this.inicializarMapa();
          this.mapa.setZoom(15);
        }, err => {
          //console.log(err);
          if(isNullOrUndefined(res.id))
            this.inicializarMapa();
        });
    });
  }

  ngOnInit(): void {

  }

  inicializarMapa(){
    Mapboxgl.accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.solicitud.coordenadas.longitud,this.solicitud.coordenadas.latitud], // starting position Ags,Ags.,Mx
      zoom: 12 // starting zoom
    });
    // Add zoom and rotation controls to the map.
    this.mapa.addControl(new Mapboxgl.NavigationControl());
    this.geolocateControl = new Mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    //agrega al mapa el controlador de geolocalización
    this.mapa.addControl(this.geolocateControl);
    //agrega al mapa un marcador nuevo con las coordenadas de inicialización
    this.crearMarcador(this.solicitud.coordenadas);

    this.geolocateControl.on('geolocate',(gc)=>{
      this.solicitud.coordenadas = {
        longitud:gc.coords.longitude,
        latitud:gc.coords.latitude
      };
      this.marker.setLngLat([this.solicitud.coordenadas.longitud,this.solicitud.coordenadas.latitud]);
    });

    this.marker.on('dragend', res => {
      console.log(res.target._lngLat);
      let { lng, lat } = res.target._lngLat;
      this.solicitud.coordenadas = {
        longitud: lng,
        latitud: lat
      };
    });
  }

  crearMarcador(coords){
    this.marker = new Mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([coords.longitud, coords.latitud])
      .addTo(this.mapa);
  }

  confirmar() {
    //console.log(this.solicitud);
    if(this.solicitud._id==null){
      this._apiService.solicitarServicio(this.solicitud).subscribe( res => {
        console.log(res);
        this.router.navigate([`/servicios/solicitud/${res._id}`]);
      }, err => console.log(err));
    }else{
      this._apiService.editarSolicitud(this.solicitud).subscribe( res => {
        console.log(res);
        this.router.navigate([`/servicios/solicitud/${this.solicitud._id}`]);
      }, err => console.log(err));
    }
  }
}
