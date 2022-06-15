require('dotenv').config();

const config = {
  production: process.env.NODE_ENV === 'production',
  development: process.env.NODE_ENV === 'development',
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
  jwtsecret: process.env.JWT_SECRET,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  StripePublicKey: process.env.STRIPE_PUBLIC_KEY,
  StripeSecretKey: process.env.STRIPE_SECRET_KEY,
  OauthClientID: process.env.OAUTH_CLIENT_ID,
  OauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
  FacebookAppId: process.env.FACEBOOK_APP_ID,
  FacebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  TwitterConsumerId: process.env.TWITTER_CONSUMER_ID,
  TwitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  callbackURLDev: process.env.CALLBACK_URL_DEVELOPMENT
};
module.exports = config;
