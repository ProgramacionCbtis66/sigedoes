import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JustificanteService {
  private URL = environment.HTTPS;
  private usr = environment.autorization;
  
  constructor(){}
}
