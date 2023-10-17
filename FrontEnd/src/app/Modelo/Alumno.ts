import { Usuario } from "./CalseUsuario";

export class Alumno extends Usuario{
    private especialidad:string;
    private semestre:string;
    private area:string;

    constructor ()
    super{}
    {
        this.especialidad = "";
        this.semestre = "";
        this.area = "";
    }
}