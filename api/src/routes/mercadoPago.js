const { Router } = require("express");
const mercadopago = require('mercadopago')
const axios = require('axios')
const { generatePDF } = require("../emails/email")
const { User } = require("../db");

const { MP_ACCESS_TOKEN, MP_URL, MP_SUCCESS } = process.env


const router = Router();

mercadopago.configure({
    access_token: MP_ACCESS_TOKEN
});

router.post("/", (req, res) => {
    const products = req.body
    console.log(req.body)

    mercadopago.preferences.create({
        back_urls: { success: MP_SUCCESS },
        items: products,
        notification_url: `${MP_URL}/mercadopago/webhook`
        //pf-incaadventure-production.up.railway.app 
    }).then(preference => {
        return res.json({ preferenceId: preference.body.id, url: preference.body.init_point })
    }).catch(e => console.log(e))
})


router.post("/webhook", async (req, res) => {
    const { type } = req.query
    const { action } = req.body

    if (type !== "payment" && action !== 'payment.created') return res.status(200)

    let result = await axios.get(`https://api.mercadopago.com/v1/payments/${req.query['data.id']}`, {
        headers: { "Authorization": `Bearer ${MP_ACCESS_TOKEN}` }
    })

    if (result.data.status == "approved") {
        const { additional_info, card, id, status, payment_method, payer } = result.data
        const userPdf = await User.findOne({ where: { identification: card.cardholder.identification.number } })
        if (!userPdf) return
        generatePDF(additional_info.items, userPdf.email, userPdf.first_name, id, card.date_created, status, card.cardholder.identification.number, payment_method.type)
    }
    return res.status(201).json({ message: "ok" })
})

module.exports = router

