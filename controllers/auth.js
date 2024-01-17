import User from "../models/user.js";

export function getLogin(req, res) {
  res.render("auth/login.pug", {
    path: "/login",
    pageTitle: "Login",
  });
}

export function postLogin(req, res) {
  User.findById("656e50f4ba60fd89bc04a5fe")
    .then((user) => {
      req.session.user = user;
      req.session.save((error) => {
        console.log(error);
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function postLogout(req, res) {
  req.session.destroy((error) => {
    console.log(error);
    res.redirect("/");
  });
}
