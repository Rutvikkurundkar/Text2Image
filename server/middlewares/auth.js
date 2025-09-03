// import jwt from 'jsonwebtoken'

// const userAuth = async(req, res, next)=>{
//     const {token} = req.headers;

//     if(!token){
//         return res.json({success: false, message: 'Not Authorized. Login Again'});
//     }
//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//         if(tokenDecode.id){
//             req.body.userId = tokenDecode.id;
//         }else{
//             return res.json({success: false, message: 'Not Authorized. Login Again'});
//         }

//         next();
//     } catch (error) {
//         res.json({success: false, message: error.message});
//     }
// };

// export default userAuth;
import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id }; // ✅ Store user info safely
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Invalid Token. Login Again' });
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default userAuth;
