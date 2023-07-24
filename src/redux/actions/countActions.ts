// src/redux/actions/countActions.ts
import { INCREMENT, DECREMENT } from './actionTypes';

export const incrementAction = () => ({ type: INCREMENT });
export const decrementAction = () => ({ type: DECREMENT });
