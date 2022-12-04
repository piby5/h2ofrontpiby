import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  public servicios = [];

  tipoAuto = ["HATCHBACK","SEDÁN","SUV","PICK-UP"];
  tipoServicio = ["EXPRÉS","COMPLETO"];

  constructor(private _apiService:DataApiService,private router:Router, private authService:AuthService) {
    this._apiService.getPendientes().subscribe(res =>{
      console.log(res);
      this.servicios = res;
    });
  }

  ngOnInit(): void {
  }

  onChangeSelect(valor){
    if(valor == "pendientes"){
      this._apiService.getPendientes().subscribe(res =>{
        this.servicios = res;
      },err => console.log(err));
    }
    else{
      this._apiService.getServicios().subscribe(res =>{
        this.servicios = res;
      },err => console.log(err));
    }
  }

  verDetalles(id){
    this.router.navigate([`/servicios/${id}`]);
  }

}
