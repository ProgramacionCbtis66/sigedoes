const mercadopago = require('mercadopago');
const {ACCESS_TOKEN, NOTIFICACION_URL,PORT,HOST} = require('../../config.js');

 const createOrden = async (req,res) => {
    const item = [
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
    ];

    mercadopago.configure({
          access_token: ACCESS_TOKEN,
        // lo de arriba es indicador de donde va el api de mercado pago cuenta prueba
    });
    const results = await mercadopago.preferences.create({
        items: [
           item[2]
        ],
        back_urls:{
            success: HOST+PORT+"/pagos/success",
            failure: HOST+PORT+"/pagos/failure",
            pending: HOST+PORT+"/pagos/pending",
         },
         notification_url: NOTIFICACION_URL+"/pagos/webhook",
    });
     
    res.send(results.body.init_point)
    };
 const receiveWebhook = async (req, res) => {

       const payment = req.query;
       console.log(payment);
        try {
            if(payment.type === 'payment'){
                const data = await mercadopago.payment.findById(payment['data.id']);
                 
                const datos =[
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
                        external_reference: data.body.external_reference,
                        payment_type: data.body.payment_type_id,
                        merchant_order_id: data.body.order.id
                    }]
                
                console.log(datos);
            }
            res.status(204).send('ok');
        } catch (error) {
            console.log(error);
            res.status(500).send('error',error);
        }
}

const pendiente = async (req,res) => {
    console.log(req.body);
    res.send('pendiente');
}

module.exports = {createOrden, receiveWebhook, pendiente};