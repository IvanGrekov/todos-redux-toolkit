import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCounter } from '../../store';
import {
  actions as counterActions,
  DECREASE,
  INCREASE,
  ASYNC_INCREASE,
} from '../../store/counter';
import { ThemeType } from '../../types';

interface CounterProps {
  theme: ThemeType;
}

const Counter: React.FC<CounterProps> = ({ theme }) => {
  const dispatch = useDispatch();
  const counter = useSelector(getCounter);

  const increaseCounter = useCallback(
    () => dispatch(counterActions[INCREASE]()),
    []
  );

  const decreaseCounter = useCallback(
    () => dispatch(counterActions[DECREASE]()),
    []
  );

  const asyncAction = useCallback(
    () => dispatch(counterActions[ASYNC_INCREASE]()),
    []
  );

  return (
    <article className={`counter-wrapper counter-wrapper--${theme}`}>
      <div className="minor-row">
        <h3 className="counter-title">Counter</h3>
      </div>

      <div className="main-row">
        <button
          onClick={increaseCounter}
          className={`button button--green button--${theme}`}
        >
          +
        </button>
        <span>{counter}</span>
        <button
          onClick={decreaseCounter}
          className={`button button--red button--${theme}`}
        >
          -
        </button>
      </div>

      <div className="minor-row">
        <button
          onClick={asyncAction}
          className={`button button--blue button--${theme}`}
        >
          Async
        </button>
      </div>
    </article>
  );
};

export default Counter;
