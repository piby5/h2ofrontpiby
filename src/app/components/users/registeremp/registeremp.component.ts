import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-registeremp',
  templateUrl: './registeremp.component.html',
  styleUrls: ['./registeremp.component.css']
})
export class RegisterempComponent implements OnInit {

  user={
    nombre:'',
    apepat:'',
    apemat:'',
    correo:'',
    contrasena:'',
    telefono:'',
    sueldo:null,
    disponibilidad:null
  }

  constructor(private authService: AuthService, private router: Router ) {
    this.user.disponibilidad=0;
   }

  ngOnInit(): void {
  }

  signUp(){
    this.authService.signUpE(this.user)
      .subscribe(
        res=>{
          console.log(res);
          this.router.navigate(['/empleados']);
          //this.router.navigate(['/servicio']);
        }, 
        err=>console.log(err)
      )
  }
}
