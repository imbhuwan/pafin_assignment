// app.ts
import express from 'express';
import dotenv from 'dotenv' // Import dotenv
import bodyParser from 'body-parser';

dotenv.config();

import userRoutes from './routes/usersRoutes';
import authMiddleware from './middleware/authentication'; // Import jsonwebtoken

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Apply routes with authMiddleware
app.use('/api', authMiddleware, userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
