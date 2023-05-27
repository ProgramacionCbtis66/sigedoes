import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
type Cliente = string;

@Injectable({
  providedIn: 'root',
})
export class ObservableService {
  private adminService : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loginPrivate : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public login(data:boolean):void{
    this.loginPrivate.next(data);
  }

  public mostrarlogin():Observable<boolean>{
    return this.loginPrivate.asObservable();
  }

  public getboolean():boolean{
    return this.loginPrivate.getValue();
  }


  
  public admin(ADMIN:boolean):void{
    this.adminService.next(ADMIN);
  }

  public mostrarAdmin():Observable<boolean>{
    return this.adminService.asObservable();
  }

  public getAdminBoolean():boolean{
    return this.adminService.getValue();
  }

}
