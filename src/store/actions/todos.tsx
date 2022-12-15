import { ADD_TODO } from "../action-types";
import { Todo} from "@/models";
export interface AddTodoAction {
  type: typeof ADD_TODO,
  payload:Todo
}

export function addTodo(todo:Todo): AddTodoAction {
  return { type: ADD_TODO,payload:todo };
}