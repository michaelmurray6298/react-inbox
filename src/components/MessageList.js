import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchMessages } from "../actions";
import Message from "./Message.js";

class MessageList extends Component {
	componentDidMount() {
		this.props.fetchMessages();
	}
	render() {
		const { messages } = this.props;

		return (
			<div className="container">
				{messages.map(message =>
					<Message
						key={message.id}
						id={message.id}
						labels={message.labels}
						selected={message.selected}
						starred={message.starred}
						read={message.read}
						subject={message.subject}
					/>
				)}
			</div>
		);
	}
}
const mapStateToProps = state => {
	const messages = state.messages;
	return {
		messages
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchMessages
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
