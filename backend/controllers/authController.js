import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Adjust path as needed
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authGoogle = async (req, res) => {
    const { credential } = req.body;
    try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const jwtPayload = ticket.getPayload();

    const userexist = await User.findOne({ email: jwtPayload.email });
    if (userexist) {
    const token = jwt.sign({ _id: userexist._id, role: userexist.role}, process.env.JWT_SECRET, { expiresIn: '7d' });

    const payload = {
        email: userexist.email,
        name: userexist.name,
        givenName: userexist.givenName,
        familyName: userexist.familyName,
        picture: userexist.picture,
        shippingAddress: userexist.shippingAddress
    };

    res.cookie("token", token, {
        httpOnly: true,            // JS can't touch it (security)
        secure: true,              // required for HTTPS (Vercel & Render both use HTTPS)
        sameSite: "none", 
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ payload });
    } else {
    const user = await User.create({
        email: jwtPayload.email,
        sub: jwtPayload.sub,
        emailVerified: jwtPayload.email_verified,
        name: jwtPayload.name,
        givenName: jwtPayload.given_name,
        familyName: jwtPayload.family_name,
        picture: jwtPayload.picture,
        shippingAddress: {
            address: jwtPayload.shippingAddress?.address || '',
            city: jwtPayload.shippingAddress?.city || '',
            postalCode: jwtPayload.shippingAddress?.postalCode || '',
            country: jwtPayload.shippingAddress?.country || ''
        },
        iss: jwtPayload.iss,
        azp: jwtPayload.azp,
        aud: jwtPayload.aud,
        nbf: jwtPayload.nbf,
        iat: jwtPayload.iat,
        exp: jwtPayload.exp,
        jti: jwtPayload.jti
    });

    const token = jwt.sign({ _id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const payload = {
        email: user.email,
        name: user.name,
        givenName: user.givenName,
        familyName: user.familyName,
        picture: user.picture,
        shippingAddress: user.shippingAddress
    };

    res.cookie("token", token, {
        httpOnly: true,            // JS can't touch it (security)
        secure: true,              // required for HTTPS (Vercel & Render both use HTTPS)
        sameSite: "none", 
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ payload });
    }}
    catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid Google credential' });
    }
}
