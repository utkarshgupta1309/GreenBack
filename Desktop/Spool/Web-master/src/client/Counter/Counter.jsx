import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import { Test } from './Counter.styles';

class Counter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("Counter will mount");
  };

  componentDidMount = () => {
    console.log("Counter mounted");
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("Counter will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("Counter will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("Counter did update");
  };

  componentWillUnmount = () => {
    console.log("Counter will unmount");
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <section className="counter">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="count-item decoration-bottom">
                  <strong>126</strong>
                  <span>Projects</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="count-item decoration-top">
                  <strong>63</strong>
                  <span>Happy Clients</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="count-item decoration-bottom">
                  <strong>18</strong>
                  <span>Awards Wins</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="count-item">
                  <strong>27</strong>
                  <span>Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Counter.propTypes = {
  // bla: PropTypes.string,
};

Counter.defaultProps = {
  // bla: 'test',
};

export default Counter;
