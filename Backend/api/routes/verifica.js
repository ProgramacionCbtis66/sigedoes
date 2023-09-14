usuario.post('/usr/login',async (req, res) => {
    const {usuario,password} = req.body;
    var registro = '';
    const sql = 'SELECT nomComp as usrname, rol, id_usr as id FROM usuario WHERE nombre = ? AND pass=?';
    const conexion = await con();
    try{
        const [record] = await conexcion.execute(sql,[usuario,password]);
        registro = record;
    }catch(error){
        console.log(error);
    }finally{
        conexion.end();
    }
    if (registro.length > 0){
        var user = JSON.stringify(registro[0]);
        var usr = JSON.parse(usr);
        const token =jwt.sign(usr,'ñ↓N', {expiresIn: '30m'});
        res.json({token});
    }else{
        res.json({mensaje: 'Usuario o contraseña incorrectos'});
    }
});