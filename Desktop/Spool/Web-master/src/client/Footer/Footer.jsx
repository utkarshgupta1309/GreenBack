import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import { Test } from './Footer.styles';

class Footer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("Footer will mount");
  };

  componentDidMount = () => {
    console.log("Footer mounted");
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("Footer will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("Footer will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("Footer did update");
  };

  componentWillUnmount = () => {
    console.log("Footer will unmount");
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <footer>
        {/*<div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <ul className="social">
                <li>
                  <a href="#">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-linkedin" />
                  </a>
                </li>
                </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p className="copyright">
                  <a href="#" style={{color:"white",marginTop:"20px"}}>
                    Privacy Policy
                  </a> &nbsp; | &nbsp;
                Copyright © 2020 Spool
              </p>
            </div>
          </div>
        </div> */}
      </footer>
    );
  }
}

Footer.propTypes = {
  // bla: PropTypes.string,
};

Footer.defaultProps = {
  // bla: 'test',
};

export default Footer;
