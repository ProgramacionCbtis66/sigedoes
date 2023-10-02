export class Docente {
    private nombre: string;
    private apellidoP: string;
    private apellidoM: string;
    private email: string;
    private pass: string;
    private rol: string;


    constructor() {
        this.nombre = "";
        this.apellidoP = "";
        this.apellidoM = "";
        this.email = "";
        this.pass = "";
        this.rol = "Docente";
    }

    get _nombre() {return this.nombre;}
    get _apellidoP() {return this.apellidoP;}
    get _apellidoM() {return this.apellidoM;}
    get _email() {return this.email;}
    get _pass() {return this.pass;}
    get _rol() {return this.rol;}

    set _nombre(nombre: string) {this.nombre = nombre;}
    set _apellidoP(apellidoP: string) {this.apellidoP = apellidoP;}
    set _apellidoM(apellidoM: string) {this.apellidoM = apellidoM;}
    set _email(email: string) {this.email = email;}
    set _pass(pass: string) {this.pass = pass;}
    set _rol(rol: string) {this.rol = rol;}

}