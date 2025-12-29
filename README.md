# Todo App

A simple CRUD todo application with MongoDB backend.

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js serverless functions
- Database: MongoDB Atlas

## Deploy to Vercel

1. Fork/clone this repository
2. Sign up at [vercel.com](https://vercel.com)
3. Import this GitHub repository
4. Add environment variable:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
5. Deploy!

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```
MONGODB_URI=mongodb://localhost:27017/todo
```

3. Run development server:
```bash
npm run dev
```
