import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { submitForm } from "../actions";
import {Redirect} from "react-router-dom"

class Compose extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fireRedirect: false
		}
		this.handleForm = this.handleForm.bind(this);
	}
	handleForm(e) {
		e.preventDefault();
		this.props.submitForm({
			subjectValue: e.target.subject.value,
			bodyValue: e.target.body.value
		});
		this.setState({ fireRedirect: true })

	}

	render() {
		const { fireRedirect } = this.state
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

				{fireRedirect && (
          <Redirect to='/'/>
        )}
			</div>
		</form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
