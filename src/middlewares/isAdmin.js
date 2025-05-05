export default function isAdmin (req, res, next) {
    if (req.session?.isAuth && req.session.isAdmin) {
        return next();
    }

    res.status(401).send("Acesso permitido apenas ao admin");
};