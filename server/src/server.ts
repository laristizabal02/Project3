import express from 'express';
//import path from 'path';
//import { fileURLToPath } from 'url';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import cors from 'cors';

// Import all models and associations
import './models/index.js';
import './models/role_type.js';
import './models/person.js';
import './models/user.js';
import './models/student.js';
import './models/associations.js';

// Define __dirname for ES modules
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Adjust for Render
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Serve React frontend
//const clientBuildPath = path.join(__dirname, '../../client/build');
app.use(express.static("../client/dist"));

// Fallback route to serve React app
/*
app.get('*', (_, res) => {
  res.sendFile(path.resolve("../client/dist", 'index.html'));
});
*/
// Sync Sequelize and start the server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });