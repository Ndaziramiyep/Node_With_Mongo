import { Response, NextFunction } from 'express';
import { AuthRequest } from './authenticate';
import { UserRole } from '../models/User';

export const authorize = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userRole) {
      return res.status(403).json({ error: 'No role assigned. Contact admin for role assignment.' });
    }

    if (!roles.includes(req.userRole as UserRole)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};
