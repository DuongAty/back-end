const jwt = require('jsonwebtoken')

const authMiddleWave = (req,res, next)=>{
    const token = req.headers.token?.split(' ')[1]
    if(!token){
        return res.status(404).json({
            message: 'Token is valid'
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err){
            return res.status(404).json({
                message: 'The authmtication',
                status: 'ERROR',
            })
        }
        if(user?.isAdmin){
            next()
        }else{
            return res.status(404).json({
                message: 'The authmtication',
                status: 'ERROR',
            })
        }
    });

}

const authUserMiddleWave = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1]; // Get token from headers
    const userId = req.params.id; // User ID from URL params

    if (!token) {
        return res.status(403).json({
            message: 'Token is missing',
            status: 'ERROR',
        });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid token or expired token',
                status: 'ERROR',
            });
        }

        // Log the user information for debugging (optional)
        console.log(user);

        // Allow access if the user is an admin or if the user is the same as the requested user
        if (user.id === userId) {
            next();
        } else {
            return res.status(403).json({
                message: 'Not authorized to access this resource',
                status: 'ERROR',
            });
        }
    });
};
module.exports={
    authMiddleWave,
    authUserMiddleWave
};