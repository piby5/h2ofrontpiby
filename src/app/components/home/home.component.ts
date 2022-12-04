import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private socketService: WebsocketService, private apiService:DataApiService,
    private router: Router, private authService: AuthService) {
  }
  
  ngOnInit(): void {
    // Al buscar un empleado disponible.
    this.socketService.onFindEmp( obj => {
      // console.log(obj);
      if(!this.authService.getCurrentUserID() == obj.id_emp) return;
      var title = "Nuevo servicio solicitado:";
      var text = "¿Desea ver detalles?";
      Swal.fire({
        title,
        text,
        showCancelButton: true,
        icon: 'info'
      }).then( (res) =>{
        if(res.isConfirmed){
          // this.socketService.sendAcceptService(obj.id_servicio);
          this.router.navigate([`/servicios/${obj.id_servicio}`]);
        }
      });
      
    });
  }

}
