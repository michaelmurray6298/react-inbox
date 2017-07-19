import React, { Component } from "react";
import MessageList from "./components/MessageList.js";
import Toolbar from "./components/Toolbar.js";
import Compose from "./components/Compose.js";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			showCompose: false
		};

		this.updateRemovedMessages = this.updateRemovedMessages.bind(this);
		this.updateState = this.updateState.bind(this);
		this.renderCompose = this.renderCompose.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	renderCompose() {
		this.setState({ showCompose: !this.state.showCompose });
	}

	updateRemovedMessages() {
		let messages = [];
		let messageIds = [];

		this.state.messages.forEach(msg => {
			if (msg.selected) {
				messageIds.push(msg.id);
			} else {
				messages.push(msg);
			}
		});
		fetch(`http://localhost:8181/api/messages`, {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				messageIds: messageIds,
				command: "delete"
			})
		}).then(() => {
			this.setState({ messages });
		});
	}

	updateState(messageId, update) {
		this.setState(prevState => {
			let message = prevState.messages.find(msg => msg.id === messageId);
			let index = prevState.messages.indexOf(message);
			let msgKey = Object.keys(update)[0];
			return {
				messages: [
					...prevState.messages.slice(0, index),
					{ ...message, [msgKey]: update[msgKey] },
					...prevState.messages.slice(index + 1)
				]
			};
		});
	}
	submitForm = form => {
		fetch(`http://localhost:8181/api/messages`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				subject: form.subjectValue,
				body: form.bodyValue
			})
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				console.log(this.state.messages);
				this.setState({
					messages: [...this.state.messages, data],
					showCompose: false
				});
			});
	};
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React Inbox</h2>
				</div>
				<div className="container">
					<Toolbar
						compose={this.renderCompose}
						updateRemovedMessages={this.updateRemovedMessages}
					/>
					{this.state.showCompose
						? <Compose submitForm={this.submitForm} />
						: null}
					<MessageList />
				</div>
			</div>
		);
	}
}

export default App;
