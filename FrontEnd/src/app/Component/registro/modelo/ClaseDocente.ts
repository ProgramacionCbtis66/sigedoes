export class Docente{
    private numControl: number;
    private nombre: string;
    private apellidoP: string;
    private apellidoM: string;
    private CURP: string;
    private RFC: string;
    private CEDULA: string;
    private fechaInicio: Date;
    private foto: string;
    private gradoAcademico: string;


    constructor(){
        this.numControl = 0;
        this.nombre = "";
        this.apellidoP = "";
        this.apellidoM = "";
        this.CURP = "";
        this.RFC = "";
        this.CEDULA = "";
        this.fechaInicio = new Date();
        this.foto = "";
        this.gradoAcademico = "";
    }
  
    get _numControl(){return this.numControl;}
    get _nombre(){return this.nombre;}
    get _apellidoP(){return this.apellidoP;}
    get _apellidoM(){return this.apellidoM;}
    get _CURP(){return this.CURP;}
    get _RFC(){return this.RFC;}
    get _CEDULA(){return this.CEDULA;}
    get _fechaInicio(){return this.fechaInicio;}
    get _foto(){return this.foto;}
    get _gradoAcademico(){return this.gradoAcademico;}

    set _numControl(numControl:number){this.numControl = numControl;}
    set _nombre(nombre:string){this.nombre = nombre;}
    set _apellidoP(apellidoP:string){this.apellidoP = apellidoP;}
    set _apellidoM(apellidoM:string){this.apellidoM = apellidoM;}
    set _CURP(CURP:string){this.CURP = CURP;}
    set _RFC(RFC:string){this.RFC = RFC;}
    set _CEDULA(CEDULA:string){this.CEDULA = CEDULA;}
    set _fechaInicio(fechaInicio:Date){this.fechaInicio = fechaInicio;}
    set _foto(foto:string){this.foto = foto;}
    set _gradoAcademico(gradoAcademico:string){this.gradoAcademico = gradoAcademico;}
    
}