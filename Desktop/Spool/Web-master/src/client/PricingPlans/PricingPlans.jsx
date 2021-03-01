import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import { Test } from './PricingPlans.styles';

class PricingPlans extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("PricingPlans will mount");
  };

  componentDidMount = () => {
    console.log("PricingPlans mounted");
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("PricingPlans will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("PricingPlans will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("PricingPlans did update");
  };

  componentWillUnmount = () => {
    console.log("PricingPlans will unmount");
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <section className="section colored" id="pricing-plans">
        <div className="container">
          {/* ***** Section Title Start ***** */}
          <div className="row">
            <div className="col-lg-12">
              <div className="center-heading">
                <h2 className="section-title">Pricing Plans</h2>
              </div>
            </div>
            <div className="offset-lg-3 col-lg-6">
              <div className="center-text">
                <p>
                  Donec vulputate urna sed rutrum venenatis. Cras consequat
                  magna quis arcu elementum, quis congue risus volutpat.
                </p>
              </div>
            </div>
          </div>
          {/* ***** Section Title End ***** */}
          <div className="row">
            {/* ***** Pricing Item Start ***** */}
            <div
              className="col-lg-4 col-md-6 col-sm-12"
              data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s"
            >
              <div className="pricing-item">
                <div className="pricing-header">
                  <h3 className="pricing-title">Starter</h3>
                </div>
                <div className="pricing-body">
                  <div className="price-wrapper">
                    <span className="currency">$</span>
                    <span className="price">14.50</span>
                    <span className="period">monthly</span>
                  </div>
                  <ul className="list">
                    <li className="active">60 GB space</li>
                    <li className="active">600 GB transfer</li>
                    <li className="active">Pro Design Panel</li>
                    <li>15-minute support</li>
                    <li>Unlimited Emails</li>
                    <li>24/7 Security</li>
                  </ul>
                </div>
                <div className="pricing-footer">
                  <a href="#" className="main-button">
                    Purchase Now
                  </a>
                </div>
              </div>
            </div>
            {/* ***** Pricing Item End ***** */}
            {/* ***** Pricing Item Start ***** */}
            <div
              className="col-lg-4 col-md-6 col-sm-12"
              data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s"
            >
              <div className="pricing-item active">
                <div className="pricing-header">
                  <h3 className="pricing-title">Premium</h3>
                </div>
                <div className="pricing-body">
                  <div className="price-wrapper">
                    <span className="currency">$</span>
                    <span className="price">21.50</span>
                    <span className="period">monthly</span>
                  </div>
                  <ul className="list">
                    <li className="active">120 GB space</li>
                    <li className="active">1200 GB transfer</li>
                    <li className="active">Pro Design Panel</li>
                    <li className="active">15-minute support</li>
                    <li>Unlimited Emails</li>
                    <li>24/7 Security</li>
                  </ul>
                </div>
                <div className="pricing-footer">
                  <a href="#" className="main-button">
                    Purchase Now
                  </a>
                </div>
              </div>
            </div>
            {/* ***** Pricing Item End ***** */}
            {/* ***** Pricing Item Start ***** */}
            <div
              className="col-lg-4 col-md-6 col-sm-12"
              data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s"
            >
              <div className="pricing-item">
                <div className="pricing-header">
                  <h3 className="pricing-title">Advanced</h3>
                </div>
                <div className="pricing-body">
                  <div className="price-wrapper">
                    <span className="currency">$</span>
                    <span className="price">42.00</span>
                    <span className="period">monthly</span>
                  </div>
                  <ul className="list">
                    <li className="active">250 GB space</li>
                    <li className="active">5000 GB transfer</li>
                    <li className="active">Pro Design Panel</li>
                    <li className="active">15-minute support</li>
                    <li className="active">Unlimited Emails</li>
                    <li className="active">24/7 Security</li>
                  </ul>
                </div>
                <div className="pricing-footer">
                  <a href="#" className="main-button">
                    Purchase Now
                  </a>
                </div>
              </div>
            </div>
            {/* ***** Pricing Item End ***** */}
          </div>
        </div>
      </section>
    );
  }
}

PricingPlans.propTypes = {
  // bla: PropTypes.string,
};

PricingPlans.defaultProps = {
  // bla: 'test',
};

export default PricingPlans;
