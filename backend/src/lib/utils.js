import jwt from 'jsonwebtoken'

export const generateToken = (userId, res)=>{
    const token = jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.cookie('token', token, {
        httpOnly: true, //prevent XSS attacks cross-site scripting attacls
        secure: true , //
        sameSite: 'strict', //CSRF attacks cross-site request forgery attacks
        maxAge: 1 * 24 * 60 * 60 * 1000
    })  

    return token
}