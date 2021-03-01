import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import { Test } from './FeaturesSmall.styles';

class FeaturesSmall extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("FeaturesSmall will mount");
  };

  componentDidMount = () => {
    console.log("FeaturesSmall mounted");
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("FeaturesSmall will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("FeaturesSmall will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("FeaturesSmall did update");
  };

  componentWillUnmount = () => {
    console.log("FeaturesSmall will unmount");
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <section className="section home-feature">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {/* ***** Features Small Item Start ***** */}
                <div
                  className="col-lg-4 col-md-6 col-sm-6 col-12"
                  data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s"
                >
                  <div className="features-small-item">
                    <div >
                      <i>
                        <img src="assets/images/screen2-1.png" width="90px" alt="" />
                      </i>
                    </div>
                    <h5 className="features-title">Hands-off knowledge capture experience.</h5>

                  </div>
                </div>
                {/* ***** Features Small Item End ***** */}
                {/* ***** Features Small Item Start ***** */}
                <div
                  className="col-lg-4 col-md-6 col-sm-6 col-12"
                  data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s"
                >
                  <div className="features-small-item">
                    <div >
                      <i>
                        <img src="assets/images/screen2-2.png" width="90px" alt="" />
                      </i>
                    </div>
                    <h5 className="features-title">No security or privacy concerns.  </h5>
                    <p>
                    </p>
                  </div>
                </div>
                {/* ***** Features Small Item End ***** */}
                {/* ***** Features Small Item Start ***** */}
                <div
                  className="col-lg-4 col-md-6 col-sm-6 col-12"
                  data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s"
                >
                  <div className="features-small-item">
                    <div >
                      <i>
                        <img src="assets/images/screen2-3.png" width="95px" alt="" />
                      </i>
                    </div>
                    <h5 className="features-title">Real-time, automated and smart knowledge updates.</h5>
                    <p>

                    </p>
                  </div>
                </div>
                {/* ***** Features Small Item End ***** */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

FeaturesSmall.propTypes = {
  // bla: PropTypes.string,
};

FeaturesSmall.defaultProps = {
  // bla: 'test',
};

export default FeaturesSmall;
