import {jwt} from "jsonwebtoken";
dotenv.config();


export function authenticateToken(req, res, next){
    const token = generateJWT(req, res, next);
    // const secretKey = crypto.randomBytes(32).toString('hex');

    jwt.sign({user: 1}, process.env.SECRET_KEY, {expiresIn: '1h'}); //sign the token with the secret key
    console.log(token);

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            console.log('Token is invalid');
    }
    else {
        console.log('Decoded Token:', decoded);
    }
  });

    //adding token to cookies
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000 // 1 hour
    });
}