import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private URL = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getTask(){
    return this.http.get<any>(this.URL+'/task');
  }

  getPrivateTask(){
    return this.http.get<any>(this.URL+'/private');
  }

}
 