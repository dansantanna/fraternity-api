import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import User from 'models/user';
import jwt from 'config/jwt';

export default () => {
  passport.use(
    new Strategy(
      {
        secretOrKey: jwt.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async ({ _id, exp }, done) => {
        const user = await User.findById(_id);
        if (!exp || Date.now() >= exp) done('Token expired');
        if (!user) done('Invalid Token');
        else done(null, user);
      },
    ),
  );
  return passport.authenticate('jwt', { session: jwt.session });
};
