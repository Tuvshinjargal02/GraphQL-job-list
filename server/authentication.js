import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

import { getUserByEmail } from "./controllers/user.js";

const secret = "wIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQ";

export const authenticationMiddleware = expressjwt({
    algorithms: ["HS256"],
    secret,
    credentialsRequired: false,
});

export async function handleLogin(req, res) {
    
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if(!user || user.password !== password){
        return res.sendStatus(401);
    };

    const data = {sub: user.id, email: user.email, companyId: user.companyId};

    const token = jwt.sign(data, secret);

    res.json({ token });
};