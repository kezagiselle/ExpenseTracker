import jwt from 'jsonwebtoken';

const roleAuthorization = async(req, res, next ) =>{
     try{
        //Extract token from headers
        const token = req.headers.roleAuthorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message: 'Authentication is missing' });
        }
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(403).json({message: 'Invalid token' });
        }
        //check if user has role
        if(decoded.role!== req.body.role){
            return res.status(403).json({message: 'You are not authorized to perform this action' });
        }
        req.user = decoded;
        next()
        }catch(err) {
            return res.status(401).json({message: 'Invalid or expired token'});
     }
};

const authorization = {
    roleAuthorization
};

export default authorization;