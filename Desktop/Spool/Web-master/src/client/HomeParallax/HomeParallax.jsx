import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import { Test } from './HomeParallax.styles';

class HomeParallax extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("HomeParallax will mount");
  };

  componentDidMount = () => {
    console.log("HomeParallax mounted");
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("HomeParallax will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("HomeParallax will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("HomeParallax did update");
  };

  componentWillUnmount = () => {
    console.log("HomeParallax will unmount");
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <section className="mini" id="work-process">
        <div className="mini-content">
          <div className="container">
            <div className="row">
              <div className="offset-lg-3 col-lg-6">
                <div className="info">
                  <h1>Beta Process</h1>
                  {/* <p>
                    Aenean nec tempor metus. Maecenas ligula dolor, commodo in
                    imperdiet interdum, vehicula ut ex. Donec ante diam.
                  </p> */}
                </div>
              </div>
            </div>
            {/* ***** Mini Box Start ***** */}
            <div className="row">
              <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                <a href="#" className="mini-box">
                  <i>
                    <img src="assets/images/screen-6/I6-1.jpg" width="35px" className="mini-box-image" alt="" />
                  </i>
                  <strong>Integration with zoom</strong>
                  {/* <span>Godard pabst prism fam cliche.</span> */}
                </a>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                <a href="#" className="mini-box">
                  <i>
                    <img src="assets/images/screen-6/I6-2.jpg" width="35px" alt="" />
                  </i>
                  <strong>Sharing with Emails</strong>
                  {/* <span>Godard pabst prism fam cliche.</span> */}
                </a>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                <a href="#" className="mini-box">
                  <i>
                    <img src="assets/images/screen-6/I6-3.jpg" width="35px" alt="" />
                  </i>
                  <strong>Voice commands</strong>
                  {/* <span>Godard pabst prism fam cliche.</span> */}
                </a>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                <a href="#" className="mini-box">
                  <i>
                    <img src="assets/images/screen-6/I6-4.jpg" width="35px" alt="" />
                  </i>
                  <strong>
                          Intelligent Knowledge Extraction
                          and Tagging using Machine
                          Learning and Sentiment Analysis
                  </strong>
                  {/* <span>Godard pabst prism fam cliche.</span> */}
                </a>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                <a href="#" className="mini-box">
                  <i>
                    <img src="assets/images/screen-6/I6-5.jpg" width="35px" alt="" />
                  </i>
                  <strong>LOIs and Collaboration with 4 companies</strong>
                  {/* <span>Godard pabst prism fam cliche.</span> */}
                </a>
              </div>
              {/* <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                <a href="#" className="mini-box">
                  <i>
                    <img src="assets/images/screen-6/I6-6.jpg" width="35px" alt="" />
                  </i>
                  <strong>Desktop app to insert commands with key-press</strong>
                  <span>Godard pabst prism fam cliche.</span>
                </a>
              </div> */}
            </div>
            {/* ***** Mini Box End ***** */}
          </div>
        </div>
      </section>
    );
  }
}

HomeParallax.propTypes = {
  // bla: PropTypes.string,
};

HomeParallax.defaultProps = {
  // bla: 'test',
};

export default HomeParallax;
