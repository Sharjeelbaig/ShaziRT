// src/redux/reducers/countReducer.ts
const initialState = 0;
interface Action {
    type:string,
    payload?: string | number
}
function countReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

export default countReducer;
