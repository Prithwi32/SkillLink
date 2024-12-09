import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is required' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
};


export const adminAuth = (req,res,next) => {
    const token = req.cookies.token;

    try {
        if (!token) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
        if (!decoded) {
          return res.status(401).json({ success: false, message: "Invalid token" });
        }
    
        req.body.email = decoded.email;
        next();
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    
}

export default ensureAuthenticated;

