require('dotenv').config();
const deauthRoute = require('./routes/deauth');
const express = require('express');
var cors = require('cors')
const request = require('request');
const os = require('os');
const db = require('./db');
const ZoomClient = require("./models/zoom-clients");
const UserMeeting = require("./models/user-meetings");
const userController = require("./controllers/user-controller");
const bodyParser = require('body-parser');
const rp = require('request-promise');
const ApiUtility = require('./lib/api-utility');
const fs = require("fs");
const config = require("./config");
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var path = path = require('path');
const https = require('follow-redirects').https;
const Zoom = require("./lib/zoom");
const { getDocxFile } = require('./utils/getDocx');
const ws = require('ws');
// I'm maintaining all active connections in this object
const clients = {};

var varGlobal = '';
var starttimeGlobal = '';
var commandsGlobla = '';
var UUIDAarray = [];
const app = express();

app.use(cors())


app.use("/deauth",deauthRoute)
//app.use(express.static('SpoolFront'));
//app.use(express.static('assets'));

function fileProcess(inFile, outFile, arg1, arg2, commands, recTime, callback) {
        //console.log(inFile + " 1*******************" + outFile);
           if(commands == null || commands.length <= 2) {
                  console.log("in voice commands ***");
                  var child = require('child_process').exec("java TextProcDocx " + '\"'+ inFile + '\" '
                                                               + '\"' + outFile + '\" '
                                                               + '\"' + arg1 + '\" '
                                                               + '\"' + arg2 + '\" ')

            }
            else {
                //console.log("Start OF fileProcess @@@@@@@@@@@@@@@@@@@@@@@");
                console.log("java WidgetTextProc " + '\"'+ inFile + '\" '
                                      + '\" ' + commands + '\" '
                                       + '\"' + arg1 + '\" '
                                       + '\"' + arg2 + '\" '
                                        + '\"' + recTime + '\" ');
                var child = require('child_process').exec("java WidgetTextProc " + '\"'+ inFile + '\" '
                                                                              + '\" '  + commands + '\" '
                                                                               + '\"' + arg1 + '\" '
                                                                               + '\"' + arg2 + '\" '
                                                                                + '\"' + recTime + '\" ')
            	}

            child.stdout.pipe(process.stdout)
              child.on('exit', function() {
                callback();
              })

           //console.log("eND OF fileProcess @@@@@@@@@@@@@@@@@@@@@@@");

   }


function fileProcess2(inFile, outFile, arg1, arg2, callback) {

      console.log(inFile + "2*******************" + outFile);

          var child = require('child_process').exec("java TextProc " + '\"'+ inFile + '\" '
                                                       + '\"' + outFile + '\" '
                                                       + '\"' + arg1 + '\" '
                                                       + '\"' + arg2 + '\" ')
          child.stdout.pipe(process.stdout)
          child.on('exit', function() {
            callback();
          })

       console.log("after child evoked, before callback 2*******************");
   }

