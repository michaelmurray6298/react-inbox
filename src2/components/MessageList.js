import React, { Component } from "react";
import Message from "./Message.js";

class MessageList extends Component {
	render() {
		return (
			<div className="container">
				{this.props.apiData.map(email =>
					<Message
						key={email.id}
						id={email.id}
						labels={email.labels}
						selected={email.selected}
						starred={email.starred}
						read={email.read}
						subject={email.subject}
						selectAll={this.props.selectAll}
						updateState={this.props.updateState}
					/>
				)}
			</div>
		);
	}
}

export default MessageList;
