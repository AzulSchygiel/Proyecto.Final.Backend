export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.session) {
            return res.redirect("/error")
        }
        if (!roles.includes(req.session.rol)) {
            return res.redirect("/error")
        }
        next(); 
    }
}