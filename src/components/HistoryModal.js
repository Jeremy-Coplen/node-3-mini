import React, { Component } from 'react';
import axios from "axios"
import './HistoryModal.css';

export default class HistoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyMessages: []
    };
  }

  componentDidMount() {
    axios.get("/api/messages/history")
    .then(res => this.setState({historyMessages: res.data}))
  }

  render() {
    if(this.state.historyMessages.length > 0) {
      var historyMessages = this.state.historyMessages.map((messageObj, i) => {
        return (
          <div className="message" key={i}>
            <span>{messageObj.username}</span>
            <span>{messageObj.message}</span>
          </div>
        );
      });
    }
    else {
      var historyMessages = <div className="message">
        <span>No Messages</span>
      </div>
    }

    return (
      <section className="modal-wrapper">
        <div className="modal-content">{historyMessages}</div>
        <div className="close" onClick={this.props.closeHistoryModal}>
          x
        </div>
      </section>
    );
  }
}
