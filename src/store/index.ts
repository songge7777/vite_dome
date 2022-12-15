import { legacy_createStore as createStore, applyMiddleware} from "redux";

import combinedReducer from "./reducers";
import { routerMiddleware } from "connected-react-router";
import history from "@/history";

const store =applyMiddleware(routerMiddleware(history))(createStore)(combinedReducer);

export default store;