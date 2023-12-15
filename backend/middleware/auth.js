const { getUser } = require("../service/auth");

const restrictToLoggedInOnly = (req,res,next) => {
    const userUuid = req.cookies?.uuid;
    if(!userUuid){
        return res.redirect("/login");
    }
    const user = getUser(userUuid);
    if(!user){
        return res.redirect('/login');
    }
    next();
}

module.exports = {
    restrictToLoggedInOnly
}