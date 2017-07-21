import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./reducers";
import Api from "./Api";

// const updateCompose = store => next => action => {
// 	let compose = store.getState().compose;
//
// 	if (action.type === "COMPOSE_MESSAGE") {
// 		store.dispatch({
// 			type: "RENDER_COMPOSE",
// 			compose
// 		});
// 	}
// 	next(action);
// };
const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(
		thunkMiddleware.withExtraArgument({ Api }),
		// updateCompose,
		logger
	)
);

export default store;
