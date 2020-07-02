import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-ventas-emp',
  templateUrl: './ventas-emp.component.html',
  styleUrls: ['./ventas-emp.component.css']
})
export class VentasEmpComponent implements OnInit {

  public empleados = [];

  constructor(private apiService:DataApiService) {
    this.apiService.getServiciosEmp().subscribe( res => {
      this.empleados = res;
      this.empleados.forEach(emp => {
        this.apiService.getEmpleado(emp._id).subscribe( data => {
          emp.sueldo = data.sueldo;
          emp.nombre = data.info.nombre+' '+data.info.apepat+' '+data.info.apemat;
          emp.correo = data.info.correo;
          emp.telefono = data.info.telefono;
        });
      });
    },err => console.log(err));
  }

  ngOnInit(): void {
  }

}