function uploadTranscript(req, res){
let event = JSON.parse(req.body);
    // Remove header
    let attachmentString = event.attachment;
    const type = attachmentString.substring(attachmentString.indexOf('/') + 1, attachmentString.indexOf(';base64'));
    let base64Attachment = attachmentString.split(';base64,').pop();
    //console.log("Type",type);
    //console.log(attachmentString + '***' + type + '****' + base64Attachment);
    let fileName = 'Knowledge_Doc_' + `${new Date().getTime()}`
    //let fileName = attachmentString + `${new Date().getTime()}.${type}`

    /////modified part below
    console.log(req.params.authId);
    !fs.existsSync(path.join(__dirname,`../../public/user-uploads/${req.params.authId}`)) &&
        fs.mkdirSync(path.join(__dirname,`../../public/user-uploads/${req.params.authId}`), { recursive: true });
    let filePath = path.join(__dirname,`../../public/user-uploads/${req.params.authId}/${fileName}`);

    let outfilepath = filePath + '.docx';
    //console.log("****** 111" + fileName);
    //console.log("****** 111" + filePath);
    fs.writeFile( `${filePath}`, base64Attachment, {encoding: 'base64'}, async function(err) {
        console.log(err);
        let authData = await ZoomClient.findById(req.params.authId).sort({_id:-1});
        var transporter = nodemailer.createTransport({
            service: config.smtp.service,
            auth: {
              user: config.smtp.username,
              pass: config.smtp.password
            }
          });
          if(config.smtp.service == "SendGrid"){
            transproter = nodemailer.createTransport(sgTransport({
                auth: {
                    api_key: config.smtp.password,
                },
            }));
          }

          //*** Instead of Meeting ID, get records based on User ID and Time from
           // file name ****
           let attachmentName = event.attachmentName;
           let time_r = attachmentName.substring(3,7) + '-' +
                            attachmentName.substring(7,9) + '-' +
                            attachmentName.substring(9,11) + 'T' +
                            attachmentName.substring(12,14) + ':' +
                            attachmentName.substring(14,16) + ':' +
                            attachmentName.substring(16,18)+ 'Z';
           //time_r = '2021-02-08T04:46:06Z';
           let commands_u = '';
           //let time_r = '';
          let userMeeting = await UserMeeting.findOne({host_id:authData.id, recording_start_time:time_r});
          if(userMeeting != null ) {
              commands_u = userMeeting.commands;
              //time_r = userMeeting.recording_start_time
          }
          console.log(commands_u); //string for java
          console.log(time_r); //rec start time for java
          console.log(authData.id);

          fileProcess(filePath, filePath + '.txt', ' Knowledge Document', ' ',
                commands_u, time_r, async function() {

               try {
                       await getDocxFile(filePath + '.txt',outfilepath);
                   } catch (error) {
                       console.error(error);
                   }

                  var mailOptions = {
                    from: config.smtp.fromEmail,
		            to: 'devalbhamare1@gmail.com',
                    //to: authData.email,
                    subject: 'Knowledge Document for ' + authData.email,
                    html: '<h1>Welcome</h1><p>That was easy!</p>',
                    attachments: [
                        {   // file on disk as an attachment
                            filename: fileName+'.docx',
                            path: outfilepath // stream this file
                        },
                    ]
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                      return res.send(ApiUtility.success({}));
                    }
                  });
            }) //call to JAVA function

    });
}

module.exports.uploadTranscript = uploadTranscript


async function uploadCommands(req, res){
    //console.log("*****************  MEETING ENDED 5")
    let body = JSON.parse(req.body);
    // Remove header

    let authData = await ZoomClient.findById(req.params.authId).sort({_id:-1});
    if(authData){
        var meetingId = body.meeting_id;
        var userMeetingData =  {
            authId:authData._id,
            commands:body.commands
        }


        UserMeeting.findOneAndUpdate({ meeting_id:meetingId, uuid: body.uuid },{ $set: userMeetingData},{ upsert: true }).then(async (doc, err) => {
            console.log("Saved Doc",doc);
            return res.send(ApiUtility.success({}));
        })
        commandsGlobla = body.commands;
        console.log("######## 11111111111" + body.commands);

        ////////////////////////////////////////////////////////////////////////////
        /////////////// JUST FOR TESTING //////////////////////////////////////////
         /**********************
                    let topic = 'MyTEst Topic';
                     let time = '11/11/2011';
                    //if(userMeeting.commands == null || userMeeting.commands.length == 0) {
                    let fileName = 'SpoolInternalDiscussions_2021-02-08T111111Z';
                     let sendFileName =  fileName +'.docx';
                     let filePath = path.join(__dirname,`../../public/recordings/${fileName}`);
                     let outfilepath = filePath + '.docx';
                     let recTime = '';

                     let userMeeting = await UserMeeting.findOne({meeting_id:varGlobal});
                     console.log("****** 22222222 * " + userMeeting.commands) //string for java
                     console.log("****** 333333333 * " + userMeeting.recording_start_time) //rec start time for java
                     console.log("****** 4444444 * " + starttimeGlobal);
                     console.log("****** 55555555 * " + commandsGlobla);
                     fileProcess(filePath, filePath + '.txt', topic, time, commandsGlobla, starttimeGlobal, async function() {

                    try {
                            console.log("Just before GetDocx call !!!!!!!!!!!!!");
                           await getDocxFile(filePath + '.txt', outfilepath);
                       } catch (error) {
                           console.error(error);
                       }
                        var transporter = nodemailer.createTransport({
                            service: config.smtp.service,
                            auth: {
                            user: config.smtp.username,
                            pass: config.smtp.password
                            }
                        });

                        if(config.smtp.service == "SendGrid"){
                            transproter = nodemailer.createTransport(sgTransport({
                                auth: {
                                    api_key: config.smtp.password,
                                },
                            }));
                          }

                        var mailOptions = {
                            from: config.smtp.fromEmail,
                            to: 'devalbhamare1@gmail.com',
                            subject: 'Your transcript is ready to download',
                            html: '<h1>Welcome</h1><p>That was easy!</p>',
                            attachments: [
                                {   // file on disk as an attachment
                                    filename: sendFileName,
                                    path: outfilepath // stream this file
                                },
                            ]
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                            console.log(error);
                            } else {
                            console.log('Email sent: ' + info.response);
                            return res.send(ApiUtility.success({}));
                            }
                        });

                     })//Get the results of Function A
                     *******************/
        /////////////// END JUST FOR TEST ///////////////////////////////////////
    }
}

