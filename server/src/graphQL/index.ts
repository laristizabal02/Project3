import apiRoutes from './api/index.js';
import express from 'express';
import authRoutes from './auth-routes.js';
import coursesRoutes from './coursesRoutes.js';
import departmentRoutes from './departmentRoutes.js';
import studentRoutes from './studentsRoutes.js';
import { authenticateToken } from '../middleware/auth.js';
//import path from 'path';

const router = express.Router();

// Root route (optional for API message)
/*
router.get('/', (_, res) => {
    res.send('Welcome to the Course Registration API');
  });*/

// Auth routes
router.use('/auth', authRoutes);

// Protected API routes
router.use('/api', authenticateToken, apiRoutes);

// Other routes
router.use('/courses', coursesRoutes);
router.use('/departments', departmentRoutes);
router.use('/students', studentRoutes);

// Fallback route for React frontend
/*router.get('/', (_, res) => {
//  const clientBuildPath = path.join(__dirname, '../client/build');
  res.sendFile(path.resolve('../client/dist', 'index.html'));
});*/

export default router;