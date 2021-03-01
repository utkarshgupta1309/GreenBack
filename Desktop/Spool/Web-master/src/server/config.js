/*
* Desc: Config.js contains all configuration variables and keys needed in the application
* Usage: To create a new config key, use config.<your key name >. Then import the config.js in your module
*
*/

var config = module.exports;

config.appName = process.env.APP_NAME;
config.supportEmail = process.env.SUPPORT_EMAIL;


config.dbConnection = {
  string: process.env.MONGO_URI,
  mongoURI: process.env.MONGO_URI,
};

// Email Provider
config.emailProvider = {
  name: 'PureSMTP',
}

// Sender Email Credentials and configurations
config.smtp = {
  port: "",
  protocol: "",
  service: 'SendGrid',
  username: process.env.SENDGRID_USERNAME,
  password: process.env.SENDGRID_PASSWORD,
  fromEmail:process.env.SENDGRID_FROM_EMAIL
}

config.zoom = {
  clientId:process.env.ZOOM_API_CLIENT_ID,
  clientSecret: process.env.ZOOM_API_CLIENT_SECRET,
  verificationToken: process.env.ZOOM_VERIFICATION_TOKEN
}

//Set base url of app
config.base_url = process.env.APP_BASE_URL
config.frontBaseUrl = process.env.FRONT_BASE_URL;