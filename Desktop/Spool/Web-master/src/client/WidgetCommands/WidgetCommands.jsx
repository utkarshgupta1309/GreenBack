import React, { PureComponent } from "react";
import { Modal, Button } from "react-bootstrap";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ApiPath from "../ApiPath";
import axios from "axios";
import KeyboardEventHandler from "react-keyboard-event-handler";

class WidgetCommands extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      modalTile: "",
      modalMode: null,
      taskTitle: "",
      selectedCommand: null,
      commandsList: [],
      //userCommands:[]
      userCommands: "",
      tasksList: [],
      count: 0,
    };
  }

  connectSocket = () => {
    let authId = window.sessionStorage.getItem("authId");
    const client = new W3CWebSocket(ApiPath.socket_url + "/" + authId);
    console.log("WidgetCommands will mount");
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      // console.log(message);
      if (message) {
        let messageData = JSON.parse(message.data);
        console.log(messageData);
        //if event == meeting_end
        if (messageData.event == "meeting.ended") {
          if (this.state.userCommands == "") {
            return;
          }
          //call backend api to send string to server
          let authId = window.sessionStorage.getItem("authId");
          let url = `${ApiPath.upload_commands}/${authId}`;
          let body = {
            commands: this.state.userCommands,
            meeting_id: messageData.meeting_id,
            uuid: messageData.uuid,
          };
          axios.post(url, body).then((response) => {
            if (
              response &&
              response.data &&
              response.data.status == "success"
            ) {
              //do something here
              this.setState({
                selectedCommand: null,
                //userCommands:[],
                userCommands: "",
              });
            }
          });
        }
      }
    };

    client.onclose = (e) => {
      console.log(
        "Socket is closed. Reconnect will be attempted in 1 second.",
        e.reason
      );
      setTimeout(() => {
        this.connectSocket();
      }, 1000);
    };

    client.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      client.close();
    };
  };

  componentWillMount = () => {
     this.connectSocket();
  };

  componentDidMount = async () => {
    console.log("WidgetCommands mounted");
    let arr;
    try {
      arr = await this.readFile();
    } catch (error) {
      console.error(error);
    }

    let commandsList = [...arr];
    this.setState({ commandsList }, () => {
      this.forceUpdate();
    });
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("WidgetCommands will receive props", nextProps);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("WidgetCommands will update", nextProps, nextState);
  };

  componentDidUpdate = () => {
    console.log("WidgetCommands did update");
  };

  componentWillUnmount = () => {
    console.log("WidgetCommands will unmount");
  };

  readFile = async () => {
    let arr = [];
    let data = {};
    let count = this.state.count;
    //    console.log("reading txt file");
    try {
      const urlOfFile = "./public/categories.txt";

      let response = await fetch(urlOfFile);
      let content = await response.text();
      //      console.log("content",content.split('\n'));

      for (let line of content.split("\n")) {
        //        console.log(line);
        let temp = line.split(":");
        let mainCat = temp[0].trim();
        let subCat = temp[1].trim().split(",");

        data = {
          key: mainCat,
          mainCategory: mainCat,
          subCategory: subCat.map((cmd) => {
            return {
              key: cmd,
              startLabel: cmd,
              stopLabel: "Stop Knowledge Capture",
              shortcutKey: this.generateShortCutKey(count++),
            };
          }),
        };
        arr.push(data);
      }

      // console.log(arr);
    } catch (error) {
      console.error(error);
    }
    //    console.log("arr",arr,count);
    this.setState({ count });
    return arr;
  };

  generateShortCutKey = (index) => {
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return str[index % str.length];
  };

  addSubCat = () => {
    //itemLabel.setAttribute("for", item);
    let txt = this.state.taskTitle;
    let title = this.state.modalTile.split(":")[1];
    let count = this.state.count;
    if (txt !== "") {
      let commandsList = this.state.commandsList;
      let index = commandsList.findIndex((obj) => obj.mainCategory === title);
      //      console.log(index);
      let data = {
        key: txt,
        startLabel: txt,
        stopLabel: "Stop Knowledge Capture",
        shortcutKey: this.generateShortCutKey(count++),
      };
      commandsList[index].subCategory.push(data);

      this.setState(
        {
          commandsList: commandsList,
          showTaskModal: false,
          taskTitle: "",
          count,
        },
        () => {
          this.forceUpdate();
        }
      );
    }
  };

  addCategory = () => {
    var txt = this.state.taskTitle;
    if (txt !== "") {
      let commandsList = this.state.commandsList;
      commandsList.push({
        key: txt,
        mainCategory: txt,
        subCategory: [],
      });
      this.setState(
        {
          commandsList: commandsList,
          showTaskModal: false,
          taskTitle: "",
        },
        () => {
          this.forceUpdate();
        }
      );
    }
  };

  addTask = () => {
    var txt = this.state.taskTitle;
    let count = this.state.count;
    if (txt !== "") {
      let tasksList = this.state.tasksList;

      tasksList.push({
        key: "Action Items - " + txt,
        task: "Action Items - " + txt,
        startLabel: "Action Items - " + txt,
        stopLabel: "Stop Task Capture",
        shortcutKey: this.generateShortCutKey(count++),
      });
      this.setState(
        {
          tasksList,
          showTaskModal: false,
          taskTitle: "",
          count,
        },
        () => {
          this.forceUpdate();
        }
      );
    }
  };

  renderSubcat = (subCategory) => {
    // console.log(cmd);
    return (
      <ul className="commandList">
        {subCategory.map((sub, index) => {
          {
            /* console.log(cmd); */
          }
          return (
            <li
              key={sub.key}
              data-cmd={sub.key}
              style={{
                display: "flex",
                color: "white",
                width: "90%",
                margin: "auto",
                height: "25px",
                font: "100px",
                border: "1px solid",
                marginBottom: "10px",
              }}
              className={
                this.state.selectedCommand == sub.key
                  ? "shadow-lg selectedCmd"
                  : ""
              }
              onClick={() => this.selectCommand(sub.key)}
            >
              <KeyboardEventHandler
                key={sub.key}
                handleKeys={[`shift+${sub.shortcutKey}`]}
                onKeyEvent={(key, e) => {
                  console.log(`do something upon keydown event of ${key}`);
                  this.selectCommand(sub.key);
                }}
              />
              <p style={{flexGrow: "1"}}>
              {this.state.selectedCommand == sub.key
                ? sub.stopLabel
                : sub.startLabel}

              </p>
              <p style={{fontSize: "x-small", alignSelf: "flex-end"}}>{`shift+${sub.shortcutKey}`}</p>

            </li>
          );
        })}
      </ul>
    );
  };

  selectFunc = () => {
    switch (this.state.modalMode) {
      case "category":
        this.addCategory();
        break;

      case "subCat":
        this.addSubCat();
        break;

      case "task":
        this.addTask();
        break;

      default:
        break;
    }
  };

  selectCommand = (cmd) => {
    var local = new Date();
    //var str2 = local.toUTCString();
    //var localdatetime = local.getUTCHours() + ":" + local.getUTCMinutes() + ":" + local.getUTCSeconds()
    //                    + ":" + local.getUTCMilliseconds();
    //var local2 = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(),  local.getUTCHours(),
    //                  local.getUTCMinutes(), local.getUTCSeconds(), local.getUTCMilliseconds()));

    //alert(local);
    //var local2 = new Date(str2).setTimeZone(TimeZone.getTimeZone("GMT"));;
    //var str2 = local.getTimezoneOffset();
    //var str = local.getTime() + (str2*(60*1000)) ;
    var str = local.getTime();
    //alert(local);
    //alert(str2);
    var { userCommands, selectedCommand } = this.state;
    let action = "start";
    if (selectedCommand === cmd) {
      action = "stop";
      selectedCommand = null;
    } else if (selectedCommand != null) {
      //modified by deval 28 Jan
      selectedCommand = cmd;
      action = "both";
    } else {
      selectedCommand = cmd;
    }
    /*userCommands.push({
    command:selectedCommand,
    timestamp:new Date(),
    action
  })*/
    if (action == "start") {
      userCommands += selectedCommand + ">" + str + ">";
    } else if (action == "stop") {
      userCommands += str + ">";
    } else {
      userCommands += str + ">" + selectedCommand + ">" + str + ">";
    }
    console.log(selectedCommand, cmd);
    alert(userCommands);
    this.setState({
      selectedCommand: selectedCommand,
      userCommands: userCommands,
    });
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.showTaskModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>{this.state.modalTile}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                this.setState({
                  taskTitle: e.target.value,
                });
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                this.setState({
                  showTaskModal: false,
                });
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => this.selectFunc()}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <form>
          <style>{"body { background-color: purple; }"}</style>
          <div
            id="container"
            style={{ whiteSpace: "nowrap", paddingTop: "5px" }}
          >
            <div>
              <img
                src="assets/images/spool-logo-3.png"
                width="160px"
                alt="Spool"
              />
            </div>
            <br />
            <h5 style={{ color: "white" }}>Click to Start-Stop Capture</h5>
            <br />
          </div>

          {this.state.commandsList.map((cmd) => {
            return (
              <div key={cmd.mainCategory}>
                <p className="mainCategory">
                  {cmd.mainCategory}
                  <img
                    src="assets/images/plus2.png"
                    alt="Add sub Category"
                    width={40}
                    height={40}
                    style={{ marginLeft: "20px", cursor: "pointer" }}
                    onClick={() => {
                      this.setState({
                        showTaskModal: true,
                        modalTile: "Add SubCategory for :" + cmd.mainCategory,
                        modalMode: "subCat",
                      });
                    }}
                  />
                </p>

                {this.renderSubcat(cmd.subCategory)}
              </div>
            );
          })}
          <br />
          {/* Uncomment following code to get functionality to add main category */}
          {/* <div >
            <p className="mainCategory" >
              ADD Knowledge Categories
              <img
                src="assets/images/plus2.png"
                alt="Add Main Category"
                width={40}
                height={40}
                style={{ marginLeft: "20px", cursor: "pointer" }}
                onClick={() => {
                this.setState({
                  showTaskModal: true,
                  modalTile: "Add Main Categories",
                  modalMode: "category",
                });
              }}
              />
            </p>
          </div>  */}


          <div>
            <p className="task">
              Add Member for Task
              <img
                src="assets/images/plus2.png"
                alt="Add Task"
                width={40}
                height={40}
                style={{ marginLeft: "20px", cursor: "pointer" }}
                onClick={() => {
                  this.setState({
                    showTaskModal: true,
                    modalTile: "Add Member for Task :",
                    modalMode: "task",
                  });
                }}
              />
            </p>
          </div>

          <ul className="taskList">
            {this.state.tasksList.map((task,index) => {
              return (
                <li
                  key={task.key}
                  data-cmd={task.key}
                  style={{
                    /*cursor: "default",
                    maxWidth: "400px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "10px",
                    height: "fit-content",
                    fontSize: "1.2rem",
                    borderRadius: "10px",
                    padding: "3px",
                    whiteSpace: "nowrap",
                    overflow: "clip",*/
                    display: "flex",
                    color: "white",
                    width: "90%",
                    margin: "auto",
                    height: "25px",
                    font: "100px",
                    border: "1px solid",
                    marginBottom: "10px",
                  }}
                  className={
                    this.state.selectedCommand == task.key
                      ? "shadow-lg selectedCmd"
                      : ""
                  }
                  onClick={() => this.selectCommand(task.key)}
                >
                  <KeyboardEventHandler
                    key={task.key}
                    handleKeys={[`shift+${task.shortcutKey}`]}
                    onKeyEvent={(key, e) => {
                      console.log(`do something upon keydown event of ${key}`);
                      this.selectCommand(task.key);
                    }}
                  />
                  <p style={{flexGrow: "1"}}>
                    {this.state.selectedCommand == task.key
                      ? task.stopLabel
                      : task.startLabel}
                  </p>
                  <p style={{fontSize: "x-small", alignSelf: "flex-end"}}>{`shift+${task.shortcutKey}`}</p>
                </li>
              );
            })}
          </ul>
          <br />
          <br />
        </form>
      </React.Fragment>
    );
  }
}

WidgetCommands.propTypes = {
  // bla: PropTypes.string,
};

WidgetCommands.defaultProps = {
  // bla: 'test',
};

export default WidgetCommands;
