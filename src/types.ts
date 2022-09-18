export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export interface ThemeType {
  value: 'light' | 'dark';
};

export interface CounterType {
  value: number;
};

export interface TodosType {
  todos: ITodo[]
};
