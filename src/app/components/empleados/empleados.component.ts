import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  public empleados = [];

  constructor(private apiService:DataApiService) { 
    this.apiService.getEmpleados().subscribe( res => {
      this.empleados = res;
    },err => console.log(err));
  }

  ngOnInit(): void {
  }

  verDetalles(id){}

}
