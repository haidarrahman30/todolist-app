export type TUser = {
    id: number;
    username: string;
    password: string;
    todos: Todo[];
};

export type Todo = {
    id: number;
    task: string;
    reminder: string;
    category: string;
    completed: boolean;
};

