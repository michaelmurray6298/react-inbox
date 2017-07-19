export const MESSAGES_RECEIVED = "MESSAGES_RECEIVED";
export const TOGGLE_STARRED = "TOGGLE_STARRED";
export const TOGGLE_SELECTED = "TOGGLE_SELECTED";
export const UPDATE_READ = "UPDATE_READ";
export const UPDATE_UNREAD = "UPDATE_UNREAD";
export const UPDATE_ALL = "UPDATE_ALL";
export const UPDATE_LABEL_STATE = "UPDATE_LABEL_STATE";

export function fetchMessages() {
	return async (dispatch, getState, { Api }) => {
		const messages = await Api.fetchMessages();
		messages.forEach(message => {
			message.selected = false;
		});
		console.log(messages);
		return dispatch({
			type: MESSAGES_RECEIVED,
			messages
		});
	};
}

export function toggleStarred(id, initialValue) {
	return async (dispatch, getState) => {
		await fetch(`http://localhost:8181/api/messages`, {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				messageIds: [id],
				command: "star",
				star: !initialValue
			})
		});
		return dispatch({
			type: TOGGLE_STARRED,
			id
		});
	};
}

export function toggleSelected(id, initialValue) {
	return (dispatch, getState) => {
		return dispatch({
			type: TOGGLE_SELECTED,
			id
		});
	};
}
export function updateReadMessages() {
	return async (dispatch, getState) => {
		let messageIds = [];

		getState().messages.forEach(msg => {
			if (msg.selected === true) {
				messageIds.push(msg.id);
			}
		});
		await fetch(`http://localhost:8181/api/messages`, {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				messageIds: [messageIds],
				command: "read",
				read: true
			})
		});
		return dispatch({
			type: UPDATE_READ
		});
	};
}

export function updateUnreadMessages() {
	return async (dispatch, getState) => {
		let messageIds = [];

		getState().messages.forEach(msg => {
			if (msg.selected === true) {
				messageIds.push(msg.id);
			}
		});
		await fetch(`http://localhost:8181/api/messages`, {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				messageIds: [messageIds],
				command: "read",
				read: false
			})
		});
		return dispatch({
			type: UPDATE_UNREAD
		});
	};
}
export function updateAll(update) {
	return (dispatch, getState) => {
		return dispatch({
			type: UPDATE_ALL,
			update
		});
	};
}

function addNewLabel(msg, newLabel) {
	if (!msg.labels.includes(newLabel)) {
		msg.labels.push(newLabel);
	}
	return { labels: msg.labels };
}

function deleteSelectedLabel(msg, newLabel) {
	let index = msg.labels.indexOf(newLabel);
	msg.labels.splice(index, 1);
	return { labels: msg.labels };
}

export function updateLabelState(newLabel, add) {
	return async (dispatch, getState) => {
		let messages = [];
		let messageIds = [];
		let msgLabels;
		getState().messages.forEach(msg => {
			if (msg.selected === true) {
				if (add === "add") {
					msgLabels = addNewLabel(msg, newLabel);
					messageIds.push(msg.id);
				} else {
					msgLabels = deleteSelectedLabel(msg, newLabel);
					messageIds.push(msg.id);
				}
				messages.push(Object.assign({}, msg, msgLabels));
			} else {
				messages.push(msg);
			}
		});
		if (add === "add") {
			await fetch(`http://localhost:8181/api/messages`, {
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
			});
			return dispatch({
				type: UPDATE_LABEL_STATE,
				newLabel,
				add
			});
		} else {
			await fetch(`http://localhost:8181/api/messages`, {
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
			});
			return dispatch({
				type: UPDATE_LABEL_STATE,
				newLabel
			});
		}
	};
}
