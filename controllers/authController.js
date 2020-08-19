import { User, UserAuth } from './../models';
import Auth from './../auth';
import JWT from 'jsonwebtoken';

// require('dotenv').config();

async function register(req, res) {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
}

async function login(req, res, next) {
    Auth.authenticate('login', async (err, user, info) => {     
        try {
            if(err || !user){
                const error = new Error('An Error occurred')
                return next(error);
            }
            const { id, email, password } = user;
            
            const userAuth = await UserAuth.findOne({
                where: {
                    userId: user.id
                }
            });

            if(userAuth)
                return res.json({ token: userAuth.token });

            const body = { _id : user.id, email };
            const token = JWT.sign({ user : body }, process.env.TOKEN_SECRET);

            await UserAuth.create({ userId: id, token });
            
            return res.json({ token });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
}

async function logout(req, res) {
    const {user} = req;

    await UserAuth.destroy({ 
        where :{
            userId: user._id
        }
    });

    res.sendStatus(200);
}

module.exports = {
    register,
    login,
    logout,
};