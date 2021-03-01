'use strict';
const request = require('request');
const config = require("../config");
const ZoomClients = require("../models/zoom-clients");
const axios = require("axios");

module.exports = {
    refreshToken: async (authId, cb) => {
        let authData = await ZoomClients.findOne({_id:authId}).sort({_id:-1});
        console.log(`${config.zoom.clientId}:${config.zoom.clientSecret}`);
        let buff = new Buffer.from(`${config.zoom.clientId}:${config.zoom.clientSecret}`);
        let base64data = buff.toString('base64');
        // console.log(config.zoom,base64data);
        console.log(`https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${authData.refreshToken}`)
        console.log(`Basic ${base64data}`);
        axios({
            method: 'post',
            url:`https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${authData.refreshToken}`,
            headers: {
                'Authorization': `Basic ${base64data}`
            },
        }).then(async function (response) {
            ZoomClients.updateOne({_id:authId}, {$set : {accessToken: response.data.access_token, refreshToken:response.data.refresh_token}},function(err, res) {
                console.log("Zoom Webhook update",err,res);
                cb({accessToken: response.data.access_token, refreshToken:response.data.refresh_token});
            });
        }).catch(function (error) {
            // handle error
            console.log("Error while getting refresh token",error.message);
        });
    }
}