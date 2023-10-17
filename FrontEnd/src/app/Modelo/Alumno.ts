import { Usuario } from "./CalseUsuario";

export class Alumno extends Usuario{
    private especialidad:string;
    private semestre:string;
    private area:string;

    constructor(){
        super();
        this.especialidad="";
        this.semestre="";
        this.area="";
    }

    get _especialidad(){return this.especialidad;}
    get _semestre(){return this.semestre;}
    get _area(){return this.area;}

    set _especialidad(especialidad:string){this.especialidad = especialidad;}
    set _semestre(semestre:string){this.semestre = semestre;}
    set _area(area:string){this.area = area;}
}