module.exports.uploadCommands = uploadCommands

async function zoomWebhook(req, res){
    let event;

    try {
        event = JSON.parse(req.body);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Check to see if you received the event or not.
    // console.log(event)
    if (req.headers.authorization === process.env.ZOOM_VERIFICATION_TOKEN) {
        res.status(200);
        res.send();

        console.log(`Zoom Webhook Recieved.`)
        console.log(JSON.stringify(event));
        if(event.event == "meeting.ended"){
            //Send message to websocket here
            //console.log("*****************  MEETING ENDED 1")
            let authData = await ZoomClient.findOne({id:event.payload.object.host_id}).sort({_id:-1});
            if(authData){
                //console.log("*****************  MEETING ENDED 2")
                var uuid = event.payload.object.uuid;
                var meetingTopic = event.payload.object.topic;
                var meetingId = event.payload.object.id;
                if(clients[authData._id]){
                    //console.log("*****************  MEETING ENDED 3")
                    console.log("Sending Data to socket -> ",authData._id)
                    let clientConnetion = clients[authData._id];

                    clientConnetion.send(JSON.stringify({event:"meeting.ended",meeting_id:meetingId, uuid:uuid}))
                    //console.log("*****************  MEETING ENDED 4")
                    varGlobal = event.payload.object.id;
                }
            }
        }
        if(event.event == "recording.started"){
            let authData = await ZoomClient.findOne({id:event.payload.object.host_id}).sort({_id:-1});
            if(authData){
                var uuid = event.payload.object.uuid;
                var meetingTopic = event.payload.object.topic;
                var meetingId = event.payload.object.id;
                var time = event.payload.object.recording_file.recording_start;
                console.log("#################", time )
                var userMeetingData =  {
                    //recording_start_time:`${new Date()}`
                    recording_start_time: time
                }

                UserMeeting.findOneAndUpdate({ meeting_id:meetingId, uuid:uuid },{ $set: userMeetingData},{ upsert: true }).then(async (doc, err) => {
                    console.log("Saved Doc",doc);
                })
            }
        }
        if(event.event == "meeting.started"){
            let authData = await ZoomClient.findOne({id:event.payload.object.host_id}).sort({_id:-1});
            if(authData){
                var uuid = event.payload.object.uuid;
                var meetingTopic = event.payload.object.topic;
                var meetingId = event.payload.object.id;
                starttimeGlobal = event.payload.object.start_time;

                var userMeetingData =  {
                    authId:authData._id,
                    topic:meetingTopic,
                    uuid:uuid,
                    meeting_id:meetingId,
                    start_time:event.payload.object.start_time,
                    timezone:event.payload.object.timezone,
                    duration:event.payload.object.duration,
                    host_id:event.payload.object.host_id,
                    type:event.payload.object.type
                }
                console.log(userMeetingData);

                UserMeeting.findOneAndUpdate({ meeting_id:meetingId, uuid:uuid },{ $set: userMeetingData},{ upsert: true }).then(async (doc, err) => {
                    console.log("Saved Doc ***",doc);
                })
            }
        }
        if(event.event == 'recording.transcript_completed' ){
            console.log(JSON.stringify(event.payload));
            var uuid = event.payload.object.uuid;
            var meetingTopic = event.payload.object.topic;
            var meetingTime = event.payload.object.start_time;
            //Double encode the uuid for validation incase it contains slashes
            var euuid = encodeURIComponent(encodeURIComponent(uuid));
            console.log(euuid);
            /*if(event.payload.object.recording_files.length > 0){
                for(const recording of event.payload.object.recording_files){
                    if(recording.file_type && recording.file_type == "TRANSCRIPT"){
                        let fileName = `${meetingTopic}_${meetingId}.vtt`;
                        fileName = fileName.replace(/[&\/\\#,+()$~%.'":* ?<>{}]/g, '');
                        let filePath = path.join(__dirname,`../../public/recordings/${fileName}`);
                        const recordingFile = fs.createWriteStream(filePath);
                        //console.log(recording.download_url+"?access_token="+authData.accessToken);
                        let authData = await ZoomClient.findOne({id:event.payload.object.host_id}).sort({_id:-1});
                        if(authData){
                            console.log("*********************************");
                            console.log(recording.download_url);
                            console.log(authData.accessToken);
                            console.log(recording.download_url+"?access_token="+authData.accessToken);
                            console.log("*********************************");
                            const request = https.get(recording.download_url+"?access_token="+authData.accessToken,function(response){
                                response.pipe(recordingFile);
                                recordingFile.on("finish", function() {
                                    var transporter = nodemailer.createTransport({
                                        service: config.smtp.service,
                                        auth: {
                                        user: config.smtp.username,
                                        pass: config.smtp.password
                                        }
                                    });

                                    if(config.smtp.service == "SendGrid"){
                                        transproter = nodemailer.createTransport(sgTransport({
                                            auth: {
                                                api_key: config.smtp.password,
                                            },
                                        }));
                                    }

                                    var mailOptions = {
                                        from: config.smtp.fromEmail,
                                        to: authData.email,
                                        subject: 'Your transcript is ready to download',
                                        html: '<h1>Welcome</h1><p>That was easy!</p>',
                                        attachments: [
                                            {   // file on disk as an attachment
                                                filename: fileName,
                                                path: filePath // stream this file
                                            },
                                        ]
                                    };
        
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                        console.log(error);
                                        } else {
                                        console.log('Email sent: ' + info.response);
                                        return res.send(ApiUtility.success({}));
                                        }
                                    });
                                    
                                    console.log("stream finished")
                                    recordingFile.close(function(){
                                        console.log("stream closed")
                                    })
                                })
                            }).on('error',function(err){
                                console.log("File Downloading Error",err)
                            })
                        }
                    }
                }
            }*/

            //cloud API Start ******
            try {
                let authData = await ZoomClient.findOne({id:event.payload.object.host_id}).sort({_id:-1});
                if(authData){

                    var meetingId = event.payload.object.id;

                    //*** Instead of Meeting ID, get records based on MEETING UUID ****
                     let commands_u = '';
                     let time_r = '';
                    let userMeeting = await UserMeeting.findOne({meeting_id:meetingId, uuid:event.payload.object.uuid});
                      if(userMeeting != null ) {
                            commands_u = userMeeting.commands;
                            time_r = userMeeting.recording_start_time
                       }
                    console.log(commands_u) //string for java
                    console.log(time_r) //rec start time for java


                    request.get(`https://api.zoom.us/v2/meetings/${euuid}/recordings`, (error, response, body) => {
                        if (error) {
                            console.log('API Response Error: ', error)
                        } else {
                            body = JSON.parse(body);
                            if(body.code == 124){
                                console.log("Got 124", body.code)
                                Zoom.refreshToken(authData._id, (data) => {
                                    return zoomWebhook(req, res);
                                });
                            } else {
                            // Display response in console
                            // console.log('API call 2', body);

                            // console.log(body.recording_files);
                            if(body.recording_files.length > 0){
                                for(const recording of body.recording_files){
                                    if(recording.file_type && recording.file_type == "TRANSCRIPT"){
                                        let fileName = `${meetingTopic}_${meetingTime}`; //.vtt
                                        fileName = fileName.replace(/[&\/\\#,+()$~%.'":* ?<>{}]/g, '');
                                        let filePath = path.join(__dirname,`../../public/recordings/${fileName}`);

                                        let TmpfileName = 'Spool-ZoomInternalTest_2021-02-05T120920Z';
                                        TmpfileName = TmpfileName.replace(/[&\/\\#,+()$~%.'":* ?<>{}]/g, '');
                                        let TmpfilePath = path.join(__dirname,`../../public/recordings/${TmpfileName}`);

                                        const recordingFile = fs.createWriteStream(filePath);
                                        //console.log(recording.download_url+"?access_token="+authData.accessToken);
                                        const request = https.get(recording.download_url+"?access_token="+authData.accessToken,function(response){
                                        response.pipe(recordingFile);
                                        recordingFile.on("finish", function() {
                                        let topic = body.topic;
                                         let time = body.start_time;
                                             //if(userMeeting.commands == null || userMeeting.commands.length == 0) {
                                                 let sendFileName = fileName+'.docx';
                                                 let outfilepath = filePath + '.docx';
                                                 let Tmpoutfilepath = TmpfilePath + '.docx';
                                                 console.log("****** " + fileName);
                                                 console.log("****** " + outfilepath);
                                               //fileProcess(TmpfilePath, TmpfilePath + '.txt', topic, time, userMeeting.commands, userMeeting.recording_start_time, async function() {
                                               fileProcess(filePath, filePath + '.txt', topic, time, commands_u, time_r, async function() {

                                                try {
                                                       //console.log("Calling  getDocxFile NOW*******************");
                                                       //await getDocxFile(TmpfilePath + '.txt',Tmpoutfilepath);
                                                       await getDocxFile(filePath + '.txt',outfilepath);
                                                   } catch (error) {
                                                       console.error(error);
                                                   }
                                                    var transporter = nodemailer.createTransport({
                                                        service: config.smtp.service,
                                                        auth: {
                                                        user: config.smtp.username,
                                                        pass: config.smtp.password
                                                        }
                                                    });

                                                    if(config.smtp.service == "SendGrid"){
                                                        transproter = nodemailer.createTransport(sgTransport({
                                                            auth: {
                                                                api_key: config.smtp.password,
                                                            },
                                                        }));
                                                      }

                                                    var mailOptions = {
                                                        from: config.smtp.fromEmail,
                                                        //to: authData.email,
                                                        to: 'devalbhamare1@gmail.com',
                                                        subject: 'Your transcript is ready to download',
                                                        html: '<h1>Welcome</h1><p>That was easy!</p>',
                                                        attachments: [
                                                            {   // file on disk as an attachment
                                                                filename: sendFileName,
                                                                path: outfilepath // stream this file
                                                            },
                                                        ]
                                                    };

                                                    transporter.sendMail(mailOptions, function(error, info){
                                                        if (error) {
                                                        console.log(error);
                                                        } else {
                                                        console.log('Email sent: ' + info.response);
                                                        return res.send(ApiUtility.success({}));
                                                        }
                                                    });

                                                    console.log("stream finished")
                                                    recordingFile.close(function(){
                                                        console.log("stream closed")
                                                    })
                                                 })//Get the results of Function A
                                             //} //IF Widget string empty
                                            // else {

                                            // 	} //IF Widget string NOT empty
                                        }) //RECORDING FILE FINISH

                                        }).on('error',function(err){
                                            console.log("File Downloading Error",err)
                                        })
                                    }
                                }
                            }
                            }
                        }
                    }).auth(null, null, true, authData.accessToken);
                }
            } catch (error){
                console.log(error);
                //return res.send(ApiUtility.failed(error.message));
            }

        }
    } else {
        res.status(403).end('Access forbidden');
        console.log("Invalid Post Request.")
    }
}

module.exports.zoomWebhook = zoomWebhook

app.get("/list-meetings/:authId", userController.listMeetings);
app.post("/upload-transcript/:authId", bodyParser.raw({ type: 'application/json' }), this.uploadTranscript)

app.post("/upload-commands/:authId", bodyParser.raw({ type: 'application/json' }), this.uploadCommands)

app.get('/connect', (req, res) => {
    console.log(`111111111111111111111111111111111`)
    let redirectUrl = "http" + '://' + req.get('host') + "/connect";
    //let redirectUrl = "http://d5ffa5806a29.ngrok.io/connect";
    console.log(redirectUrl);
    // Step 1:
    // Check if the code parameter is in the url
    // if an authorization code is available, the user has most likely been redirected from Zoom OAuth
    // if not, the user needs to be redirected to Zoom OAuth to authorize

    let from;
    if (req.query.from) {
        from = req.query.from;
        console.log("from",from);
        // redirectUrl = "https://84248aa6a1bc.ngrok.io/connect?from=1";
        redirectUrl = redirectUrl + "?from=1"
        console.log(redirectUrl);
    }

    if (req.query.code) {

        // Step 3:
        // Request an access token using the auth code

        let url = 'https://zoom.us/oauth/token?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=' + redirectUrl;

        request.post(url, (error, response, body) => {

            // Parse response to JSON
            body = JSON.parse(body);

            // Logs your access and refresh tokens in the browser
            console.log(`access_token: ${body.access_token}`);
            console.log(`refresh_token: ${body.refresh_token}`);

            if (body.access_token) {
                let accessToken = body.access_token;
                let refreshToken = body.refresh_token;
                // Step 4:
                // We can now use the access token to authenticate API calls

                // Send a request to get your user information using the /me context
                // The `/me` context restricts an API call to the user the token belongs to
                // This helps make calls to user-specific endpoints instead of storing the userID

                request.get('https://api.zoom.us/v2/users/me', (error, response, body) => {
                    if (error) {
                        console.log('API Response Error: ', error)
                    } else {
                        let zoomClientData;
                        ////for test
                       //fileProcess2("public\\recordings\\t2.vtt", "public\\recordings\\t21.rtf", "Spool-test", "27-12-20", function() {
                       //         console.log("Call back called *****");
                       //})


                        body = JSON.parse(body);
                        // Display response in console
                        console.log('API call **************', body);
                         zoomClientData =  {
                            id:body.id,
                            firstName:body.first_name,
                            lastName:body.last_name,
                            email:body.email,
                            pmi:body.pmi,
                            timezone:body.timezone,
                            profilePic:body.pic_url,
                            accessToken:accessToken,
                            refreshToken:refreshToken,
                            updatedAt:new Date()
                        }

                        ZoomClient.findOneAndUpdate({ id:body.id },{ $set: zoomClientData},{ upsert: true }).then(async (doc, err) => {
                            let doc2 = await ZoomClient.findOne({ id:body.id });

                                console.log("Saved Doc",doc2);
                                if (from) {
                                    return res.send(`
                                    <script>
                                        window.location.href = "${process.env.FRONT_BASE_URL}/${doc2._id}?from=${from}";
                                    </script>`);
                                }
                                return res.send(`
                                <script>
                                    window.location.href = "${process.env.FRONT_BASE_URL}/${doc2._id}";
                                </script>`);
                        })
                    }
                }).auth(null, null, true, body.access_token);

            } else {
                // Handle errors, something's gone wrong!
            }

        }).auth(process.env.ZOOM_API_CLIENT_ID, process.env.ZOOM_API_CLIENT_SECRET);

        return;
    }

    // Step 2: 
    // If no authorization code is available, redirect to Zoom OAuth to authorize
    res.redirect('https://zoom.us/oauth/authorize?response_type=code&client_id=' + process.env.ZOOM_API_CLIENT_ID + '&redirect_uri=' + redirectUrl)
})

app.get('/refresh-token/:authId', (req, res) => {
    Zoom.refreshToken(req.params.authId, (data) => {
        return res.status(200).end('Done');
    });
})

// Set up a webhook listener for your Webhook Event - in this case we are listening to Webinar Ended event but you can add any events of your choice.
app.post('/zoom-notify', bodyParser.raw({ type: 'application/json' }), this.zoomWebhook);

db.ready.then(() => {
    const wsServer = new ws.Server({ noServer: true });

    wsServer.on('connection', (connection, request) => {
        //get authId from connection url
        var userID = request.url.replace("/","");

        console.log('connected: ' + userID);
        // You can rewrite this part of the code to accept only the requests from allowed origin
        clients[userID] = connection;
        connection.send(JSON.stringify({event:"welcome"}));

        connection.on('message', message => {
            console.log('received from ' + userID + ': ' + message)
            console.log("New Message on Socket",message.toString())
            if (message.type === 'utf8') {
                const dataFromClient = JSON.parse(message.utf8Data);
                console.log(dataFromClient);
            }
        });
        connection.on('close', function () {
            delete clients[userID]
            console.log('deleted connection: ' + userID)
        })
    });
    const server = app.listen(process.env.APP_PORT || 8080, () => {
        console.log(`Listening on port ${process.env.APP_PORT || 8080}!`);
    })
    server.on('upgrade', (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, socket => {
          wsServer.emit('connection', socket, request);
        });
    });
})
