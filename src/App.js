import React, { Component } from "react";
import MessageList from "./components/MessageList.js";
import Toolbar from "./components/Toolbar.js";
import Compose from "./components/Compose.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { renderCompose, submitForm } from "../src/actions";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React Inbox</h2>
				</div>
				<div className="container">
					<Toolbar />
					{this.props.compose
						? <Compose submitForm={this.props.submitForm} />
						: null}
					<MessageList />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const compose = state.compose;
	const messages = state.messages;
	return {
		messages,
		compose
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			renderCompose,
			submitForm
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(App);
