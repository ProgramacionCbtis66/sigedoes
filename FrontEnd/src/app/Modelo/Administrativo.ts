import { Usuario } from "./CalseUsuario";

export class Administrativo extends Usuario{
   private nivelOperativo:string;
   private departamento:string;
    
    constructor(){
        super();
        this.nivelOperativo="";
        this.departamento="";
    }

    get _nivelOperativo(){return this.nivelOperativo;}
    get _departamento(){return this.departamento;}
    set _nivelOperativo(nivelOperativo:string){this.nivelOperativo = nivelOperativo;}
    set _departamento(departamento:string){this.departamento = departamento;}
}