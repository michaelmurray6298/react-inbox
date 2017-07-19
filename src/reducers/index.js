import { combineReducers } from "redux";
import {
	MESSAGES_RECEIVED,
	TOGGLE_STARRED,
	TOGGLE_SELECTED,
	UPDATE_READ,
	UPDATE_UNREAD,
	UPDATE_ALL,
	UPDATE_LABEL_STATE
} from "../actions";

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

function messages(state = [], action) {
	switch (action.type) {
		case MESSAGES_RECEIVED:
			//if action too old, do nothing
			const { messages } = action;
			return [...messages];

		case TOGGLE_STARRED:
			return state.map(message => {
				if (message.id === action.id) {
					message.starred = !message.starred;
				}
				return message;
			});
		case TOGGLE_SELECTED:
			return state.map(message => {
				if (message.id === action.id) {
					message.selected = !message.selected;
				}
				return message;
			});
		case UPDATE_READ:
			return state.map(message => {
				if (message.selected === true) {
					message.read = true;
				}
				return message;
			});
		case UPDATE_UNREAD:
			return state.map(message => {
				if (message.selected === true) {
					message.read = false;
				}
				return message;
			});
		case UPDATE_ALL:
			return state.map(msg => Object.assign(msg, action.update));

		case UPDATE_LABEL_STATE:
			let msgs = [];
			let msgLabels;
			return state.map(msg => {
				if (msg.selected === true) {
					console.log(action.add);
					if (action.add === "add") {
						msgLabels = addNewLabel(msg, action.newLabel);
					} else {
						msgLabels = deleteSelectedLabel(msg, action.newLabel);
					}
					msgs.push(Object.assign({}, msg, msgLabels));
				} else {
					msgs.push(msg);
				}
				return Object.assign({}, ...msgs, msg);
			});

		default:
			return state;
	}
}

export default combineReducers({
	messages
});
