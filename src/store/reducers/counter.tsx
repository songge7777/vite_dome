import * as types from "../action-types";
import { Action } from "../actions";
export interface CounterState{
  number:number;
}
const initialState: CounterState = { number: 0 };
export default function (state: CounterState = initialState, action: Action): CounterState {
  switch (action.type) {
    case types.ADD:
      return { ...state, number: state.number + 1 };
    case types.MINUS:
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
}