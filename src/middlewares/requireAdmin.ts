import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/User';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    isActive: boolean;
  };
}

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: 'Admin privileges required' });
  }

  if (!req.user.isActive) {
    return res.status(403).json({ error: 'Account is deactivated' });
  }

  next();
};