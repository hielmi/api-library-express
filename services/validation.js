import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as validationRepo from '../repository/validation.js';
import { successResp, errorResp } from '../utils/response.js';

const SECRET_ACCESSTOKEN = 'HIELMISULAEMAN';
const SECRET_REFRESHTOKEN = 'SULAEMANHIELMI';

const generateTokens = (user) => {
    const claim = {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
    };

    const accessToken = jwt.sign(claim, SECRET_ACCESSTOKEN, { expiresIn: '15m' });
    const refreshToken = jwt.sign(claim, SECRET_REFRESHTOKEN, { expiresIn: '30m' });

    return { accessToken, refreshToken };
};

export const authUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const [userResult] = await validationRepo.getUserByEmail(email);
        const user = userResult[0];

        if (!user) {
            return errorResp(res, "Failed to login, email doesn't exist", 400);
        }

        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                const { accessToken, refreshToken } = generateTokens(user);

                const [token] = await validationRepo.getRefreshToken(user.user_id);
                const timestamp = new Date().toISOString();

                let result;

                if (token.length > 0) {
                    result = await validationRepo.updateRefreshToken(user.user_id, refreshToken, timestamp);
                } else {
                    result = validationRepo.createToken(user.user_id, refreshToken, timestamp);
                }

                if (result[0].affectedRows > 0) {
                    successResp(res, "Login successful", { accessToken, refreshToken }, 200);
                } else {
                    errorResp(res, "Failed to login", 404);
                }
            } else {
                errorResp(res, "Password doesn't match", 400);
            }
        });
    } catch (error) {
        next(error);
    }
};

export const validateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const accessToken = authHeader.slice(7);
            const decoded = jwt.verify(accessToken, SECRET_ACCESSTOKEN);
            if (decoded) {
            }
            next();
        } else {
            throw Error("Unauthorized!")
        }
    } catch (err) {
        err.statusCode = 401;
        next(err);
    }
};

export const refreshAccessToken = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const { refresh_token } = req.body;

        const [result] = await validationRepo.getRefreshToken(user_id);
        if (!result[0] || refresh_token !== result[0].refresh_token) {
            throw new Error("Failed to refresh token");
        }

        const decoded = jwt.verify(refresh_token, SECRET_REFRESHTOKEN);
        const { accessToken, refreshToken } = generateTokens(decoded);

        const updatedAt = new Date().toISOString();
        const [updateResult] = await validationRepo.updateRefreshToken(user_id, refreshToken, updatedAt);

        if (updateResult.affectedRows === 1) {
            successResp(res, "Success refresh token", { accessToken, refreshToken }, 200);
        } else {
            throw new Error("Failed to refresh token");
        }
    } catch (err) {
        next(err);
    }
};
