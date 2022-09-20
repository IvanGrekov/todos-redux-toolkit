import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from './Counter';
import { RootState } from '../store';
import { toggle } from '../store/themeSlice';

import './Header.scss';

const Header = () => {
  const { value: theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const changeTheme = useCallback(() => dispatch(toggle()), [dispatch]);

  return (
    <section className={`header-section header-section--${theme}`}>
      <header
        className={`header-section__head header-section__head--${theme}`}
      >
        <h2 className="header-section__title">Redux</h2>
        <button onClick={changeTheme} className={`button button--${theme}`}>
          Change theme
        </button>
      </header>

      <Counter theme={theme} />
    </section>
  );
};

export default Header;
