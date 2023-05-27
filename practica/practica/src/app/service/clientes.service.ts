import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Persona {
  name:string,
  age?:number
}

@Injectable({
  providedIn: 'root'
})

export class ClientesService {  
  private arrayofPeople: Persona[] = [
    {name:"Juan Pedro",age:16},
    {name:"bzrp",age:24},
  ];

  private sharingObservablePrivate$: BehaviorSubject<Persona> = 
  new BehaviorSubject<Persona>({name:"Juan Pedro"});
  
  private sharingCombinableObservablePrivate$: BehaviorSubject<Persona> = 
  new BehaviorSubject<Persona>({name:"Bzrp"});

  private sharingDependentObservablePrivate$: BehaviorSubject<Persona[]> = 
  new BehaviorSubject<Persona[]>([]);

  get SharingObservable(){
    return this.sharingObservablePrivate$.asObservable();
  }

  get SharingCombinableObservable(){
    return this.sharingCombinableObservablePrivate$.asObservable();
  }

  get SharingDependentObservable(){
    return this.sharingDependentObservablePrivate$.asObservable();
  }

  set SharingObservableData(data: Persona){
    this.sharingObservablePrivate$.next(data);
  }

  

  set SharingDependentObservableData(name:string){
    const foundperson = this.arrayofPeople.find(
      (person) => person.name === name
    );
    if(foundperson) this.sharingDependentObservablePrivate$.next([
      ...this.sharingDependentObservablePrivate$.getValue(),foundperson]);
    else console.log('Person not found');
  }
  
}
