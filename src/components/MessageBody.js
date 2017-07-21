import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMessagesById } from '../actions';
// import { Link, BrowserRouter as Router, Route  } from "react-router-dom"


class MessageBody extends Component {
  componentDidMount() {
    this.props.fetchMessagesById(this.props.location);
  }
  render() {
    return (
      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">
          {this.props.messageById.body}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMessagesById,
    },
    dispatch,
  );
const mapStateToProps = (state) => {
  const messages = state.messages;
  const messageById = state.messagesById;
  return {
    messages,
    messageById,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MessageBody);
