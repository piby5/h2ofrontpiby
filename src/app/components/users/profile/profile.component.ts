import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public usuario = {
    _id:'',
    nombre:'',
    apepat:'',
    apemat:'',
    correo:'',
    telefono:'',
    rol:null
  };

  cliente = {};
  empleado = {};

  usuarioPreEdit = {
    _id:'',
    nombre:'',
    apepat:'',
    apemat:'',
    correo:'',
    telefono:'',
  };

  constructor(private _authService:AuthService,private _apiService:DataApiService) {
    this._apiService.getUsuario(_authService.getCurrentUser()._id).subscribe(res =>{
      console.log(res);
      this.usuario=res;
      this.usuarioPreEdit=this.usuario;
    },err => console.log(err));
  }

  ngOnInit(): void {
  }

  editar(){
    this.usuarioPreEdit._id=this.usuario._id;
    this._apiService.editarUsuario(this.usuarioPreEdit).subscribe( res => {
      console.log(res);
    },err => console.log(err));
  }

  eliminarEmp(){
    this._apiService.borrarEmpleado(this.usuario._id,true).subscribe( res => {
      this._apiService.borrarUsuario(this.usuario._id).subscribe( resUsr => {
        console.log(resUsr);
      },err => console.log(err));
    },err => console.log(err));
  }

  eliminarCli(){
    this._apiService.borrarCliente(this.usuario._id,true).subscribe( res =>{
      this._apiService.borrarUsuario(this.usuario._id).subscribe( resUsr => {
        console.log(resUsr);
        this._authService.logout();
      },err => console.log(err));
    },err => console.log(err));
  }

}
