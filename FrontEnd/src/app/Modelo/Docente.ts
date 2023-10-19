import { Usuario } from "./CalseUsuario";

export class Docente extends Usuario{
         
 
         
        private RFC: string;
        private CEDULA: string;
         
        private gradoAcademico: string;
      


        constructor(){
            super();
            this.RFC = "";
            this.CEDULA = "";
             
             
            this.gradoAcademico = "";
        }
      
        get _RFC(){return this.RFC;}
        get _CEDULA(){return this.CEDULA;}
         
         
        get _gradoAcademico(){return this.gradoAcademico;}

        set _RFC(RFC:string){this.RFC = RFC;}
        set _CEDULA(CEDULA:string){this.CEDULA = CEDULA;}
        
         
        set _gradoAcademico(gradoAcademico:string){this.gradoAcademico = gradoAcademico;}
       
        
}