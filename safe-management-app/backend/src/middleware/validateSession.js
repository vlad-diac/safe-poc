const { getSessionById } = require('../services/sessionService');

/**
 * Middleware to validate that a session exists and belongs to the user
 */
async function validateSession(req, res, next) {
  try {
    const sessionId = req.params.sessionId || req.body.sessionId;
    
    if (!sessionId) {
      return res.status(400).json({
        error: 'Session ID is required'
      });
    }
    
    const session = await getSessionById(sessionId);
    
    if (!session) {
      return res.status(404).json({
        error: 'Session not found'
      });
    }
    
    // Attach session to request for use in route handlers
    req.session = session;
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Failed to validate session',
      details: error.message
    });
  }
}

/**
 * Middleware to ensure session belongs to authenticated user
 * (For future multi-user support)
 */
function validateSessionOwnership(req, res, next) {
  const userId = req.user?.id; // Assumes auth middleware sets req.user
  const session = req.session;
  
  if (session.userId && session.userId !== userId) {
    return res.status(403).json({
      error: 'Unauthorized: Session does not belong to you'
    });
  }
  
  next();
}

module.exports = {
  validateSession,
  validateSessionOwnership
};
