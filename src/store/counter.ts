import { CounterType } from "../types";

export interface ICounterAction {
  type: string;
  value?: CounterType['value'];
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
  [ADD]: (value: CounterType['value']): ICounterAction => ({ type: ADD, value }),
  [SUBTRACT]: (value: CounterType['value']): ICounterAction => ({ type: SUBTRACT, value }),
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
  state: CounterType = { value: 0 },
  action: ICounterAction = { type: '' },
) {
  switch (action.type) {
    case INCREASE:
      return {
        value: state.value + 1,
      };

    case DECREASE:
      return {
        value: state.value - 1,
      };

    case ADD:
      return {
        value: state.value + (action?.value || 0),
      };

    case SUBTRACT:
      return {
        value: state.value - (action?.value || 0),
      };

    case CLEAR:
      return {
        value: 0,
      };

    default:
      return state;
  }
}

export default counterReducer;
