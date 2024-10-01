import React from 'react';
import { Todo } from '../types/todo';
import { Button } from 'antd'

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (id: number, text: string) => void;
    onRestore: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggle, onEdit, onRestore }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [newText, setNewText] = React.useState(todo.text);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(todo.id, newText);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-md mb-2 gap-4">
            {isEditing ? (
                <input
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                />
            ) : (
                <span className={`flex-grow ${todo.completed ? 'line-through' : ''} ${todo.deleted ? 'text-gray-400' : ''}`}>
                    {todo.text}
                </span>
            )}
            <div className="flex items-center space-x-2">
                {isEditing ? (
                    <button className="btn" onClick={handleSave}>Save</button>
                ) : (
                    <>
                        {!todo.deleted && <button className="btn" onClick={handleEdit}>Edit</button>}
                        {!todo.deleted && <button className="btn" onClick={() => onToggle(todo.id)}>Complete</button>}
                        {!todo.deleted ? (
                            <Button danger type='primary' className='py-[18px]' onClick={() => onDelete(todo.id)}>Delete</Button>
                        ) : (
                            <button className="btn" onClick={() => onRestore(todo.id)}>Restore</button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoItem;