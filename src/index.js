import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allMessage: [],
            activePeople: '',
        };
    }

    handleCallbackMessage = (FormData) => {
        if (FormData) {
            this.setState((prevState) => ({
                allMessage: [...prevState.allMessage, FormData],
            }));
        }
    };

    handleCallbackContact = (PeopleData) => {
        if (PeopleData) {
            this.setState({ activePeople: PeopleData });
        };
    }

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
            message = <MessageList dataParentToChild={this.state.allMessage} activePeople={this.state.activePeople} />;
        }

        return (
            <div className="wrapper" >
                <div className="contacts" > <Contact parentCallback={this.handleCallbackContact} /> </div>
                <div className="chat">
                    <Form parentCallback={this.handleCallbackMessage} />
                    {message}
                </div>
            </div>
        );
    }
};

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

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameList: ['Darrel Steward', 'Ralph Edwards', ' Albert Flores', 'Ronald Richards', 'Kathryn Murphy'],
            name: 'HOLa',
            activeContacts: []
        };
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.serverMessage(), 10000);
        this.props.parentCallback(this.state.nameList[0]);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    serverMessage() {
        this.setState((prevState) => ({
            activeContacts: [...prevState.activeContacts, this.state.nameList[Math.floor(Math.random() * this.state.nameList.length)]],
        }));
        this.props.parentCallback(this.state.activeContacts[0]);
    }

    render() {
        let contact = '';
        if (this.state.activeContacts) {
            contact = <PeopleList dataParentToChild={this.state.activeContacts} />;
        }

        return (
            <div>{contact}</div>
        );
    }
}

function PeopleList(props) {
    const contacts = props.dataParentToChild;
    const contactsList = contacts.map((people) => (
        //key especificada dentro del array.
        <People
            key={new Date()} value={people}
        />
    ));

    return <ul id="Contacts-List"> {contactsList} </ul>;
}

function People(props) {
    //take time
    var date = new Date();
    var hours = date.getHours() < 9 ? '0' + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 9 ? '0' + date.getMinutes() : date.getMinutes();
    const time = hours + ':' + minutes;
    const imageSrc = "https://ui-avatars.com/api/?name=" + props.value + "&color=7F9CF5&background=EBF4FF";

    return (
        <li id="people">
            <figure>
                <img id="PeopleImage" src={imageSrc} alt={props.value} />
            </figure>
            <div>
                <span> <p className="PeopleName"> {props.value} </p> <p className="People-Date">{time}</p> </span>
                <p id="peopleLastMessage">
                    <small>Lorem ipsum dolor sit amet consectetur adipisicing elit.s
                        Ullam nihil in odit ...</small></p>
            </div>
        </li>
    );
}

function MessageList(props) {
    const messages = props.dataParentToChild;
    const messagesList = messages.map((message) => (
        //key especificada dentro del array.
        <Message
            key={new Date()} value={message} activePeople={props.activePeople}
        />
    ));

    return <ul id="messages"> {messagesList} </ul>;
}

function Message(props) {
    //take time
    var date = new Date();
    var hours = date.getHours() < 9 ? '0' + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 9 ? '0' + date.getMinutes() : date.getMinutes();
    const time = hours + ':' + minutes;

    const imageSrc = "https://ui-avatars.com/api/?name=" + props.activePeople + "&color=7F9CF5&background=EBF4FF";
    return (
        <li>
            <div>
                <img id="imageMessage" src={imageSrc} alt={props.activePeople} />
                <span>
                    <p className="Message-User item">{props.activePeople}</p>
                    <p className="Text item">{props.value}</p>
                    <p className="Message-Date">{time}</p>
                </span>
            </div>
        </li>
    );
}

ReactDOM.render(<Chat />, document.getElementById("root"));