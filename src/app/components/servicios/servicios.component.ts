import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  public servicios = [];

  tipoAuto = ["HATCHBACK","SEDÁN","SUV","PICK-UP"];
  tipoServicio = ["EXPRÉS","COMPLETO"];

  constructor(private _apiService:DataApiService,private router:Router) { 
    this._apiService.getServicios().subscribe(res =>{
      console.log(res);
      this.servicios = res;
    });
  }

  ngOnInit(): void {
  }

  verDetalles(id){
    this.router.navigate([`/servicios/${id}`]);
  }

}
