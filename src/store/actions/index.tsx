import { AddAction,MinusAction} from "./counter";
import { AddTodoAction } from "./todos";
export type Action = AddAction | MinusAction | AddTodoAction;