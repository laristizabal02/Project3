import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the interface for the JWT payload
interface JwtPayload {
  username: string;
  role_type_id: number;
}

// Middleware function to authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present
  if (authHeader) {
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    // Get the secret key from the environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Verify the JWT token
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Send forbidden status if the token is invalid
      }

      // Attach the user information to the request object
      req.user = user as JwtPayload;
      return next(); // Call the next middleware function
    });
  } else {
    res.sendStatus(401); // Send unauthorized status if no authorization header is present
  }
};
function isJwtPayload(user: any): user is JwtPayload {
  return user && typeof user.username === 'string' && typeof user.role_type_id === 'number';
}

export const authorizeRole = (allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if req.user is valid and of type JwtPayload, and if role matches allowedRoles
    if (!req.user || !isJwtPayload(req.user) || !allowedRoles.includes(req.user.role_type_id)) {
      return res.sendStatus(403); // Forbidden if the user doesn't have the correct role or isn't authenticated
    }
    return next(); // If valid, allow access by calling next()
  };
};
