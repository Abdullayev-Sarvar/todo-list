import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (id: number, text: string) => void;
    onRestore: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onToggle, onEdit, onRestore }) => {
    return (
        <div className='border-t py-2'>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onRestore={onRestore}
                />
            ))}
        </div>
    );
};

export default TodoList;
