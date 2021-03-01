'use strict'
const config = require('../config');
const sendGridEmailSender = require('../email-providers/send-grid');
const pureSmtpEmailSender = require('../email-providers/pure-smtp');

module.exports.sendEmail = async function(requestData) {
  try{
    switch(config.emailProvider.name){
      case "SendGrid":
        var secondPromise = await sendGridEmailSender.sendEmail(requestData);
        return secondPromise
      case "PureSMTP":
        var thirdPromise = await pureSmtpEmailSender.sendEmail(requestData);
        console.log(thirdPromise);
        return thirdPromise
    }
  }catch(err){
    throw new Error(`Problem with sending Mails ${err.message}`);
  }

}

