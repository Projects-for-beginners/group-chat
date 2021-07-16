import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
/* import SendRoundedIcon from "@material-ui/icons/SendRounded"; */
/* import SendIcon from '@material-ui/icons/Send'; */

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allMessage: [],
        };
    }

    handleCallback = (FormData) => {
        if (FormData) {
            /*    this.setState(prevState => ({
                                                 messageList: [...prevState.messageList, FormData]
                                             })); */
            this.setState((prevState) => ({
                allMessage: [...prevState.allMessage, FormData],
            }));
        }
    };

    componentDidMount() {
        this.timerID = setInterval(() => this.serverMessage(), 10000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    serverMessage() {
        this.setState((prevState) => ({
            allMessage: [...prevState.allMessage, "Prueba"],
        }));
    }

    render() {
        let message;
        if (this.state.allMessage) {
            message = < MessageList dataParentToChild={this.state.allMessage}
            />;
        }

        return (
            <div className="wrapper" >
                <div className="contacts" > Algo </div>
                <div className="chat" >
                    <Form parentCallback={this.handleCallback} /> {message}
                </div>
            </div>
        );
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    onTrigger = (event) => {
        this.props.parentCallback(this.state.value);
        this.setState({ value: "" });
        event.preventDefault();
    };

    render() {
        return (
            <form id="form"
                onSubmit={this.onTrigger} >
                <input id="input"
                    placeholder="Your message"
                    autoComplete="off"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <button id="sendButton"></button>
            </form>
        );
    }
}

function MessageList(props) {
    console.log(props.dataParentToChild);
    const messages = props.dataParentToChild;
    const messagesList = messages.map((message) => (
        //key especificada dentro del array.
        <
            Message key={new Date()}
            value={message}
        />
    ));

    return <ul id="messages"> {messagesList} </ul>;
}

function Message(props) {
    //take time
    var date = new Date();
    var hours = date.getHours() < 9 ? '0'+ date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 9 ? '0'+date.getMinutes() : date.getMinutes();
    const time = hours + ':' + minutes;

    return (
        <li >
            <span > {props.value} <p className="Message-Date">{time}</p> </span>
        </li>
    );
}

ReactDOM.render(< Chat />, document.getElementById("root"));