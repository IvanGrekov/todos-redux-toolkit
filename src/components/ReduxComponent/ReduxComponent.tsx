import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme } from '../../store';
import { actions as themeActions, TOGGLE } from '../../store/theme';
import Counter from './Counter';

import './ReduxComponent.scss';

const ReduxComponent = ({}) => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  const changeTheme = useCallback(() => dispatch(themeActions[TOGGLE]()), []);

  return (
    <section className={`redux-component redux-component--${theme}`}>
      <header
        className={`redux-component__header redux-component__header--${theme}`}
      >
        <h2 className="redux-component__title">Redux</h2>
        <button onClick={changeTheme} className={`button button--${theme}`}>
          Change theme
        </button>
      </header>

      <Counter theme={theme} />
    </section>
  );
};

export default ReduxComponent;
