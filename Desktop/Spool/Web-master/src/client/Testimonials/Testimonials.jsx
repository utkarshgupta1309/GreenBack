import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import { Test } from './Testimonials.styles';

class Testimonials extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("Testimonials will mount");
  };

  componentDidMount = () => {
    console.log("Testimonials mounted");
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("Testimonials will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("Testimonials will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("Testimonials did update");
  };

  componentWillUnmount = () => {
    console.log("Testimonials will unmount");
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <section className="section" id="testimonials">
        <div className="container">
          {/* ***** Section Title Start ***** */}
          <div className="row">
            <div className="col-lg-12">
              <div className="center-heading">
                <h2 className="section-title">What do they say?</h2>
              </div>
            </div>
            <div className="offset-lg-3 col-lg-6">
              <div className="center-text">
               <div className="user-image">
                   <img src="assets/images/zoom-logo.png"  width="90px" alt="" />
                 </div>
                <h4 className="features-title">
                ZOOM is our business and tech support partner.
                 </h4>

                 <h4 className="features-title">
                So far we have received 5 Letter of Intents from our future customers below.
                </h4>
              </div>
            </div>
          </div>
          {/* ***** Section Title End ***** */}
          <div className="row">
            {/* ***** Testimonials Item Start ***** */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="team-item">
                <div className="team-content">
                  <i>
                    <img src="assets/images/testimonial-icon.png" alt="" />
                  </i>
                  <p>
                    Signal Ocean Ltd,
                    WeWork Moorgate,
                    1 Fore Street London
                    EC2Y 9DT,
                    United Kingdom.
                  </p>
                  <div className="user-image">
                    <img src="http://placehold.it/60x60" alt="" />
                  </div>
                  <div className="team-info">
                    <h3 className="user-name">Nancy Dandolos</h3>
                    <span>Customer Success Manager </span>
                  </div>
                </div>
              </div>
            </div>
            {/* ***** Testimonials Item End ***** */}
            {/* ***** Testimonials Item Start ***** */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="team-item">
                <div className="team-content">
                  <i>
                    <img src="assets/images/testimonial-icon.png" alt="" />
                  </i>
                  <p>
                    Carge Private Company,
                    Pan. Michali and Nafpaktias, 19010 - Saronikos, Greece.
                  </p>
                  <div className="user-image">
                    <img src="http://placehold.it/60x60" alt="" />
                  </div>
                  <div className="team-info">
                    <h3 className="user-name">Eleftherios Karabatsakis</h3>
                    <span>Co-founder and CEO</span>
                  </div>
                </div>
              </div>
            </div>
            {/* ***** Testimonials Item End ***** */}
            {/* ***** Testimonials Item Start ***** */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="team-item">
                <div className="team-content">
                  <i>
                    <img src="assets/images/testimonial-icon.png" alt="" />
                  </i>
                  <p>
                    Learnworlds,
                    71-75, Shelton Street, Covent Garden,
                    London, WC2H 9JQ, United Kingdom.
                  </p>
                  <div className="user-image">
                    <img src="http://placehold.it/60x60" alt="" />
                  </div>
                  <div className="team-info">
                    <h3 className="user-name">Antonis Askianiakis</h3>
                    <span>Senior Account Executive</span>
                  </div>
                </div>
              </div>
            </div>
            {/* ***** Testimonials Item End ***** */}

            {/* ***** Testimonials Item Start ***** */}
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="team-item">
                            <div className="team-content">
                              <i>
                                <img src="assets/images/testimonial-icon.png" alt="" />
                              </i>
                              <p>
                                Wizz IT SA,
                                35, Vas. Mela Street, Holargos,
                                Athens, GR-15562, Greece.
                              </p>
                              <div className="user-image">
                                <img src="http://placehold.it/60x60" alt="" />
                              </div>
                              <div className="team-info">
                                <h3 className="user-name">Andreas Kolokythas</h3>
                                <span>Chief Executive Executive</span>
                              </div>
                            </div>
                          </div>
            </div>
            {/* ***** Testimonials Item End ***** */}



          </div>
        </div>
      </section>
    );
  }
}

Testimonials.propTypes = {
  // bla: PropTypes.string,
};

Testimonials.defaultProps = {
  // bla: 'test',
};

export default Testimonials;
