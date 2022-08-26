export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export type ThemeType = 'light' | 'dark';
export type CounterType = number;
export type TodosType = ITodo[];
