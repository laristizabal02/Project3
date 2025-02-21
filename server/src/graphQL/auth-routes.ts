import { Router, type Request, type Response, type NextFunction } from 'express';
import { User } from '../models/index.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password, role_type_id } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      res.status(401).json({ message: 'Authentication failed' });
      alert("El usuario no existe");
      return;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ message: 'Authentication failed' });
      alert("La constrasena no coincide");
      return;
    }

    const roleTypeIdAsNumber = Number(role_type_id);

    if (user.role_type_id !== roleTypeIdAsNumber) {
      res.status(401).json({ message: 'Role mismatch' });
      alert("El rol no coincide");
      return;
    }

    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    // Send the token and roleTypeId in the response
    res.json({ token, roleTypeId: roleTypeIdAsNumber });
  } catch (error) {
    next(error);
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);
router.get('/instructor', authenticateToken, authorizeRole([1]), (req: Request, res: Response) => {
  // Access the user object here to avoid the unused warning
  const username = req.user?.username; // This is just to show usage of req.user
  res.json({ message: `Welcome Instructor, ${username}` });
});

// Protected route for parents (GET /parent)
router.get('/parent', authenticateToken, authorizeRole([2]), (req: Request, res: Response) => {
  // Access the user object here to avoid the unused warning
  const username = req.user?.username; // This is just to show usage of req.user
  res.json({ message: `Welcome Parent, ${username}` });
});


export default router;