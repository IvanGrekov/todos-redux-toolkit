import { ThemeType } from '../types';

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
    state: ThemeType = {
        value: 'light',
    },
    action: IThemeAction = { type: '' },
) {
    switch (action.type) {
        case TOGGLE:
            return {
                value: state.value === 'light' ? 'dark' : 'light',
            };

        default:
            return state;
    }
}

export default themeReducer;
