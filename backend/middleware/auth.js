import User from '../models/User.js';

export const getUserFromStorage = async (req, res, next) => {
  try {
    // Get user ID from request body, params, or query
    const userId = req.body.userId || req.params.userId || req.query.userId;
    
    if (userId) {
      const user = await User.findById(userId).select('-password');
      if (user) {
        req.user = user;
        return next();
      }
    }
    
    // If no specific user ID, return error
    return res.status(401).json({ message: 'User ID required' });
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Authentication error' });
  }
};