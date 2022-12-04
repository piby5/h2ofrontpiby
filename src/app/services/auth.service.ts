import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URI = environment.api_uri;

  currentUser = {
    _id: '',
    nombre: '',
    apepat: '',
    apemat: '',
    correo: '',
    usuario: '',
    telefono: '',
    roles:[]
  };

  constructor( private http: HttpClient, private router: Router) { }

  signUp(user){
    return this.http.post<any>(this.URI+'auth/signup',user);
  }

  signUpC(user){
    return this.http.post<any>(this.URI+'clientes',user);
  }

  signUpE(user){
    return this.http.post<any>(this.URI+'empleados',user);
  }

  signIn(user){
    return this.http.post<any>(this.URI+'auth/signin',user);
  }
 
  loggedIn(){
    return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getCurrentUserID(){
    const decode = jwt_decode(this.getToken());
    return decode._id;
  }

  getSessionExpiresIn(){
    const decode = jwt_decode(this.getToken());
    return decode.expiresIn;
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
    const URI_api = "http://localhost:4200/api/components/users/registerUseremp";
    return this.http.post<UserempInterface>(URI_api, {nombre:nombre, apepat:apepat, apemat:apemat, correo:correo, contrasena:contrasena, telefono:telefono, sueldo:sueldo, disponibilidad:disponibilidad},
      {headers: this.headers}).pipe(map(data=>data));
  }


  registerUsercli(nombre:string, apepat:string, apemat:string, correo:string, contrasena:string, telefono:string){
    const URI_api = "http://localhost:4200/api/components/users/registerUsercli";
    return this.http.post<UsercliInterface>(URI_api, {nombre:nombre, apepat:apepat, apemat:apemat, correo:correo, contrasena:contrasena, telefono:telefono},
      {headers: this.headers}).pipe(map(data=>data));
  }

  loginuser(correo:string, contrasena:string):Observable<any>{
    const URI_api= "http://localhost:4200/api/components/users/login?include=user";
    return this.http.post<UserempInterface>(URI_api,{correo:correo, contrasena:contrasena}, {headers:this.headers}).pipe(map(data=>data));
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
    const URI_api= `http://localhost:4200/api/users/logout?access_token=${accessToken}`;
    localStorage.removeItem("accessToken")
    localStorage.removeItem("currentUser")
    return this.http.post<UserempInterface>(URI_api, {headers:this.headers});
  }*/ 
}
