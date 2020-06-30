import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  tipoAuto = ["HATCHBACK","SEDÁN","SUV","PICK-UP"];
  tipoServicio = ["EXPRÉS","COMPLETO"];

  solicitudes = [];

  constructor(private _apiService:DataApiService,private router:Router) { 
    this._apiService.getSolicitudes().subscribe(res =>{
      console.log(res);
      this.solicitudes = res;
    });
  }

  ngOnInit(): void {
  }

  verDetalles(id){
    this.router.navigate([`/solicitudes/${id}`]);
  }

}
