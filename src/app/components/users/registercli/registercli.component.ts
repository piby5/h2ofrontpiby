import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-registercli',
  templateUrl: './registercli.component.html',
  styleUrls: ['./registercli.component.css']
})
export class RegistercliComponent implements OnInit {


  user={
    nombre:'',
    apepat:'',
    apemat:'',
    correo:'',
    contrasena:'',
    telefono:'',
  }
  
 
  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  signUp(){
    this.authService.signUpC(this.user)
     .subscribe(
       res=>{
        //  console.log(res);
         localStorage.setItem('token', res.token);
         this.router.navigate(['/']);
       }, 
       err=>{
        Swal.fire(err.status.toString(), err.error.message || err.error )
        // console.log(err)
      }
     )
   }

}
