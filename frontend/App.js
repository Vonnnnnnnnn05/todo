import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
      .then(res => res.json())
      .then(todo => setTodos([...todos, todo]));
    setText('');
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter(t => t._id !== id)));
  };

  const toggleTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, { method: 'PUT' })
      .then(res => res.json())
      .then(updated => setTodos(todos.map(t => t._id === id ? updated : t)));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo App</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <input 
              type="checkbox" 
              checked={todo.done} 
              onChange={() => toggleTodo(todo._id)} 
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;