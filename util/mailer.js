var nodemailer = require('nodemailer');
const templates  = require('./templates');
const consts = require('../constants')
const db = require('../models');
module.exports={
    sendPasswordResetEmail: function(email,hash){
        return new Promise(function (resolve,reject) {
            var link = consts.WEBSITE_URL+'/account?action=password-reset&token='+hash
            const template = templates.getPasswordResetEmail(email,link);
            var smtpTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'p2pcarsharing21@gmail.com',
                    pass: '72397239'
                }
            });
            var mailOptions = {
                from: 'p2pcarsharing21@gmail.com',
                to: email,
                subject: "password reset",
                html:template,
                text: "press the link for password reset"
            };
            smtpTransport.sendMail(mailOptions, function(error, info){
                if (error) {
                    reject(error);
                } else {
                    resolve('email sent successfully!!');

                }
            });
        })

    },
    sendPasswordReplacedEmail : function (email) {
        return new Promise(function (resolve,reject) {
            const template = templates.getPasswordReplacedEmail(email);
            var smtpTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'p2pcarsharing21@gmail.com',
                    pass: '72397239'
                }
            });
            var mailOptions = {
                from: 'p2pcarsharing21@gmail.com',
                to: email,
                subject: "password reset",
                html:template,
                text: "press the link for password reset"
            };
            smtpTransport.sendMail(mailOptions, function(error, info){
                if (error) {
                    reject(error);
                } else {
                    resolve('email sent successfully!!');

                }
            });
        })
    },
    sendAccountActivationEmail : function (email, username, link) {
        return new Promise(function (resolve,reject) {
            const template = templates.getAccountActivationTemplate(username,link);
            var smtpTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'p2pcarsharing21@gmail.com',
                    pass: '72397239'
                }
            });
            var mailOptions = {
                from: 'p2pcarsharing21@gmail.com',
                to: email,
                subject: "Account activation",
                html:template,
                text: "press the link for password reset"
            };
            smtpTransport.sendMail(mailOptions, function(error, info){
                if (error) {
                    reject(error);
                } else {
                    resolve('email sent successfully!!');

                }
            });
        })
    },

}