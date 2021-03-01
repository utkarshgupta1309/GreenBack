const ApiUtility = require('../lib/api-utility');
var logger = require('../utils/logger')(module);
var ObjectID = require('mongodb').ObjectID;
var config = require('../config');
const moment = require('moment');
const paginate = require('express-paginate');
const asyncp = require('async');
const request = require('request');
const ZoomClients = require('../models/zoom-clients');
const Zoom = require("../lib/zoom");


async function listMeetings(req, res){
    try {
        let authData = await ZoomClients.findOne({_id:req.params.authId}).sort({_id:-1});
        request.get('https://api.zoom.us/v2/users/me/meetings', (error, response, body) => {
            if (error) {
                console.log('API Response Error: ', error)
            } else {
                body = JSON.parse(body);
                // Display response in console
                // console.log('API call ', body);

                if(body.code == 124){
                    Zoom.refreshToken(req.params.authId, (data) => {
                        return listMeetings(req, res);
                    });
                }
                return res.send(ApiUtility.success(body));
            }
        }).auth(null, null, true, authData.accessToken);
    } catch (error){
        console.log(error);
        return res.send(ApiUtility.failed(error.message));
    }
}

module.exports.listMeetings = listMeetings