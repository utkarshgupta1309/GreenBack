import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import { Test } from './CommandsList.styles';

class CommandsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log("CommandsList will mount");
  };

  componentDidMount = () => {
    console.log("CommandsList mounted");
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("CommandsList will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("CommandsList will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("CommandsList did update");
  };

  componentWillUnmount = () => {
    console.log("CommandsList will unmount");
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <React.Fragment>
        {/*<div className="welcome-area heading-banner">*/}
        <div >
           <img
               src="assets/images/img.png"

               alt="App"
             />
         </div>
          <div className="header-text">
            <div className="container">
              <div className="row">
                <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
                  <h1>Voice Commands Guidelines</h1>
                </div>
              </div>
            </div>
          </div>
        {/*</div>*/}

         <div className="container">
                  <div className="row">

                  <div class="column">
                    <div className="padding-top-30">
                      <div style={{margin:"auto",width:"fit-content"}}>

                              <dl style={{textAlign:"left"}}>
                                <dd style={{paddingLeft: "5px"}}>
                                  <h4>How to Use Spool Voice Commands</h4>

                                  <ul>
                                    <h5>●	Start Tagging by pronouncing the phrase:</h5>
                                    <li>&nbsp;&nbsp;&nbsp;&nbsp;o	<b>“Start Capture”</b></li>
                                    <h5>●	then Specify a Knowledge Topic or a Task:</h5>
                                    <li>&nbsp;&nbsp;o	A Topic Category (e.g: Customer Feedback) or </li>
                                    <li>&nbsp;&nbsp;&nbsp;&nbsp;o	The phrase “Action Items for George” </li>
                                    <h5>●	Stop Tagging by pronouncing the phrase:</h5>
                                    <li>&nbsp;&nbsp;&nbsp;&nbsp;o	<b>“Stop Capture”</b></li>
                                  </ul>
                                </dd>
                                <dd style={{paddingLeft: "5px"}}>
                                  <h4>Examples:</h4>
                                  <h5>●	Recording a Knowledge Topic:</h5>
                                  <li>&nbsp;&nbsp;&nbsp;&nbsp;<b>“Start Capture Customer Feedback”</b></li>
                                   <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing</li>
                                   <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elit, sed do eiusmod tempor incididunt ut labore </li>
                                   <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;et dolore  magna aliqua. </li>
                                  <li>&nbsp;&nbsp;&nbsp;&nbsp;<b>“Stop Capture”</b></li>
                                  <h5>●	Recording a Task Assignment:</h5>
                                  <li>&nbsp;&nbsp;&nbsp;&nbsp;<b>“Start Capture Action Items for George”</b></li>
                                 <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.	Lorem ipsum dolor sit amet</li>
                                 <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.	Consectetur adipiscing elit</li>
                                 <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.	Sed do eiusmod tempor incididunt. </li>
                                <li>&nbsp;&nbsp;&nbsp;&nbsp;<b>“Stop Capture”</b></li>
                                </dd>
                                </dl>
                               </div>
                            </div>
                        </div>

                        <div class="column">
                            <div className="padding-top-30">
                                 <div style={{margin:"auto",width:"fit-content"}}>
                                 <dd style={{paddingLeft: "0px"}}>
                                     <i>

                                     </i>
                                 </dd>
                                </div>
                             </div>
                         </div>

                        <div class="column">
                            <div className="padding-top-30">
                                 <div style={{margin:"auto",width:"fit-content"}}>
                                    <dl style={{textAlign:"left"}}>
                                        <dd style={{paddingLeft: "20px"}}>
                                          <h4> Discussion Topics for Knowledge Base </h4>
                                          <ul>
                                            <h4> 1: [Customer Satisfaction]: </h4>
                                            <li>[Customer Feedback]  </li>
                                              <li>  [Feedback Analysis] </li>
                                              <li>  [Customer Satisfaction] </li>
                                              <li>  [Customer Success]</li>

                                                 <h4> 2: [Customer On-boarding]: </h4>
                                                <li>[Customer Updates]   </li>
                                                  <li> [Product Insights]  </li>
                                                  <li> [Next steps]  </li>

                                                  <h4> 3: Customer Feedback:  </h4>
                                                  <li>[Proposed Features]   </li>
                                                    <li> [Support Insights]</li>
                                          </ul>
                                          <h4> Tasks:  Start Capture Action Items for</h4>
                                          <ul>
                                                <li>  [SDR 1] </li>
                                                <li>  [SDR 2] </li>
                                                <li>  [SDR 3]</li>
                                            </ul>
                                        </dd>
                                  </dl>
                                </div>
                             </div>
                         </div>
                  </div>
                </div>
      </React.Fragment>
    );
  }
}

CommandsList.propTypes = {
  // bla: PropTypes.string,
};

CommandsList.defaultProps = {
  // bla: 'test',
};

export default CommandsList;
