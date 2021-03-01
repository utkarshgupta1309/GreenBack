import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import "./app.css";
import Header from "./Header";
import Welcome from "./Welcome";
import Features from "./FeaturesSmall";
import HomeParallax from "./HomeParallax";
import Testimonials from "./Testimonials";
import Pricing from "./PricingPlans";
import Counter from "./Counter";
import Contact from "./Contact";
import Footer from "./Footer";
import FeaturesBig from "./FeaturesBig";
import MyMeetings from "./MyMeetings";
import WidgetCommands from "./WidgetCommands";
import CommandsList from "./CommandsList";
import { Modal, Button } from "react-bootstrap";
import ApiPath from "./ApiPath";
import axios from "axios";

export default class App extends Component {
  state = { username: null, showModal: true };

  componentDidMount() {
    let authId = window.sessionStorage.getItem("authId");
    console.log("Component did mount");
    if (authId) {
      this.setState({
        showModal: false,
        showUploadModal: false,
        attachment: null,
        attachmentName: "",
      });
    }
  }

  uploadTranscriptFile(e) {
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {
      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + " kB",
          base64: reader.result,
          file: file,
        };
        this.setState({
          attachment: fileInfo.base64,
          attachmentName: fileInfo.name,
        });
      };
    }
  }

  sendTranscriptFile = () => {
    if (this.state.attachment) {
      let authId = window.sessionStorage.getItem("authId");
      let url = `${ApiPath.upload_transcript}/${authId}`;
      let body = {
        attachment: this.state.attachment,
        attachmentName: this.state.attachmentName,
      };
      axios.post(url, body).then((response) => {
        console.log(response);
        if (response && response.data && response.data.status == "success") {
          alert("File uploaded successfully");
          this.setState({
            attachment: null,
            showUploadModal: false,
          });
        }
      });
    }
  };

  render() {
    const zoomAuthUrl = ApiPath.zoom_auth_url;
    let authId = window.sessionStorage.getItem("authId");

    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/widget-commands"
              render={(props) => (
                <React.Fragment>
                  <WidgetCommands />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/commands"
              render={(props) => (
                <React.Fragment>
                  <Header />
                  <CommandsList />
                  <Footer />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/my-meetings"
              render={(props) => (
                <React.Fragment>
                  <Header />
                  <MyMeetings />
                  <Footer />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/:authId?"
              render={(props) => {
                if (props.match.params && props.match.params.authId) {
                  authId = props.match.params.authId;
                  window.sessionStorage.setItem("authId", authId);
                  {
                    /* window.location.href = "/widget-commands" */
                  }
                  const from = readQueryParams(props);
                  if (from == 1) {
                    console.log("parameter passed", from, authId);
                  } else window.location.href = "/widget-commands";
                }
                return (
                  <React.Fragment>
                    {/* <Header /> */}
                    <Welcome />
                    {/* <Features />
                  <FeaturesBig />
                  <Testimonials />
                  <Contact />
                  <Footer />*/}
                    {authId ? (
                      <Link to="/my-meetings" className="float">
                        My Meetings
                      </Link>
                    ) : (
                      <a href={zoomAuthUrl} className="float">
                        Connect with Zoom
                      </a>
                    )}

                    {authId && (
                      <button
                        type="button"
                        onClick={() => {
                          this.setState({
                            showUploadModal: true,
                          });
                        }}
                        className="float"
                      >
                        {" "}
                        Upload Transcript{" "}
                      </button>
                    )}
                    <Modal
                      show={this.state.showUploadModal}
                      backdrop="static"
                      keyboard={false}
                      size="md"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header>
                        <Modal.Title>Upload File</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Upload File
                        <input
                          type="file"
                          onChange={this.uploadTranscriptFile.bind(this)}
                          accept="application/pdf"
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            this.setState({
                              showUploadModal: false,
                            });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          variant="primary"
                          onClick={this.sendTranscriptFile}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* <Modal
                    show={this.state.showModal}
                    backdrop="static"
                    keyboard={false}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header>
                      <Modal.Title>Connect with Zoom</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><a href={zoomAuthUrl} className="connect-zoom">
                    Connect with Zoom
                  </a></Modal.Body>
                    <Modal.Footer>
                      {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>  THIS IS NESTED COMMENT/}
                    </Modal.Footer>
                  </Modal> */}
                  </React.Fragment>
                );
              }}
            />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

const readQueryParams = (props) => {
  const {
    location: { search },
  } = props;
  const { temp } = search;
  let query = new URLSearchParams(search);
  let temp2 = query.get("from");
  console.log("temp", temp2, temp, props);
  return temp2;
};
