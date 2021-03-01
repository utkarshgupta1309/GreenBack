import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//import { Test } from './Header.styles';

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("Header will mount");
  };

  componentDidMount = () => {
    console.log("Header mounted");
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("Header will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("Header will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("Header did update");
  };

  componentWillUnmount = () => {
    console.log("Header will unmount");
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    let authId = window.sessionStorage.getItem("authId");

    return (
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <Link to="/" style={{marginTop:"5px"}} className="logo">
                  <img src="assets/images/spool-logo1.jpg" width="160px" alt="Spool" />
                </Link>
                <ul className="nav">
                  <li>
                    <a href="/#welcome" className="active">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="http://spoolapp.co/">Join Waiting List</a>
                  </li>
                  {/* <li>
                    <a href="#work-process">Work Process</a>
                  </li>
                   */}
                  {/*<li>
                    <a href="/#testimonials">Testimonials</a>
                  </li>*/}
                  {/* <li>
                    <a href="#pricing-plans">Pricing Plans</a>
                  </li>
                  <li>
                    <a href="/#contact-us">Contact Us</a>
                  </li>*/}
                  {/* {authId && <li>
                    <Link to="/my-meetings">My Meetings</Link>
                  </li>} */}
                  {authId && <li>
                    <Link to="/commands">List Commands</Link>
                  </li>}
		  {/* {authId ? <li>
                    <a href="https://marketplace.zoom.us/user/installed">Disconnect</a>
                  </li> : null }*/}
                  <li>
                      <a href="https://marketplace.zoom.us/user/installed">Disconnect</a>
                    </li>
                </ul>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  // bla: PropTypes.string,
};

Header.defaultProps = {
  // bla: 'test',
};

export default Header;
