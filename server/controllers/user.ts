import { Request, Response, NextFunction } from "express";
const rug: any = require("random-username-generator");
import { PassportStatic } from "passport";
import User, { IUser } from "../models/user";

export class UserController {

  public passport: PassportStatic;

  constructor(passport: PassportStatic) {
    this.passport = passport;

    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
  }

  public getUserSession(req: Request, res: Response, next: NextFunction):any {
    if (req.session !== undefined){
      if(req.session.hasOwnProperty('passport')){
        const id = req.session.passport.user;
        User.findById(id, function (err, user) {
          if (err) {
            return next(err);
          }
          if (user) {
            return res.json({
              _id: user.id,
              username: user.username,
              isOnline: user.isOnline
            });
          }
          return res.json({ message: "not found" });
        });
      }     
    }
    // return res.json({ message: "no session"});
  }


  public generateNew(_: any, res: Response): any {
    rug.setSeperator("_");
    let username: string = rug.generate().toLowerCase();
    return res.status(200).json({
      username: username
    });
  }

  public signup(req: Request, res: Response, next: NextFunction): any {
    this.passport.authenticate("signup", (err: any, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }

      req.login(user, err => {
        if (err) { return next(err); }

        user.lastActive = new Date();
        user.isOnline = true;
        return res.json({
          _id: user.id,
          username: user.username,
          isOnline: user.isOnline
        });
      });
    })(req, res, next);
  }

  public signin(req: Request, res: Response, next: NextFunction): any {
    this.passport.authenticate("signin", (err: any, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }

      req.login(user, err => {
        if (err) { return next(err); }

        user.lastActive = new Date();
        user.isOnline = true;
        return res.json({
          _id: user.id,
          username: user.username,
          isOnline: user.isOnline
        });
      });
    })(req, res, next);
  }

  public logout(req: Request, res: Response, next: NextFunction): any {
    req.logout();
    res.json({ message: "logged out successfully" });

    // // OR
    // req.session.destroy(function (err) {
    //   if (err) { return next(err) }

    //   return res.json({ message: "User logged out successfully" });
    // });
  }

  public findByUsername(req: Request, res: Response, next: NextFunction): any {
    console.log(req.query.username);
    User.findOne({ "username": req.query.username }, (err: any, user: IUser) => {
      if (err) {
        return next(err);
      }
      if(user) {
        return res.json(user);
      }
      return res.json({message:"not found"});
    });
  }
}