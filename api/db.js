const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Use MongoDB Atlas connection string
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo';
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean
});

export const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
export default connectDB;
