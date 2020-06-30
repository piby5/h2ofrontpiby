import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

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

  constructor(private _apiService:DataApiService,private ruta:ActivatedRoute,private router:Router) { 
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
