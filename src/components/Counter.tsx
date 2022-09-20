import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { increase, decrease } from '../store/counterSlice';
import { ThemeType } from '../types';

interface CounterProps {
  theme: ThemeType['value'];
}

const Counter: React.FC<CounterProps> = ({ theme }) => {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);

  const increaseCounter = useCallback(
    () => dispatch(increase()),
    [dispatch]
  );

  const decreaseCounter = useCallback(
    () => dispatch(decrease()),
    [dispatch]
  );

  // const asyncAction = useCallback(
  //   // @ts-ignore:next-line
  //   () => dispatch(counterActions[ASYNC_INCREASE](2000)),
  //   []
  // );

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

      {/* <div className="minor-row">
        <button
          onClick={asyncAction}
          className={`button button--blue button--${theme}`}
        >
          Async
        </button>
      </div> */}
    </article>
  );
};

export default Counter;
