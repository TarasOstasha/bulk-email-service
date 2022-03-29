var express = require('express');
var router = express.Router();
const chalk = require('chalk');
const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require("nodemailer");


/* GET bulk page. */
router.get('/', function (req, res, next) {
    //console.log(chalk.yellow('bulk is working'))
    //console.log(req.body)
    res.render('bulk-mail', { title: 'Bulk' });
});

/* GET bulk page. */
router.post('/', function (req, res, next) {
    //console.log(chalk.yellow(req.body.recipients))
    //console.log(chalk.yellow(req.body.editorData.element))
    let mailContent = req.body.editorData.element;
    let mailRecipients = req.body.recipients;
    console.log(chalk.red(mailContent,mailRecipients))
    sendMail(mailContent, mailRecipients, info => {
        res.status(200).json({
            info,
            msg: 'The Mail Has been Sent',
            ok: true
        });
    });
});

// mailer
async function sendMail(mailContent, mailRecipients, callback) {
    console.log(mailContent, '***mailContent***')
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, //587,
        secure: true, //false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASS 
        }
    }, (err, info) => {
        if (err) {
            throw new Error(err)
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    let mailOptions = {
        from: 'tonyjoss1990@gmail.com', // sender address
        to: `${mailRecipients}`, // list of receivers 
        subject: "XYZ Displays", // subject line
        html: mailContent
    }

    let info = await transporter.sendMail(mailOptions);

    callback(info)
}


module.exports = router;