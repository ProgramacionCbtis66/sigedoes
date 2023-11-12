const mercadopago = require('mercadopago');
const {ACCESS_TOKEN, NOTIFICACION_URL, PORT, HOST } = require('../../config.js');
const ccn = require('../connection/connection');

 
const createOrdenConstancias = async (req, res) => {
    const datos = req.body;
    const item = datos[0];
    const numControl = datos[1];
     
    /*const item = [
        {
            title: "Pago Constancia",
            unit_price: 40,
            currency_id: "MXN",
            quantity: 1,
        },
        {
            title: "Pago Recursamiento",
            unit_price: 250,
            currency_id: "MXN",
            quantity: 1,
        },
        {
            title: "Pago Examen Global",
            unit_price: 220,
            currency_id: "MXN",
            quantity: 1,
        }
    ];*/

    mercadopago.configure({
        access_token: ACCESS_TOKEN,
        // lo de arriba es indicador de donde va el api de mercado pago cuenta prueba
    });
    const results = await mercadopago.preferences.create({
        items: [item],
        external_reference: numControl.numControl,
        description:"7",
        back_urls: {
            success: HOST + PORT + "/pagos/success-constancias",
            failure: HOST + PORT + "/pagos/failure-constancias",
            pending: HOST + PORT + "/pagos/pending-constancias",
        },
        notification_url: NOTIFICACION_URL + "/pagos/webhook-constancias",
    });
     
    res.json({ web: results.body.init_point,  reference: results.body.id})
};

const receiveWebhookConstancias = async (req, res) => {

    const payment = req.query;
    const numControl = req.body.external_reference;
    
     
    const conexion = await ccn();
    const sql = `insert into mercadopago (id, status, detalleStatus, description, monto, comisionMercadoPago, total, correo, urlNotificacion, fecha_aprobacion, payment_type, merchant_order_id, numControl) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    try {
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id']);
            
            const datos = 
                {
                    id: data.body.id,
                    status: data.body.status,
                    detalleStatus: data.body.status_detail,
                    description: data.body.description,
                    monto: data.body.transaction_amount,
                    comisionMercadoPago: data.body.transaction_details.total_paid_amount - data.body.transaction_details.net_received_amount,
                    total: data.body.transaction_details.net_received_amount,
                    correo: data.body.payer.email,
                    urlNotificacion: data.body.notification_url,
                    fecha_aprobacion: data.body.date_approved,
                    payment_type: data.body.payment_type_id,
                    merchant_order_id: data.body.order.id,
                    numControl: data.body.external_reference,
                };
                this.pid = datos.id;
                
            const [MercadoPago] = await conexion.execute(sql, [datos.id, datos.status, datos.detalleStatus, datos.description, datos.monto, datos.comisionMercadoPago, datos.total, datos.correo, datos.urlNotificacion, datos.fecha_aprobacion, datos.payment_type, datos.merchant_order_id, datos.numControl]);

            var [solicitud] = await conexion.execute(`insert into solicitud (numControl, codigoPago, fechaSolicitud, descripcion, aportacion, emitio, activo, idglobales, idrecursa) values (?,?,?,?,?,?,?,?,?)`, [datos.numControl, datos.id,datos.fecha_aprobacion,"Pago de constancia de estudios", datos.monto, "MERCADO PAGO", 1, 0, 0]); }
        
        res.status(204).send("ok");
    } catch (error) {
        console.log(error);
        res.status(500).send('error', error);
    }
}



const pendienteConstancias = async (req, res) => {
    console.log(req.body);
    res.send('pendiente');
}

module.exports = { createOrdenConstancias, receiveWebhookConstancias, pendienteConstancias };