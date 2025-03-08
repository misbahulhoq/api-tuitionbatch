"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyUser = (req, res, next) => {
    const { user } = req.body;
    if (user) {
        return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
};
exports.default = verifyUser;
