import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined} from "util";
import {UserempInterface} from '../models/useremp-interface';
import {UsercliInterface} from '../models/usercli-interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api'

  constructor( private http: HttpClient, private router: Router) { }


  signUp(user){
    return this.http.post<any>(this.URL+'/registercli',user);
  }

  signIn(user){
    return this.http.post<any>(this.URL+'/login',user);
  }
 
  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

 /*
  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "aplication/json"
  });

  registerUseremp(nombre:string, apepat:string, apemat:string, correo:string, contrasena:string, telefono:string, sueldo:string, disponibilidad:string){
    const url_api = "http://localhost:4200/api/components/users/registerUseremp";
    return this.http.post<UserempInterface>(url_api, {nombre:nombre, apepat:apepat, apemat:apemat, correo:correo, contrasena:contrasena, telefono:telefono, sueldo:sueldo, disponibilidad:disponibilidad},
      {headers: this.headers}).pipe(map(data=>data));
  }


  registerUsercli(nombre:string, apepat:string, apemat:string, correo:string, contrasena:string, telefono:string){
    const url_api = "http://localhost:4200/api/components/users/registerUsercli";
    return this.http.post<UsercliInterface>(url_api, {nombre:nombre, apepat:apepat, apemat:apemat, correo:correo, contrasena:contrasena, telefono:telefono},
      {headers: this.headers}).pipe(map(data=>data));
  }

  loginuser(correo:string, contrasena:string):Observable<any>{
    const url_api= "http://localhost:4200/api/components/users/login?include=user";
    return this.http.post<UserempInterface>(url_api,{correo:correo, contrasena:contrasena}, {headers:this.headers}).pipe(map(data=>data));
  }

  setUser(user:UserempInterface): void{
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser',user_string);
  }

  setToken(token): void{
    localStorage.setItem("accessToken",token);
  }

  getToken(){
    return localStorage.getItem("accessToken");
  }

  getCurrentUser():UserempInterface{
    let user_string = localStorage.getItem('currentUser');
    if(!isNullOrUndefined(user_string)){
      let user:UserempInterface = JSON.parse(user_string);
      return user;
    }else{
      return null;
    }
  }

  logoutUser(){
    let accessToken = localStorage.getItem('accessToken')
    const url_api= `http://localhost:4200/api/users/logout?access_token=${accessToken}`;
    localStorage.removeItem("accessToken")
    localStorage.removeItem("currentUser")
    return this.http.post<UserempInterface>(url_api, {headers:this.headers});
  }*/ 
}
