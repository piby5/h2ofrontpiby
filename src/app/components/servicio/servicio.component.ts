import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  public servicio = {};

  constructor(private _apiService:DataApiService,private ruta:ActivatedRoute) { 
    const { id } = this.ruta.snapshot.params;
    this._apiService.getServicio(id).subscribe( res => {
      this.servicio = res;
      console.log(this.servicio);
    });
  }

  ngOnInit(): void {
  }

}
