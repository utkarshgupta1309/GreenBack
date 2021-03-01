import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import { Test } from './FeaturesBig.styles';

class FeaturesBig extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("FeaturesBig will mount");
  };

  componentDidMount = () => {
    console.log("FeaturesBig mounted");
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("FeaturesBig will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("FeaturesBig will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("FeaturesBig did update");
  };

  componentWillUnmount = () => {
    console.log("FeaturesBig will unmount");
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <React.Fragment>
        <div>
          <section
            className="section padding-top-30 padding-bottom-0"
            id="features"
          >
            <div className="container">
              <div className="row">
                <div
                  className="col-lg-5 col-md-12 col-sm-12 align-self-center"
                  data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
                >
                  <img
                    src="assets/images/screen2-12.png"
                    className="rounded img-fluid d-block mx-auto"
                    alt="App"
                  />
                </div>
                <div className="col-lg-1" />
                <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix">
                  <div className="left-heading">
                    {/* <h2 className="section-title">
                      Let’s discuss about your project
                    </h2> */}
                  </div>
                  <div className="left-text">
                    <h1>
                      Spool works with Zoom and it is Simple!.
                       </h1>
                       <h5>
                      > Start your normal Zoom meeting.
                       </h5>
                       <h5>
                         > Our zoom-integrated Spool app allows you to insert Start and Stop Capture commands in your transcripts.
                          </h5>
                        <h5>
                      > You can insert meeting specific commands in the transcript as well
                      using voice commands or by pressing keys with our desktop.
                       </h5>

                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <i className="fa fa-arrow-circle-down arrow-to-left"></i>
                  <div className="hr" />
                </div>
              </div>
            </div>
          </section>
          <section className="section padding-bottom-30">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-bottom-fix">
                  <div className="left-heading">
                    {/* <h2 className="section-title">
                      We can help you to grow your business
                    </h2> */}
                  </div>
                  <div className="left-text">
                    <h1>
                      Spool then extracts knowledge from transcripts.

                    </h1>
                     <h5>
                        > Spool accesses the transcript data in between your commands only.
                        It does NOT read all transcripts.
                     </h5>
                     <h5>
                        > Spool processes ONLY what YOU want us to, by reading only TIMESTAMPS and the COMMANDS
                     </h5>
                     <h5>
                         > Spool captures knowledge and tag it using Machine Learning  and Sentiment Analysis.
                       </h5>
                  </div>
                </div>
                <div className="col-lg-1" />
                <div
                  className="col-lg-5 col-md-12 col-sm-12 align-self-center mobile-bottom-fix-big"
                  data-scroll-reveal="enter right move 30px over 0.6s after 0.4s"
                >
                  <img
                    src="assets/images/screen2-22.png"
                    className="rounded img-fluid d-block mx-auto"
                    alt="App"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <i className="fa fa-arrow-circle-down arrow-to-right"></i>
                  <div className="hr" />
                </div>
              </div>
            </div>
          </section>
          <section className="section padding-top-30 padding-bottom-0">
            <div className="container">
              <div className="row">
                <div
                  className="col-lg-5 col-md-12 col-sm-12 align-self-center"
                  data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
                >
                  <img
                    src="assets/images/screen5-2.png"
                    className="rounded img-fluid d-block mx-auto"
                    alt="App"
                  />
                </div>
                <div className="col-lg-1" />
                <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix">
                  <div className="left-heading">
                    {/* <h2 className="section-title">
                      Let’s discuss about your project
                    </h2> */}
                  </div>
                  <div className="left-text">
                    <h1>
                        A detailed report for each Topic: Sharable and Searchable Knowledge Repo
                    </h1>
                    <h5>
                        > You can view a detailed report for each TAG generated in Overview document
                    </h5>
                    <h5>
                        > Knowledge is categorized based on the topics/tags as well as participants
                    </h5>
                    <h5>
                        > Enjoy hands-free knowledge gathering experience with Spool
                    </h5>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <i className="fa fa-arrow-circle-down arrow-to-left"></i>
                  <div className="hr" />
                </div>
              </div>
            </div>
          </section>
          <section className="section padding-bottom-30">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-bottom-fix">
                  <div className="left-heading">
                    {/* <h2 className="section-title">
                      We can help you to grow your business
                    </h2> */}
                  </div>
                  <div className="left-text">
                    <h1>
                    Share and Manage the knowledge with ease using The Dashboard
                    </h1>
                    <h5>
                    With Spool you can share the knowledge document with ease on your favourite platform
                    </h5>
                  </div>
                </div>
                <div className="col-lg-1" />
                <div
                  className="col-lg-5 col-md-12 col-sm-12 align-self-center mobile-bottom-fix-big"
                  data-scroll-reveal="enter right move 30px over 0.6s after 0.4s"
                >
                  <img
                    src="assets/images/screen5-3.png"
                    className="rounded img-fluid d-block mx-auto"
                    alt="App"
                  />
                </div>
              </div>
              <div className="row">
                  <div className="col-lg-12">
                    <i className="fa fa-arrow-circle-down arrow-to-right"></i>
                    <div className="hr" />
                  </div>
                </div>
            </div>
          </section>

            <section className="section padding-top-30 padding-bottom-0">
                <div className="container">
                  <div className="row">
                    <div
                      className="col-lg-5 col-md-12 col-sm-12 align-self-center"
                      data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
                    >
                      <img
                        src="assets/images/screen5-4.png"
                        className="rounded img-fluid d-block mx-auto"
                        alt="App"
                      />
                    </div>
                    <div className="col-lg-1" />
                    <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix">
                      <div className="left-heading">
                        {/* <h2 className="section-title">
                          Let’s discuss about your project
                        </h2> */}
                      </div>
                      <div className="left-text">
                        <h1>
                          Record the Meeting Anywhere, Anytime
                          </h1>
                          <h5>
                          With Spool you can even record your physical meetings.
                          </h5>
                          <h5>
                            You can access your recording anytime. Also Spool extracts the knowledge form such recordings and shares with you as a document.
                          </h5>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

        </div>
      </React.Fragment>
    );
  }
}

FeaturesBig.propTypes = {
  // bla: PropTypes.string,
};

FeaturesBig.defaultProps = {
  // bla: 'test',
};

export default FeaturesBig;
