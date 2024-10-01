import React, { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import TodoList from './TodoList';
import { Button, Modal } from 'antd';

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [filter, setFilter] = useState<string>('all');
    const [search, setSearch] = useState<string>('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Are you sure you want to clear all todos?');

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = () => {
        if (newTodo.trim() === '') return;
        const newTodoItem: Todo = {
            id: Date.now(),
            text: newTodo,
            completed: false,
            deleted: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    };

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, deleted: true } : todo
        ));
    };

    const handleRestoreTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, deleted: false } : todo
        ));
    };

    const handleToggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleEditTodo = (id: number, text: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text } : todo
        ));
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setModalText('Clearing all todos...');
        setConfirmLoading(true);
        setTimeout(() => {
            setTodos([]);
            setIsModalOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed && !todo.deleted;
        if (filter === 'uncompleted') return !todo.completed && !todo.deleted;
        if (filter === 'deleted') return todo.deleted;
        return !todo.deleted;
    }).filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className='container min-h-screen mx-auto py-4 max-w-[550px]'>
            <div className="p-6 bg-gray-100 h-full border border-gray-300 rounded-2xl">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                <div className="w-full mb-4">
                    <input
                        className="w-full max-w-[330px] p-2 border border-gray-300 rounded-md mr-2"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add new todo"
                        maxLength={26}
                    />
                    <button className="btn" onClick={handleAddTodo}>Add</button>
                    <Button danger type="primary" className="py-5 mx-2 transition-all duration-300 hover:scale-90" onClick={showModal}>Clear All</Button>
                    <Modal
                        title="Clear All Todos"
                        open={isModalOpen}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <p>{modalText}</p>
                    </Modal>
                </div>
                <div className='flex justify-between items-center'>
                    <div className="mb-4">
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search todos"
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            className="p-2 border rounded-md cursor-pointer border-none outline-none border-gray-200"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>
                            <option value="deleted">Deleted</option>
                        </select>
                    </div>
                </div>
                <TodoList
                    todos={filteredTodos}
                    onDelete={handleDeleteTodo}
                    onToggle={handleToggleTodo}
                    onEdit={handleEditTodo}
                    onRestore={handleRestoreTodo}
                />
            </div>
        </div>
    );
};

export default TodoApp;