import {combineReducers} from "redux";
import bookReducer from "./Reducer";

const rootReducer = combineReducers({books: bookReducer});

export default rootReducer
