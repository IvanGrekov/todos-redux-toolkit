import { CounterType } from "../types";

export interface ICounterAction {
  type: string;
  value?: CounterType;
}

//#region ACTION_TYPES
export const INCREASE = 'counter/INCREASE';
export const ASYNC_INCREASE = 'counter/ASYNC_INCREASE';
export const DECREASE = 'counter/DECREASE';
export const ADD = 'counter/ADD';
export const SUBTRACT = 'counter/SUBTRACT';
export const CLEAR = 'counter/CLEAR';
//#endregion

//#region ACTION_CREATORS
export const actions = {
  [INCREASE]: (): ICounterAction => ({ type: INCREASE }),
  [DECREASE]: (): ICounterAction => ({ type: DECREASE }),
  [ADD]: (value: CounterType): ICounterAction => ({ type: ADD, value }),
  [SUBTRACT]: (value: CounterType): ICounterAction => ({ type: SUBTRACT, value }),
  [CLEAR]: (): ICounterAction => ({ type: CLEAR }),
  [ASYNC_INCREASE]: (delay: number = 0) => async(dispatch: Function) => {
    try {
      setTimeout(() => {
        dispatch(actions[INCREASE]());

        return 'success';
      }, delay)
    } catch(e) {
      console.warn('Error was occured during async increasing counter', e);
    }
  }
};
//#endregion

function counterReducer(
  state: CounterType | undefined = 0,
  action: ICounterAction = { type: '' },
) {
  switch (action.type) {
    case INCREASE:
      return state + 1;

    case DECREASE:
      return state - 1;

    case ADD:
      return state + (action?.value || 0);

    case SUBTRACT:
      return state - (action?.value || 0);

    case CLEAR:
      return 0;

    default:
      return state;
  }
}

export default counterReducer;
