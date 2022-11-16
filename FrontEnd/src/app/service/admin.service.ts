import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private URL = "http://localhost:8000";
  constructor(private http:HttpClient) { }

  listUser():Observable<any>{
    return this.http.get(`${this.URL}/insize/lista`);
  }


  enviarSolicitud(solicitud:any):Observable<any>{
    return this.http.post(`${this.URL}/admin/solicitud`,solicitud);
  }
  verInfo(user:any){
    return this.http.post(`${this.URL}/admin/solicitud`,user);
  }


}
