const baseUrl = "http://localhost:8080";
// const baseUrl = "http://3.7.53.241:8080";

let apiPath = {
    list_meetings: baseUrl + "/list-meetings",
    upload_transcript: baseUrl + "/upload-transcript",
    upload_commands: baseUrl + "/upload-commands",
    socket_url:'ws://localhost:8080',
    zoom_auth_url: "http://5e877f5b920a.ngrok.io/connect?from=1",// use this if you want to redirect (this gives ssl error use ngrok instead)
    // zoom_auth_url: "http://localhost:8080/connect",// use this if you do not want to redirect (this gives ssl error use ngrok instead)
}

export default apiPath;