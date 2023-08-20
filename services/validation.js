import { successResp, errorResp } from "../utils/response.js";
import * as validationRepo from '../repository/validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_ACCESSTOKEN = 'HIELMISULAEMAN';
const SECRET_REFRESHTOKEN = 'SULAEMANHIELMI';


export const authUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const [result] = await validationRepo.getUserByEmail(email);
        if (result[0].length <= 0) {
            errorResp(res, "Failed to login, email doen't exist", 400);
        }
        const user = result[0]
        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                const claim = {
                    "user_id": user.user_id,
                    "email": user.email,
                    "name": user.name,
                }
                const accessToken = jwt.sign(claim, SECRET_ACCESSTOKEN, { expiresIn: '15m' });
                const refreshToken = jwt.sign(claim, SECRET_REFRESHTOKEN, { expiresIn: '30m' });

                // add user_tokens 
                const created_at = new Date().toISOString();
                const [result] = await validationRepo.createToken(user.user_id, refreshToken, created_at)

                if (result.affectedRows <= 0) {
                    errorResp(res, "failed to add token", 400);
                } else {
                    successResp(res, "login succes", { accessToken, refreshToken }, 200)
                }
            } else {
                errorResp(res, "password doesn't match", 400);
            }
        });
    } catch (error) {
        next(error)
    }
}

export const validateToken = (req, res, next) => {
    try {
        const { accessToken } = req.body.token;
        jwt.verify(accessToken, SECRET_ACCESSTOKEN, function (err, decoded) {
            if (decoded) {
                console.log(decoded);
            }
        });
        res.json({
            "message": "test doang"
        })
    } catch (error) {
        next(error);
    }
}

export const refreshAccessToken = async (req, res, next) => {
    try {
        const { user_id, refresh_token } = req.body;
        const [result] = await validationRepo.getRefreshToken(user_id);
        if (refresh_token === result[0].refresh_token) {

            const accessToken = jwt.sign(claim, SECRET_ACCESSTOKEN, { expiresIn: '15m' });
            const refreshToken = jwt.sign(claim, SECRET_REFRESHTOKEN, { expiresIn: '30m' });

            // update refresh token di db
            const updateAt = new Date().toISOString();
            const [result] = await validationRepo.updateRefreshToke(user_id, refreshToken, updateAt)

            if (result.affectedRows === 1) {
                successResp(res, "Success refresh token", { accessToken, refreshToken }, 200)
            } else {
                throw Error("Failed to refresh token")
            }
        } else {
            throw Error("Failed to refresh token")
        }
    } catch (err) {
        next(err);
    }
}

