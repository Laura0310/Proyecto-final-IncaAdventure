const { jsPDF } = require("jspdf");
require("jspdf-autotable");
const format = require("date-fns");
const nodemailer = require("nodemailer");
const welcomeBody = require("./welcome")
const ticketBody = require("./ticket")

var transporter = nodemailer.createTransport({ // variable global para poder usarla en el resto de funciones de sendEmail
    service: 'gmail',
    auth: {
        user: 'incaadventureinfo@gmail.com',
        pass: 'eubdgcxswwkcaqxt'
    }
});



// generar pdf del vaucher y luego enviarlo por correo 
// services/reportGenerator.js


async function generatePDF(products, email, username, id, dateCreated, status, userId, paymentMethod) {
    const doc = jsPDF();
    const tableColumn = ["Title", "Price", "Units"];
    const tableRows = [];
    products.forEach(e => { // [{id = 1, title = a, request = a, status = s}, {}, {}]
        const productData = [ // [1, a, a, s]
            e.title,
            e.unit_price,
            e.quantity
        ];
        /*
 "id": 20359978,
  "date_created":
  payer.identification.number:userId
  payment_method_id : paymentMethod
  status
  additional_info.items :products
*/

        tableRows.push(productData);
    });
    doc.text("Este es tu voucher de compra.", 14, 15);
    doc.text(14, 20, 'ID:  ' + id);
    doc.text(14, 25, 'date_created:  ' + dateCreated);
    doc.text(14, 30, 'status:  ' + status);
    doc.text(14, 35, 'user_id:  ' + userId);
    doc.text(14, 40, 'payment_method:  ' + paymentMethod);
    doc.autoTable(tableColumn, tableRows, { startY: 50 });




    var mailOptions = {
        from: "Inca Adventure <acostavalentina7@gmail.com>",
        to: `${email}`,
        subject: "Ticket",
        html: ticketBody(username),
        attachments: [
            {
                filename: "ticket.pdf",
                content: Buffer.from(doc.output('arraybuffer'))
            }
        ]
    }

    let info = await transporter.sendMail(mailOptions,);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("Email sent!");
};

// funcion que envia el email de bienvenida cuando se registra el usuario

async function sendEmail(email, username) {

    var mailOptions = {
        from: "Inca Adventure <acostavalentina7@gmail.com>",
        to: `${email}`,
        subject: "Welcome to Inca Adventure",
        html: welcomeBody(username)
    }

    let info = await transporter.sendMail(mailOptions,);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("Email sent!");
}

module.exports = {
    sendEmail,
    generatePDF,
}



