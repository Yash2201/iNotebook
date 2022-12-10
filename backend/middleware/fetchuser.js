const jwt = require('jsonwebtoken'); // For Secured Communication Between Client And Server
// JWT Signture
const JWT_SECRET = 'YashisGoodB$oy';

// Get the user Id from the jwt token
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object 
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"Please Authenticate using a valid token"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();    
    } catch (error) {
        res.status(401).send({error:"Please Authenticate using a valid token"});
    }
}

module.exports = fetchuser;