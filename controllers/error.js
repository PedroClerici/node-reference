export function get404(req, res) {
  res.render("404.pug", {
    pageTitle: "Page Not Found :(",
    isAuthenticated: req.isLoggedIn,
  });
}
