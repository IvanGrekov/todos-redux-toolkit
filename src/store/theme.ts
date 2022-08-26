import { ThemeType } from "../types";

export interface IThemeAction {
  type: string;
}

//#region ACTION_TYPES
export const TOGGLE = 'theme/TOGGLE';
//#endregion

//#region ACTION_CREATORS
export const actions = {
  [TOGGLE]: () => ({ type: TOGGLE }),
};
//#endregion

function themeReducer(
  state: ThemeType | undefined = 'light',
  action: IThemeAction = { type: '' },
) {
  switch (action.type) {
    case TOGGLE:
      return state === 'light' ? 'dark' : 'light';

    default:
      return state;
  }
}

export default themeReducer;
