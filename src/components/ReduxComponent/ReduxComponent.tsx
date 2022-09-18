import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from './Counter';
import { RootState } from '../../store';
import { toggle } from '../../store/themeSlice';

import './ReduxComponent.scss';

const ReduxComponent = () => {
  const { value: theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const changeTheme = useCallback(() => dispatch(toggle()), [dispatch]);

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
