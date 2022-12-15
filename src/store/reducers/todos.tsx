import { ADD_TODO} from "../action-types";
import { Action } from "../actions";
import { Todo} from "../../models";
export interface TodosState {
  list: Array<Todo>;
}
const initialState: TodosState = { list: new Array<Todo>()};
export default function (state: TodosState = initialState, action: Action): TodosState {
  switch (action.type) {
    case ADD_TODO:
      return { list: [...state.list,action.payload]};
    default:
      return state;
  }
}