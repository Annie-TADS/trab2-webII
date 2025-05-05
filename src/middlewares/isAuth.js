export default function isAuth (req, res, next) {    
    if (req.session?.isAuth) {
        return next();
    }

    return res.redirect("/");
};