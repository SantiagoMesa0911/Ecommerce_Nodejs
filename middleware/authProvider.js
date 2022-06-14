const {
	OauthClientID, OauthClientSecret, callbackURL,
	production, callbackURLDev, FacebookAppId,
	FacebookAppSecret, TwitterConsumerId, TwitterConsumerSecret
} = require('../config')


const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy

const callbackUrl = (provider) => `${production ? callbackURL : callbackURLDev}/api/auth/${provider}/callback`

const getProfile = (accessToken, refreshToken, profile, done) => {
	done(null, { profile })
}
const useGoogleStrategy = () => {
	return new GoogleStrategy({
		clientID: OauthClientID,
		clientSecret: OauthClientSecret,
		callbackURL: callbackUrl('google')
	}, getProfile)
}

const useFacebookStrategy = () => {
	return new FacebookStrategy({
		clientID: FacebookAppId,
		clientSecret: FacebookAppSecret,
		callbackURL: callbackUrl('facebook'),
		profileFields: ['id', 'emails', 'displayName', 'name', 'photos']
	}, getProfile)
}

const useTwitterStrategy = () => {
	return new TwitterStrategy({
		consumerKey: TwitterConsumerId,
		consumerSecret: TwitterConsumerSecret,
		callbackURL: callbackUrl('twitter'),
		includeEmail:true
	},getProfile)
}
module.exports = {
	useGoogleStrategy,
	useFacebookStrategy,
	useTwitterStrategy
}