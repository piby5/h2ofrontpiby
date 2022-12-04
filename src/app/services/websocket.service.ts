import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

interface Coords {
  latitud: string;
  longitud: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private URL = environment.api_uri.split('/api')[0];
  // outEvent: EventEmitter<any> = new EventEmitter();
  
  constructor(private socket:Socket) { 
  }

  findEmpleado(id_servicio) {
    this.socket.emit('client:findEmp', id_servicio);
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  sendCoords(coords:Coords) {
    this.socket.emit('client:coords',coords)
  }

  
  sendNewService(id_solicitud) {
    this.socket.emit('client:newSrv', id_solicitud);
  }

  sendAcceptService(id_servicio) {
    this.socket.emit('client:acceptSrv', id_servicio);
  }

  /* Events */
  onFindEmp(callback) {
    this.socket.on('server:findEmp', callback);
  }
  onNewCoords() {
    this.socket.on('server:coords', coords => console.log(coords) );
  }


}

