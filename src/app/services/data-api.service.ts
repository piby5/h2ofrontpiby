import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/internal/observable";
import { AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor( private http: HttpClient,  private authService: AuthService) { }

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "aplication/json"
  });
}
