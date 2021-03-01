import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import { Test } from './Welcome.styles';

class Welcome extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("Welcome will mount");
  };

  componentDidMount = () => {
    console.log("Welcome mounted");
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("Welcome will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("Welcome will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("Welcome did update");
  };

  componentWillUnmount = () => {
    console.log("Welcome will unmount");
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div>
        {/* <img
              src="assets/images/spool.png"

              alt="App"
            /> */}
        <nav>
          <div class="logo">
            <img src="assets/sources/images/logo-1.png" alt="logo" />
          </div>
          <div class="links">
            <img src="assets/sources/images//hamburger.png" alt="menu" />
          </div>
        </nav>
        <section className="content">
          <div className="grid">
            <article className="hero-txt">
              <div className="txt">
                <h1>
                  Conversations-based <br />
                  knowledge Platform
                  <b>
                    &nbsp; for <br />
                    Customer Facing Teams.
                  </b>
                </h1>
                <p>
                  Spool converts digital conversations into collaborative
                  knowledge in real-time and helps your team to sync and scale
                  faster.
                </p>
              </div>
              <div
                className="svg"
                style={{
                  backgroundImage:
                    "url('assets/sources/images/design svg.svg')",
                }}
              ></div>
            </article>
            <article>
              <img src="assets/sources/images/top-img.jpg" alt="img" />
            </article>
          </div>
        </section>
        <section className="content">
          <section className="grid row">
            <div>
              <img src="assets/sources/images/guy-1.jpg" alt="guy-1" />
              <h3>Make your calls more Actionable & increase Win Rates</h3>
            </div>
            <div>
              <img src="assets/sources/images/guy-2.jpg" alt="guy-2" />
              <h3>
                Capture & Share information without any security or privacy
                concerns
              </h3>
            </div>
            <div>
              <img
                src="assets/sources/images/clock&calender.jpg"
                alt="clock&calendar"
              />
              <h3>Save tones of time and spend more time ith your Customers</h3>
            </div>
          </section>
        </section>
        <section className="content">
          <h2 style={{ paddingBottom: "1rem" }}>
            Connect Spool with your favourite productivity & collaborations app
          </h2>
          <div className="grid images">
            <img src="assets/sources/images/logo/Layer 1.svg" alt="icons" />
            <img src="assets/sources/images/logo/Layer 2.svg" alt="icons" />
            <img src="assets/sources/images/logo/Layer 3.svg" alt="icons" />
            <img src="assets/sources/images/logo/Layer 4.svg" alt="icons" />
            <img src="assets/sources/images/logo/Layer 5.svg" alt="icons" />
            <img src="assets/sources/images/logo/Layer 6.svg" alt="icons" />
          </div>
        </section>
        <section className="btn">
          <a href="https://api.spoolapp.co/connect">Connect with Zoom</a>
        </section>
      </div>
    );
  }
}

Welcome.propTypes = {
  // bla: PropTypes.string,
};

Welcome.defaultProps = {
  // bla: 'test',
};

export default Welcome;
