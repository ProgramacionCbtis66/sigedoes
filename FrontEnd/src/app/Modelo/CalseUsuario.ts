export class Usuario {
    private tipoUsuario: string;
    private nombre:string;
    private apellidoP: string;
    private apellidoM: string;
    private fechaNac:Date;
    private correo:string;
    private facebook:string;
    private twitter:string;
    private instagram:string;
    private pass:string;
    private pass2:string;
    private curp:string;
    private numControl:string;
    private turno:string;
    private direccion:string;
    private telefono:string;
    private CTO:string;
    private grupo:string;
    private rol:string;
    private foto:Blob;
    
    constructor() {
        this.tipoUsuario = "";
        this.nombre = "";
        this.apellidoP = "";
        this.apellidoM = "";
        this.fechaNac = new Date();
        this.correo = "";
        this.facebook = "";
        this.twitter = "";
        this.instagram = "";
        this.pass = "";
        this.pass2 = "";
        this.curp = "";
        this.numControl = "";
        this.turno = "";
        this.direccion = "";
        this.telefono = "";
        this.CTO = "30DCT0236O";
        this.grupo = "";
        this.rol = "";
        this.foto = new Blob();
    }

    get _tipoUsuario(){return this.tipoUsuario;}
    get _nombre(){return this.nombre;}
    get _apellidoP(){return this.apellidoP;}
    get _apellidoM(){return this.apellidoM;}
    get _fechaNac(){return this.fechaNac;}
    get _correo(){return this.correo;}
    get _facebook(){return this.facebook;}
    get _twitter(){return this.twitter;}
    get _instagram(){return this.instagram;}
    get _pass(){return this.pass;}
    get _pass2(){return this.pass2;}
    get _curp(){return this.curp;}
    get _numControl(){return this.numControl;}
    get _turno(){return this.turno;}
    get _direccion(){return this.direccion;}
    get _telefono(){return this.telefono;}
    get _CTO(){return this.CTO;}
    get _grupo(){return this.grupo;}
    get _rol(){return this.rol;}
    get _foto(){return this.foto;}

    set _tipoUsuario(tipoUsuario:string){this.tipoUsuario = tipoUsuario;}
    set _nombre(nombre:string){this.nombre = nombre;}
    set _apellidoP(apellidoP:string){this.apellidoP = apellidoP;}
    set _apellidoM(apellidoM:string){this.apellidoM = apellidoM;}
    set _fechaNac(fechaNac:Date){this.fechaNac = fechaNac;}
    set _correo(correo:string){this.correo = correo;}
    set _facebook(facebook:string){this.facebook = facebook;}
    set _twitter(twitter:string){this.twitter = twitter;}
    set _instagram(instagram:string){this.instagram = instagram;}
    set _pass(pass:string){this.pass = pass;}
    set _pass2(pass2:string){this.pass2 = pass2;}
    set _curp(curp:string){this.curp = curp;}
    set _numControl(numControl:string){this.numControl = numControl;}
    set _turno(turno:string){this.turno = turno;}
    set _direccion(direccion:string){this.direccion = direccion;}
    set _telefono(telefono:string){this.telefono = telefono;}
    set _CTO(CTO:string){this.CTO = CTO;}
    set _grupo(grupo:string){this.grupo = grupo;}
    set _rol(rol:string){this.rol = rol;}
    set _foto(foto:Blob){this.foto = foto;}
}