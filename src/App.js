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
		this.updateLabelState = this.updateLabelState.bind(this);
		this.updateAll = this.updateAll.bind(this);
		this.updateMultipleMessages = this.updateMultipleMessages.bind(this);
		this.updateState = this.updateState.bind(this);
		this.renderCompose = this.renderCompose.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	async componentDidMount() {
		const apiData = await this.getMessages();
		apiData.forEach(message => {
			message.checked = false;
			message.selected = false;
		});
		this.setState({
			messages: apiData
		});
	}
	async getMessages() {
		const response = await fetch("http://localhost:8181/api/messages");
		const json = await response.json();
		return json._embedded.messages;
	}
	renderCompose() {
		this.setState({ showCompose: !this.state.showCompose });
	}
	unreadMessageCount() {
		let unreadMsgs = this.state.messages.filter(msg => msg.read === false);
		return unreadMsgs.length;
	}

	calculateSelected() {
		let selectAll = "minus-";
		let selectedMsgs = this.state.messages.filter(msg => msg.selected === true);

		if (!selectedMsgs.length) {
			selectAll = "";
		} else if (selectedMsgs.length === this.state.messages.length) {
			selectAll = "check-";
		}

		return selectAll;
	}

	addNewLabel(msg, newLabel) {
		if (!msg.labels.includes(newLabel)) {
			msg.labels.push(newLabel);
		}
		return { labels: msg.labels };
	}

	deleteSelectedLabel(msg, newLabel) {
		let index = msg.labels.indexOf(newLabel);
		msg.labels.splice(index, 1);
		return { labels: msg.labels };
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

	updateLabelState(newLabel, add) {
		let messages = [];
		let messageIds = [];
		let msgLabels;

		this.state.messages.forEach(msg => {
			if (msg.selected === true) {
				if (add === "add") {
					msgLabels = this.addNewLabel(msg, newLabel);
					messageIds.push(msg.id);
				} else {
					msgLabels = this.deleteSelectedLabel(msg, newLabel);
					messageIds.push(msg.id);
				}
				messages.push(Object.assign({}, msg, msgLabels));
			} else {
				messages.push(msg);
			}
		});
		if (add === "add") {
			fetch(`http://localhost:8181/api/messages`, {
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					messageIds: messageIds,
					command: "addLabel",
					label: newLabel
				})
			}).then(() => {
				this.setState({ messages });
			});
		} else {
			fetch(`http://localhost:8181/api/messages`, {
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					messageIds: messageIds,
					command: "removeLabel",
					label: newLabel
				})
			}).then(() => {
				this.setState({ messages });
			});
		}
	}

	updateAll(update) {
		let messages = this.state.messages.map(msg => Object.assign(msg, update));
		this.setState({ messages });
	}

	updateMultipleMessages(update) {
		let messages = [];
		let messageIds = [];

		this.state.messages.forEach(msg => {
			if (msg.selected === true) {
				messages.push(Object.assign({}, msg, update));
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
				command: "read",
				read: update.read
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
						apiData={this.state.messages}
						unreadMessageCount={this.unreadMessageCount()}
						calculateSelected={this.calculateSelected()}
						updateRemovedMessages={this.updateRemovedMessages}
						updateLabelState={this.updateLabelState}
						updateAll={this.updateAll}
						updateMultipleMessages={this.updateMultipleMessages}
					/>
					{this.state.showCompose
						? <Compose submitForm={this.submitForm} />
						: null}
					<MessageList
						apiData={this.state.messages}
						selectAll={this.state.selectAll}
						updateState={this.updateState}
					/>
				</div>
			</div>
		);
	}
}

export default App;
