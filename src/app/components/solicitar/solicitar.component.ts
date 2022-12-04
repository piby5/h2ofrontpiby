import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from "mapbox-gl";
import { DataApiService } from 'src/app/services/data-api.service';
import { WebsocketService } from 'src/app/services/websocket.service';

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

  constructor(private _apiService: DataApiService, private router: Router,
    private ruta:ActivatedRoute, private socketService: WebsocketService) { 
    this.ruta.params.subscribe( res => {
      //console.log(res);
        const {id} = res;
        this._apiService.getSolicitud(id).subscribe( solicitud => {
          this.solicitud=solicitud;
          this.inicializarMapa();
          this.mapa.setZoom(15);
        }, err => {
          //console.log(err);
          if(res.id == (null || undefined))
            this.inicializarMapa();
        });
    });
  }

  ngOnInit(): void {

  }

  inicializarMapa(){
    Mapboxgl.accessToken = environment.mapboxKey;
    const { longitud, latitud } = this.solicitud.coordenadas;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitud,latitud], // starting position Ags,Ags.,Mx
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

    this.geolocateControl.on('geolocate',(gc) => {
      const {longitude, latitude} = gc.coords;
      // this.marker.setLngLat([longitude, latitude]);
      this.solicitud.coordenadas = {
        longitud: longitude,
        latitud: latitude
      };
    });

    this.marker.on('dragend', res => {
      // console.log(res.target._lngLat);
      const { lng, lat } = res.target._lngLat;
      this.solicitud.coordenadas = {
        longitud: lng,
        latitud: lat
      };
    });

    this.mapa.on('click' || 'touchstart', (e) => {
      e.preventDefault();
      console.log(e.lngLat);
      const { lng, lat } = e.lngLat;
      this.marker.setLngLat([lng, lat]);
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
      this._apiService.crearSolicitud(this.solicitud).subscribe( rsol => {
        console.log('Solicitud:', rsol);
        if(!rsol.solicitud._id) return;
        const servicio = {
          solicitud: rsol.solicitud
        }
        this._apiService.crearServicio(servicio).subscribe(rsrv => {
          console.log('Servicio:', rsrv);
          if(!rsrv.servicio._id) return;
          this.router.navigate([`/servicios/${rsrv.servicio._id}`]);
          /* Llamada a socket */
          this.socketService.findEmpleado(rsrv.servicio._id);
        });
      }, err => console.log(err));
    }else{
      this._apiService.editarSolicitud(this.solicitud).subscribe( res => {
        console.log(res);
        this.router.navigate([`/servicios/solicitud/${this.solicitud._id}`]);
      }, err => console.log(err));
    }
  }
}
