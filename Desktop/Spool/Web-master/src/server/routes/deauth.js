const router = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request');
const ZoomClient = require('../models/zoom-clients');

const deleteData =async (payload) => {
    try {
        const user = await ZoomClient.findOneAndDelete({id: payload.user_id});
        if (user === null) {
          console.log("user with given id does not exists");
          throw "User doesnot exists";
        //   res.status(500).send("Could not find the user");
        } else {
          console.log("data deleted");
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error)
    }
    return Promise.resolve("Data deleted");
}

const sendComp = async (payload) => {
    console.log("call to compliance api");
    const options = {
        method: 'POST',
        url: 'https://api.zoom.us/oauth/data/compliance',
        headers: {
            'content-type': 'application/json',
        },
        body: {
            client_id: process.env.ZOOM_API_CLIENT_ID,
            user_id: payload.user_id,
            account_id: payload.account_id,
            deauthorization_event_received: {...payload},
            compliance_completed: true
        },
        json: true
    };
    try {
        const xyz =  await new Promise((resolve,reject) => {
            request.post(options,(error,response,body) => {
                if (error) {
                    console.error(error);
                    // throw new Error(error);
                    // res.status(500).send("Error sending complaince API");
                    throw error;
                }
                console.log(body);
                // console.log(response.statusCode);
                // res.send("deauth API");
                if(response.statusCode === 200){
                    console.log("status code 200");
                    resolve(response.statusCode);
                }
                else{
                    console.log("status code not 200");
                    reject(response.statusCode)
                }
            }).auth(process.env.ZOOM_API_CLIENT_ID,process.env.ZOOM_API_CLIENT_SECRET);
        })

        console.log(xyz);
    } catch (error) {
        console.error(error);
        return Promise.reject(error)
    }
    return Promise.resolve(200);
}

router.post('/',bodyParser.raw({ type: 'application/json' }), async (req,res) => {
    let event;
    console.log("Deauth")
    try {
        event = JSON.parse(req.body);
        // console.log(event);
    } catch (err) {
        console.error("Ewb hook error",err);
        // res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // console.log(req.headers);
    if (req.headers.authorization === process.env.ZOOM_VERIFICATION_TOKEN) {
        // res.status(200);
        // console.log(event.event);
        if (event.event === "app_deauthorized") {
            const payload = event.payload;
            if (payload.user_data_retention === "false") {


                try {
                    await deleteData(payload);
                    await sendComp(payload);
                } catch (error) {
                    console.error(error, "Status 500");
                    res.status(500).send("deauth API");
                    return;
                }

                console.log("checking");
                res.status(200).send("deauth API");
            }
            else  {
                res.status(200).send("deauth API");
            }
        }
        else {
            console.log("event not for app_deauthorization");
            res.status(400).send("event not for app_deauthorization");
        }
    }
    else {
        res.status(403).end('Access forbidden');
        console.log("Invalid Post Request.")
    }
});

module.exports = router;