import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user ={
    correo:'',
    contrasena:''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.authService.signIn(this.user)
    .subscribe(
      res=>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        // setTimeout(() => this.authService.logout(), this.authService.getSessionExpiresIn());
      },
      err => {
        Swal.fire(err.status.toString(), err.error);
        this.user.contrasena = '';
        console.log(err)
      }
    )
  }

}
