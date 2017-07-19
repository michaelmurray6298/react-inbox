import { combineReducers } from "redux";
import {
	MESSAGES_RECEIVED,
	TOGGLE_STARRED,
	TOGGLE_SELECTED,
	UPDATE_READ,
	UPDATE_UNREAD,
	UPDATE_ALL,
	UPDATE_LABEL_STATE,
	UPDATE_REMOVED_MESSAGES,
	RENDER_COMPOSE,
	COMPOSE_MESSAGE
} from "../actions";

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
			const msgs = action.messages;
			return [...msgs];
		case UPDATE_REMOVED_MESSAGES:
			let newMessages = action.messages;
			return [...newMessages];

		case COMPOSE_MESSAGE:
			const updatedMessage = action.data;
			return [...state, updatedMessage];

		default:
			return state;
	}
}
function compose(state = false, action) {
	switch (action.type) {
		case RENDER_COMPOSE:
			return !action.compose;
		default:
			return state;
	}
}

export default combineReducers({
	messages,
	compose
});
