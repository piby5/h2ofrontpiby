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
    sueldo:'',
    disponibilidad:''
  }

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  signUp(){
    this.authService.signUp(this.user)
      .subscribe(
        res=>{
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private']);
        }, 
        err=>console.log(err)
      )
  }
}
