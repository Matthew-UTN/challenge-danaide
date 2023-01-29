import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class SurveillanceService {
  baseUrl = 'http://develop.danaide.com.ar/test/api';

  constructor(private http: HttpClient) {}

  // busca todo los channels
  getChannels(): Observable<any> {
    return this.http.get(`${this.baseUrl}/channels`);
  }
  
  // retorna el playlist
  getPlaylist(): Observable<any> {
    return this.http.get(`${this.baseUrl}/playlist`);
  }

  // agrega un channel al playlist
  addToPlaylist(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/playlist/add/${id}`, {});
  }
  
  // elimina un channel del playlist
  removeFromPlaylist(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/playlist/remove/${id}`);
  }

  // retorna el video
  getVideo(id: string): string {
    //return this.http.get(`${this.baseUrl}/video/${id}.mp4`, { responseType: 'blob' });
    return `${this.baseUrl}/video/${id}.mp4`
  }

  // retorna notificaciones
  getNotifications(): Observable<any> {
    return ajax.getJSON(`${this.baseUrl}/event`);
  }
  
  // retorna la imaggen asociado al evento
  getEventImage(id: number): string {
    return `${this.baseUrl}/event/image/${id}`;
  }
}
