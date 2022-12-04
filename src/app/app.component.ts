import { Component } from '@angular/core';
import { AuthService} from './services/auth.service';
import { DataApiService } from './services/data-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged: boolean;
  usuario = {
      _id:'',
      nombre:'',
      apepat:'',
      apemat:'',
      correo:'',
      telefono:'',
      roles:[]
  }

  constructor(public authService: AuthService, private dataApiService:DataApiService){
    this.isLogged = this.authService.loggedIn();
    if(this.isLogged){
      this.dataApiService.getUsuario(this.authService.getCurrentUserID()).subscribe( res => {
        this.usuario = res;
        console.log(res);
        // this.imgPath = environment.api_uri.split("api")[0] + this.usuario.img_perfil!;
        // if(!this.imgPath.includes("uploads"))
        //   this.imgPath = "assets/img/profile.jpg";
      });
    }
  }

}
