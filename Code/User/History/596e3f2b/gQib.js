import jwt from 'jsonwebtoken';

// *Authorization

export const verifyToken = async ( req, res, next ) => {
    try{
        let token = req.header("Authorization");

        if ( !token ){
            return res.status(403).send("Access Denied");
            // !Token Was Not Sent.
        }
        
        if ( token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        
        const verified = jwt.verify( token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    }
    catch(err){
       return res.status(400).json({ message : err.message });
    }
}