import { Usuario } from "./CalseUsuario";

export class Alumno extends Usuario{
    private especialidad:string;
    private grado:string;
    private area:string;
    private grupo:string;
    private horario:string;

    constructor(){
        super();
        this.especialidad="";
        this.grado="";
        this.area="";
        this.grupo="";
        this.horario="";
    }

    get _especialidad(){return this.especialidad;}
    get _grado(){return this.grado;}
    get _area(){return this.area;}
    get _grupo(){return this.grupo;}
    get _horario(){return this.horario;}

    set _especialidad(especialidad:string){this.especialidad = especialidad;}
    set _grado(grado:string){this.grado = grado;}
    set _area(area:string){this.area = area;}
    set _grupo(grupo:string){this.grupo = grupo;}
    set _horario(horario:string){this.horario = horario;}
}