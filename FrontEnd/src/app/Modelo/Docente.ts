import { Usuario } from "./CalseUsuario";

export class Docente extends Usuario{
         
 
        private CURP: string;
        private RFC: string;
        private CEDULA: string;
        private fechaInicio: Date;
        private gradoAcademico: string;
      


        constructor(){
            super();
            
            this.CURP = "";
            this.RFC = "";
            this.CEDULA = "";
            this.fechaInicio = new Date();
             
            this.gradoAcademico = "";
        }
      
        
        get _CURP(){return this.CURP;}
        get _RFC(){return this.RFC;}
        get _CEDULA(){return this.CEDULA;}
        get _fechaInicio(){return this.fechaInicio;}
         
        get _gradoAcademico(){return this.gradoAcademico;}
    

        
        set _CURP(CURP:string){this.CURP = CURP;}
        set _RFC(RFC:string){this.RFC = RFC;}
        set _CEDULA(CEDULA:string){this.CEDULA = CEDULA;}
        set _fechaInicio(fechaInicio:Date){this.fechaInicio = fechaInicio;}
         
        set _gradoAcademico(gradoAcademico:string){this.gradoAcademico = gradoAcademico;}
       
        
}