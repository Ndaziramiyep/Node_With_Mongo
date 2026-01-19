import { Response, NextFunction } from 'express';
import { AuthRequest } from './authenticate';
import User, { UserRole } from '../models/User';

export const adminAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== UserRole.ADMIN) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Authorization failed' });
  }
};