import counter from "./counter";
import todos from "./todos";
import { combineReducers } from "redux";
import { Todo} from "../../models";
import history from "@/history";
import { connectRouter } from "connected-react-router";

interface CounterState{
  number:number;
}
interface TodosState {
  list: Array<Todo>;
}
const reducers = {
  counter,
  todos,
  router: connectRouter(history)
};
type ReducersType = typeof reducers;
type CombinedState = {
  [key in keyof ReducersType]: ReturnType<ReducersType[key]>
}
export { CombinedState, CounterState, TodosState};

const combinedReducer = combineReducers(reducers);
export default combinedReducer;