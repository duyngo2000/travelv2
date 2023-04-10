const express = require('express')
const router = express.Router()
var paypal = require('paypal-rest-sdk');


router.post('/', (req,res)=>{
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'AVLs_Y1vDKLmMLsauvCzfykpd1u_nHivjNlAeh5WfdG-ChKsYVTIVbTHYhSxWP9EjKjXpbyhSNBxuMye',
        'client_secret': 'EECSLCElAP7OjIHex0zhGOtQGv7jhHdTPPOLj52R6fx6YzdnJWu_tPDVsd0A6CmgrH85RRf4nRY6sQ9e'
    });
    
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://return.url",
            "cancel_url": "http://cancel.url"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": req.body.name,
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let index = 0; index < payment.links.length; index++) {
                const link = payment.links[index];
                if(link.rel ==='approval_url'){
                    res.send(link.href)
                }
            }
        }
    });
})


module.exports = router