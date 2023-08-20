import { nanoid } from 'nanoid';
import * as UserRepo from '../repository/user.js';
import { successResp, errorResp } from "../utils/response.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_ACCESSTOKEN = 'HIELMISULAEMAN';
const SECRET_REFRESHTOKEN = 'SULAEMANHIELMI';

export const getUsers = async (req, res, next) => {
    try {
        const [user] = await UserRepo.getData();
        successResp(res, "Success get users", user, 200)
    } catch (err) {
        console.log(err)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [user] = await UserRepo.getDataById(id);
        successResp(res, "Success get user", user, 200)
    } catch (err) {
        next(err)
    }
}

export const addUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const user_id = nanoid(10);
        const created_at = Date.now();
        bcrypt.hash(password, 10, async (err, hash) => {
            const [result] = await UserRepo.createData(user_id, name, email, hash, created_at);
            const [user] = await UserRepo.getDataById(user_id)
            successResp(res, "success register user", user, 201)
        })
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { email, name } = req.body
        const updateAt = Date.now();

        const [book] = await UserRepo.getDataById(id);
        if (book.length !== 0) {
            const [result] = await UserRepo.updateData(id, name, email, updateAt);
            const [updateBook] = await UserRepo.getDataById(id);
            successResp(res, "User has been updated", updateBook, 200);
        } else {
            throw Error("User doesn't exist");
        }
    } catch (err) {
        next(err)
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [result] = await UserRepo.deleteData(id);
        successResp(res, "User has been deleted", {}, 200);
    } catch (err) {
        next(err)
    }
}

export const authUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const [result] = await UserRepo.getUserByEmail(email);
        if (result[0].length <= 0) {
            errorResp(res, "Failed to login, email doen't exist", 400);
        }
        const user = result[0]
        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                const claim = {
                    "id": user.user_id,
                    "email": user.email,
                    "name": user.name,
                    "created_at": user.created_at,
                    "updated_at": user.updated_at
                }
                const accessToken = jwt.sign(claim, SECRET_ACCESSTOKEN, { expiresIn: '15m' });
                const refreshToken = jwt.sign(claim, SECRET_REFRESHTOKEN, { expiresIn: '30m' });

                // update user_token
                const [result] = await UserRepo.updateToken(claim.id, refreshToken);

                if (result.affectedRows <= 0) {
                    errorResp(res, "failed to refrsh token", 400);
                } else {
                    successResp(res, "login succes", { accessToken, refreshToken }, 200)
                }
            } else {
                errorResp(res, "password doesn't match", 400);
            }
        });
    } catch (err) {
        next(err)
    }
}

export const refreshToken = (req, res, next) => {
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
    } catch (err) {
        next(err);
    }
}
