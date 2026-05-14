import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { errorHandler } from './middleware/errorHandler.js';
import baseRoutes from './routes/index.js';
import authRoutes from './modules/auth/auth.routes.ts';
import moodRoutes from './modules/moods/moods.routes.ts';
import journalRoutes from './modules/journal/journal.routes.ts';
import workoutRoutes from './modules/workouts/workouts.routes.ts';
import dashboardRoutes from './modules/dashboard/dashboard.routes.ts';
import therapyRoutes from './modules/therapy/therapy.routes.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', baseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/therapy', therapyRoutes);

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
