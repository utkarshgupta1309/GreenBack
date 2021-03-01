import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header } from './MyMeetings.styles';
import ApiPath from "./../ApiPath";
import axios from "axios";
import Moment from 'moment';

class MyMeetings extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      meetings:[],
    };
  }

  componentWillMount = () => {
  }

  componentDidMount = () => {
    let authId = window.sessionStorage.getItem("authId");
    console.log(authId);
    let url = `${ApiPath.list_meetings}/${authId}`;
    axios.get(url).then((response) => {
      let meetings = response.data.data.meetings;
      this.setState({
        meetings:meetings
      })
    })
  }

  componentWillReceiveProps = (nextProps) => {
  }

  componentWillUpdate = (nextProps, nextState) => {
  }

  componentDidUpdate = () => {
  }

  componentWillUnmount = () => {
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <React.Fragment>
      <div className="welcome-area heading-banner">
        <div className="header-text">
          <div className="container">
            <div className="row">
              <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
                <h1>My Meetings</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Meeting ID</th>
                  <th>Topic</th>
                  <th>Start Time</th>
                  <th>Duration</th>
                  <th>Timezone</th>
                  <th>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.meetings.map((item) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.topic}</td>
                      <td>{Moment(item.start_time).format('HH:mm A').toString()}</td>
                      <td>{item.duration}</td>
                      <td>{item.timezone}</td>
                      <td>{Moment(item.created_at).format('MM/DD/YYYY').toString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

MyMeetings.propTypes = {
  // bla: PropTypes.string,
};

MyMeetings.defaultProps = {
  // bla: 'test',
};

export default MyMeetings;
