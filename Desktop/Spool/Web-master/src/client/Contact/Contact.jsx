import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import { Test } from './Contact.styles';

class Contact extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("Contact will mount");
  };

  componentDidMount = () => {
    console.log("Contact mounted");
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("Contact will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("Contact will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("Contact did update");
  };

  componentWillUnmount = () => {
    console.log("Contact will unmount");
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <section className="section colored" id="contact-us">
        <div className="container">
          {/* ***** Section Title Start ***** */}
          <div className="row">
            <div className="col-lg-12">
              <div className="center-heading">
                <h2 className="section-title">Talk To Us</h2>
              </div>
            </div>
            <div className="offset-lg-3 col-lg-6">
              <div className="center-text">
                <p>
                  Maecenas pellentesque ante faucibus lectus vulputate
                  sollicitudin. Cras feugiat hendrerit semper.
                </p>
              </div>
            </div>
          </div>
          {/* ***** Section Title End ***** */}
          <div className="row">
            {/* ***** Contact Text Start ***** */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <h5 className="margin-bottom-30">Keep in touch</h5>
              <div className="contact-text">
                <p>
                  110-220 Quisque diam odio, maximus ac consectetur eu, 10260
                  <br />
                  auctor non lorem
                </p>
                <p>
                  You are NOT allowed to re-distribute Softy Pinko template on
                  any template collection websites. Thank you.
                </p>
              </div>
            </div>
            {/* ***** Contact Text End ***** */}
            {/* ***** Contact Form Start ***** */}
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="contact-form">
                <form id="contact" action method="get">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="name"
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Full Name"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="E-Mail Address"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <textarea
                          name="message"
                          rows={6}
                          className="form-control"
                          id="message"
                          placeholder="Your Message"
                          required
                          defaultValue={""}
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="main-button"
                        >
                          Send Message
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Contact.propTypes = {
  // bla: PropTypes.string,
};

Contact.defaultProps = {
  // bla: 'test',
};

export default Contact;
