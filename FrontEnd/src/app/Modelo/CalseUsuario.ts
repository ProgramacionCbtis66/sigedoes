export class Usuario {

    private nombre:string;
    private apellidoP: string;
    private apellidoM: string;
    private correo:string;
    private pass:string;
    private pass2:string;
    private curp:string;
    private numControl:string;
    private turno:string;
    private direccion:string;
    private CTO:string;
    private grupo:string;
    private rol:string;
    private foto:string;
    
    constructor() {
        this.nombre = "";
        this.apellidoP = "";
        this.apellidoM = "";
        this.correo = "";
        this.pass = "";
        this.pass2 = "";
        this.curp = "";
        this.numControl = "";
        this.especialidad = "";
        this.semestre = "";
        this.area = "";
        this.turno = "";
        this.direccion = "";
        this.CTO = "30DCT0236O";
        this.grupo = "";
    }

    get _nombre(){return this.nombre;}
    get _correo(){return this.correo;}
    get _pass(){return this.pass;}
    get _pass2(){return this.pass2;}
    get _curp(){return this.curp;}
    get _noctrl(){return this.noctrl;}
    get _especialidad(){return this.especialidad;}
    get _semestre(){return this.semestre;}
    get _area(){return this.area;}
    get _turno(){return this.turno;}
    get _direccion(){return this.direccion;}
    get _CTO(){return this.CTO;}
    get _grupo(){return this.grupo;}
    get _rol(){return this.rol;}

    set _nombre(nombre:string){this.nombre = nombre;}
    set _correo(correo:string){this.correo = correo;}
    set _pass(pass:string){this.pass = pass;}
    set _pass2(pass2:string){this.pass2 = pass2;}
    set _curp(curp:string){this.curp = curp;}
    set _noctrl(noctrl:string){this.noctrl = noctrl;}
    set _especialidad(especialidad:string){this.especialidad = especialidad;}
    set _semestre(semestre:string){this.semestre = semestre;}
    set _area(area:string){this.area = area;}
    set _turno(turno:string){this.turno = turno;}
    set _direccion(direccion:string){this.direccion = direccion;}
    set _CTO(CTO:string){this.CTO = CTO;}
    set _grupo(grupo:string){this.grupo = grupo;}
    set _rol(rol:string){this.rol = rol;}
}