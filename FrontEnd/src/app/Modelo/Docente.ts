import { Usuario } from "./CalseUsuario";

export class Docente extends Usuario{
        private numControl: number;
        
 
        private CURP: string;
        private RFC: string;
        private CEDULA: string;
        private fechaInicio: Date;
        private foto: string;
        private gradoAcademico: string;
      


        constructor(){
            
        }
      
        get _numControl(){return this.numControl;}
        get _CURP(){return this.CURP;}
        get _RFC(){return this.RFC;}
        get _CEDULA(){return this.CEDULA;}
        get _fechaInicio(){return this.fechaInicio;}
        get _foto(){return this.foto;}
        get _gradoAcademico(){return this.gradoAcademico;}
    

        set _numControl(numControl:number){this.numControl = numControl;}
        set _CURP(CURP:string){this.CURP = CURP;}
        set _RFC(RFC:string){this.RFC = RFC;}
        set _CEDULA(CEDULA:string){this.CEDULA = CEDULA;}
        set _fechaInicio(fechaInicio:Date){this.fechaInicio = fechaInicio;}
        set _foto(foto:string){this.foto = foto;}
        set _gradoAcademico(gradoAcademico:string){this.gradoAcademico = gradoAcademico;}
       
        
}