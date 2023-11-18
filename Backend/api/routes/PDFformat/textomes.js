function textomes(mes) {
    const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return month[mes];
}

function textodia(dia) {
    const day = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    return day[dia];
}

//texto año
function textoanio(anio) {
    const year = ["Dos Mil Veinte", "Dos Mil Veintiuno", "Dos Mil Veintidos", "Dos Mil Veintitres", "Dos Mil Veinticuatro", "Dos Mil Veinticinco", "Dos Mil Veintiseis", "Dos Mil Veintisiete", "Dos Mil Veintiocho", "Dos Mil Veintinueve", "Dos Mil Treinta", "Dos Mil Treinta y Uno"];
    return year[anio];
}

module.exports = { textomes, textodia, textoanio};
