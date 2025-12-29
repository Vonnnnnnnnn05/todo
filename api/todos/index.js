import connectDB, { Todo } from '../db';

export default async function handler(req, res) {
  await connectDB();

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Get all todos
      const todos = await Todo.find();
      return res.status(200).json(todos);
    }

    if (req.method === 'POST') {
      // Create new todo
      const newTodo = new Todo({
        text: req.body.text,
        completed: false
      });
      await newTodo.save();
      return res.status(201).json(newTodo);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
