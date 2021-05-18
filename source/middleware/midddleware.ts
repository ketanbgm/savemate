import { NextFunction, Request, Response } from 'express';


const auth =  {
    authentication : () => {
        return (req: Request, res: Response, next: NextFunction) => {
            if(req.headers.authorization){
                var token = req.headers.authorization.split(' ')[1];
                if(token == '5488cb9ef9244c42abc0650dec68fba1'){
                    next();
                }else {
                    return res.status(403).json({
                        success :false,
                        message : "Invalid Token"
                    });
                }
            }else {
                return res.status(403).json({
                    success :false,
                    message : "Token is required"
                });
            }
        }
    }
}

export default auth;