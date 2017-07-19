import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleStarred, toggleSelected } from "../actions";
import Label from "./Labels.js";

class Message extends Component {
	render() {
		const read = this.props.read ? "read" : "unread";
		const selected = this.props.selected ? "selected" : "";
		const checked = this.props.selected ? "checked" : "";
		const starred = this.props.starred ? "fa-star" : "fa-star-o";
		return (
			<div className={`row message ${read} ${selected}`}>
				<div className="col-xs-1">
					<div className="row">
						<div className="col-xs-2">
							<input
								type="checkbox"
								checked={`${checked}`}
								onChange={() =>
									this.props.toggleSelected(this.props.id, this.props.selected)}
							/>
						</div>
						<div className="col-xs-2">
							<i
								className={`star fa ${starred}`}
								onClick={() => {
									this.props.toggleStarred(this.props.id, this.props.starred);
								}}
							/>
						</div>
					</div>
				</div>
				<div className="col-xs-11">
					{this.props.labels.map(label =>
						<Label label={label} key={label.id} />
					)}
					<span>
						{this.props.subject}
					</span>
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
			toggleStarred,
			toggleSelected
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Message);
