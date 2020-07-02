import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import * as MapboxGl from "mapbox-gl";
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  mapa:MapboxGl.Map;

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
      },
      tipoPago:null
    },
    statusServicio:0,
    statusPago:0,
    total:null
  };

  urlMapa = '';
  isEmpArrived :boolean;

  constructor(private _apiService:DataApiService, public authService:AuthService,
      private ruta:ActivatedRoute,private router:Router) {

    this.isEmpArrived=false;

    const { id } = this.ruta.snapshot.params;
    let consulta:any;
    if(!router.url.includes('/solicitud')){
      consulta = this._apiService.getServicio(id);
    }else{
      //get servicio con id de solicitud
      consulta = this._apiService.getServicio(id,true);
    }

    consulta.subscribe( res => {
      this.servicio = res;
      //console.log(this.servicio);
      const lng = this.servicio.info.coordenadas.longitud;
      const lat = this.servicio.info.coordenadas.latitud;
      this.urlMapa = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s(${lng},${lat})/${lng},${lat},15.5,0,50/350x350?access_token=${environment.mapboxKey}`;

      if(authService.getCurrentUser().rol == 1)
        this.inicializarRuta();

    });
    
  }

  ngOnInit(): void {  }

  cancelar(){
    this._apiService.borrarServicio(this.servicio._id).subscribe( res => {
      this._apiService.borrarSolicitud(this.servicio.solicitud).subscribe( resp => {
        console.log(resp);
        this.router.navigate(['/solicitar']);
      });
    });
  }

  inicializarRuta(){
    MapboxGl.accessToken = environment.mapboxKey;
    this.mapa = new MapboxGl.Map({
      container: 'mapaRuta', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.servicio.info.coordenadas.longitud, this.servicio.info.coordenadas.latitud], // starting position LNG,LAT de Ags.
      zoom: 12 // starting zoom
    });
    
    this.mapa.addControl(new MapboxGl.NavigationControl());
    
    let geolocateControl = new MapboxGl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    this.mapa.addControl(geolocateControl);

    geolocateControl.on('geolocate',(gc)=>{
      let inicio = {
        longitud: gc.coords.longitude,
        latitud: gc.coords.latitude
      };
      this.getRuta(inicio,this.servicio.info.coordenadas);
    });

    new MapboxGl.Marker()
      .setLngLat([this.servicio.info.coordenadas.longitud, this.servicio.info.coordenadas.latitud])
      .addTo(this.mapa);

    this.mapa.on('render',map => {
      this.mapa.resize();
    });
  }

  getRuta(coords_ini,coords_fin){
    this._apiService.getRuta(coords_ini,coords_fin).subscribe( res =>{
      //console.log(res);
      var data = res.routes[0];
      var route = data.geometry.coordinates;
      if(!this.mapa.getSource('route')){
        this.mapa.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: route
              }
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 4,
            'line-opacity': 0.75
          }
        });
      }
    },err => console.log(err));
  }

  llegarADestino(){
    console.log("Aviso para cliente que se llegó al destino!");
    this.isEmpArrived=true;
  }

  iniciarServicio(){
    this.servicio.fechaHora = {
      inicio: new Date(),
      fin: null
    };
    this._apiService.editarServicio(this.servicio).subscribe(res =>{
      console.log(res);
    },err => console.log(err));
  }

  finalizarServicio(){
    this.servicio.fechaHora.fin = new Date();
    this.servicio.statusServicio = 1;
    this.servicio.statusPago = 1;
    this._apiService.editarServicio(this.servicio).subscribe(res =>{
      console.log(res);
    },err => console.log(err));
  }

}
