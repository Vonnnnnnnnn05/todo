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

  const { id } = req.query;

  try {
    if (req.method === 'PUT') {
      // Update todo
      const todo = await Todo.findByIdAndUpdate(
        id,
        { completed: req.body.completed },
        { new: true }
      );
      return res.status(200).json(todo);
    }

    if (req.method === 'DELETE') {
      // Delete todo
      await Todo.findByIdAndDelete(id);
      return res.status(200).json({ message: 'deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
