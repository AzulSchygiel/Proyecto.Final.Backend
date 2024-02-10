export const checkAuthenticated = (req, res, next) => {
    if (req.session) {
        next()
    } else {
        return res.json({ status: "Error", message: "necesitas autentificarte" })
    }
}