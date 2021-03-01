import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import { Test } from './Preloader.styles';

class Preloader extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log('Preloader will mount');
  }

  componentDidMount = () => {
    console.log('Preloader mounted');
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('Preloader will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('Preloader will update', nextProps, nextState);
  }

  componentDidUpdate = () => {
    console.log('Preloader did update');
  }

  componentWillUnmount = () => {
    console.log('Preloader will unmount');
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div id="preloader">
        <div className="jumper">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>  
    );
  }
}

Preloader.propTypes = {
  // bla: PropTypes.string,
};

Preloader.defaultProps = {
  // bla: 'test',
};

export default Preloader;
