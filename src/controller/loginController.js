const loginLocal = async (req, res) => {
  const arrMess = req.flash("data");
  const error = arrMess[0] ? arrMess[0] : "";
  const userName = arrMess[1] ? arrMess[1] : "";

  return res.render("login.ejs", { error: error, userName: userName });
};
module.exports = { loginLocal };
