export interface ITodo {
    id: string;
    title: string;
    completed: boolean;
    isLoading?: boolean;
}

export interface ThemeType {
    value: 'light' | 'dark';
}

export interface CounterType {
    value: number;
}

export interface TodosType {
    todos: ITodo[];
    loading: boolean;
    addingTodo: boolean;
    error: any;
}
