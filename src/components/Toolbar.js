import React, { Component } from "react";

class Toolbar extends Component {
	selectAllMessages() {
		if (this.props.calculateSelected !== "check-") {
			this.props.updateAll({ selected: true });
		} else {
			this.props.updateAll({ selected: false });
		}
	}
	selectedMessagesCount() {
		let selectedMessagesCount = this.props.apiData.filter(
			message => message.selected
		);
		return selectedMessagesCount.length;
	}

	markReadMessages() {
		this.props.updateMultipleMessages({ read: true });
	}

	markUnreadMessages() {
		this.props.updateMultipleMessages({ read: false });
	}

	addLabel(event) {
		let newLabel = event.target.value;
		if (newLabel === "Apply label") {
			return;
		}
		this.props.updateLabelState(newLabel, "add");
	}

	deleteLabel(event) {
		let selectedLabel = event.target.value;
		if (selectedLabel === "Remove label") {
			return;
		}
		this.props.updateLabelState(selectedLabel);
	}

	deleteMessages() {
		this.props.updateRemovedMessages();
	}

	render() {
		const disabled = this.selectedMessagesCount() > 0 ? "" : "disabled";
		return (
			<div className="row toolbar">
				<div className="col-md-12">
					<p className="pull-right">
						<span className="badge badge">{this.props.unreadMessageCount}</span>
						unread messages
					</p>
					<a className="btn btn-danger" onClick={() => this.props.compose()}>
						<i className="fa fa-plus" />
					</a>
					<button
						className="btn btn-default"
						onClick={() => this.selectAllMessages()}>
						<i className={`fa fa-${this.props.calculateSelected}square-o`} />
					</button>

					<button
						className="btn btn-default"
						disabled={disabled}
						onClick={() => this.markReadMessages()}>
						Mark As Read
					</button>

					<button
						className="btn btn-default"
						disabled={disabled}
						onClick={() => this.markUnreadMessages()}>
						Mark As Unread
					</button>

					<select
						className="form-control label-select"
						disabled={disabled}
						onChange={event => this.addLabel(event)}>
						<option>Apply label</option>
						<option value="dev">dev</option>
						<option value="personal">personal</option>
						<option value="gschool">gschool</option>
					</select>

					<select
						className="form-control label-select"
						disabled={disabled}
						onChange={event => this.deleteLabel(event)}>
						<option>Remove label</option>
						<option value="dev">dev</option>
						<option value="personal">personal</option>
						<option value="gschool">gschool</option>
					</select>

					<button
						className="btn btn-default"
						disabled={disabled}
						onClick={() => this.deleteMessages()}>
						<i className="fa fa-trash-o" />
					</button>
				</div>
			</div>
		);
	}
}

export default Toolbar;
