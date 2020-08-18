import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import { User, UserAuth } from './models';
import JWT from 'jsonwebtoken';
import _ from 'lodash';

require('dotenv').config();

const authFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const jwtOptions = {
    secretOrKey: process.env.TOKEN_SECRET,
    //we expect the user to send the token as a query parameter with the name 'secret_token'
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use('signup', new LocalStrategy(authFields, async (email, password, done) => {
    try {
        const user = await User.create({ email, password});
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

passport.use('login', new LocalStrategy(authFields, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if(!user)
      return done(null, false, { message : 'User not found'});

    const validate = await user.validatePassword(password);
    if(!validate)
      return done(null, false, { message : 'Wrong Password'});

    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JWTStrategy(jwtOptions, async (token, done) => {
    try {
        const user = token.user
        const userAuth = await UserAuth.findOne({
          where : {
            userId: user._id
          }
        });

        if(!userAuth)
          return done(null, false);

        const savedToken = JWT.decode(userAuth.token);
        console.log(token);
        console.log(savedToken);
        if(!_.isEqual(savedToken, token))
          return done(null, false);
          
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

export default passport;