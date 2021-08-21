import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function getTime() {
  let date = new Date();
  let hours = ("0" + date.getHours()).substr(-2, 2);
  let minutes = ("0" + date.getMinutes()).substr(-2, 2);
  return hours + ":" + minutes;
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessage: [],
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
    }
  };

  render() {
    let message;
    if (this.state.allMessage) {
      message = (
        <MessageList
          dataParentToChild={this.state.allMessage}
          activePeople={this.state.activePeople}
        />
      );
    }

    return (
      <div className="wrapper">
        <div className="contacts">
          {" "}
          <Contact parentCallback={this.handleCallbackContact} />{" "}
        </div>
        <div className="chat">
          {message}
        </div>
        <Form parentCallback={this.handleCallbackMessage} />
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.onTrigger = this.onTrigger.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    event.preventDefault();
  }

  handleEnter(event) {
    if ( event.code === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      this.props.parentCallback( event.target.value.trim(/(\s|\n|\r)/) );
      this.setState({ value: "" });
    }
  }

  onTrigger = (event) => {
    this.props.parentCallback(this.state.value);
    this.setState({ value: "" });
    event.preventDefault();
  };

  render() {
    return (
      <form id="form" onSubmit={this.onTrigger}>
        <textarea
          id="input"
          placeholder="Your message"
          autoComplete="off"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyUp={(e) => this.handleEnter(e)}
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
      contactList: [
        "Darrel Steward",
        "Ralph Edwards",
        " Albert Flores",
        "Ronald Richards",
        "Kathryn Murphy",
      ],
      name: "",
      activeContacts: [],
    };
  }

  componentDidMount() {
    this.props.parentCallback(this.state.contactList[0]);
  }

  render() {
    return <PeopleList dataParentToChild={this.state.contactList} />;
  }
}

function PeopleList(props) {
  const contacts = props.dataParentToChild;
  const contactsList = contacts.map((people) => (
    //key especificada dentro del array.
    <People key={people} value={people} />
  ));

  return <ul id="Contacts-List"> {contactsList} </ul>;
}

function People(props) {
  //take time
  const time = getTime();
  const firstLetter = props.value.trim(' ')[0].toUpperCase();
  
  return (
    <li className="people">
      <div className="PeopleImage">{firstLetter}</div>
      <div className="PeopleInfo">
        <span>
          <p className="PeopleName"> {props.value}</p>
          <p className="People-Date"> {time} </p>
        </span>
      </div>
    </li>
  );
}

function MessageList(props) {
  const messages = props.dataParentToChild;
  const messagesList = messages.map((message) => (
    //key especificada dentro del array.
    <Message key={message} value={message} activePeople={props.activePeople} />
  ));

  return <ul id="messages"> {messagesList} </ul>;
}

function Message(props) {
  //take time
  const time = getTime();
  const firstLetter = props.activePeople.trim(' ')[0].toUpperCase();
  return (
    <li>
      <div className="PeopleImage">{firstLetter}</div>
      <span>
        <p className="Message-User item">{props.activePeople}</p>
        <p className="Text item">{props.value}</p>
        <p className="Message-Date">{time}</p>
      </span>
    </li>
  );
}

ReactDOM.render(<Chat />, document.getElementById("root"));
