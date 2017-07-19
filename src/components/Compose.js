import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { renderCompose, submitForm } from "../actions";

class Compose extends Component {
	constructor(props) {
		super(props);
		this.handleForm = this.handleForm.bind(this);
	}
	handleForm(e) {
		e.preventDefault();
		this.props.submitForm({
			subjectValue: e.target.subject.value,
			bodyValue: e.target.body.value
		});
	}

	render() {
		return (
			<form className="form-horizontal well" onSubmit={this.handleForm}>
				<div className="form-group">
					<div className="col-sm-8 col-sm-offset-2">
						<h4>Compose Message</h4>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="subject" className="col-sm-2 control-label">
						Subject
					</label>
					<div className="col-sm-8">
						<input
							defaultValue="Subject"
							type="text"
							className="form-control"
							id="subject"
							placeholder="Enter a subject"
							name="subject"
						/>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="body" className="col-sm-2 control-label">
						Body
					</label>
					<div className="col-sm-8">
						<textarea
							defaultValue="Body"
							name="body"
							id="body"
							className="form-control"
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-sm-8 col-sm-offset-2">
						<input type="submit" value="Send" className="btn btn-primary" />
					</div>
				</div>
			</form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
