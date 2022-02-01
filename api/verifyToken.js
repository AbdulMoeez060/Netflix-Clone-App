const jwt = require("jsonwebtoken");


function verify(req,res,next){

    const authToken = req.headers.token;
    if (authToken) {
        const token = authToken.split(" ")[1];

        //console.log(token);
        jwt.verify(token , process.env.SECRET_KEY, (err,user)=>{
            if (err) {
                return res.status(403).json("Token Is not Valid!");
            }
            req.user=user;
            next();
        });

    }else{
        return res.status(401).json("You Are not Authenticated!");
    }
}

module.exports = verify;