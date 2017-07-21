import React, { Component } from "react";
import MessageList from "./components/MessageList.js";
import Toolbar from "./components/Toolbar.js";
import Compose from "./components/Compose.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { submitForm } from "../src/actions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

const ComposeRoute = () => {
	return <Compose submitForm={submitForm} />;
};

const Home = (props) => (
	<div>
		<Toolbar location={props.location.pathname} />
		<Route exact path="/compose" component={ComposeRoute} />
		<MessageList location={props.location.pathname}/>
	</div>
)

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React Inbox</h2>
				</div>
				<div className="container">
					<Router>
						<div>
							<Route path="/" component={Home} />

						</div>
					</Router>
				</div>
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
			submitForm
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(App);
