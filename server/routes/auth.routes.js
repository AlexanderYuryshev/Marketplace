const { Router } = require("express");
const models = require("../models");
const { check, validationResult } = require("express-validator");
const router = Router();

// `-` POST /signup \
router.post(
    "/signup",
    [
        check("name", "Incorrect name").isString(),
        check("password", "Minimal length is 6 symbols").isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            console.log("Body: ", req.body);
            const errs = validationResult(req);
            if (!errs.isEmpty()) {
                res.status(400).json({
                    errs: errs.array(),
                    message: "Incorrect data for registration",
                });
            } else {
                const { name, password } = req.body;
                const candidate = await models.User.findOne({ where: {name: name} });
                console.log("User search finished");
                if (candidate) {
                    res.status(400).json({ message: "Already exists" });
                } else {
                    const user = await models.User.create({ name: name, password: password });
                    res.status(201).json({ message: "Registered successfully" });
                }
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

// `-` POST /login \
router.post(
    "/login",
    [
        check("name", "Input correct name").isString(),
        check("password", "Input password").exists(),
    ],
    async (req, res) => {
        try {
            const errs = validationResult(req);
            if (!errs.isEmpty()) {
                res.status(400).json({
                    errs: errs.array(),
                    message: "Incorrect data for login",
                });
            } else {
                const { name, password } = req.body;
                const user = await models.User.findOne({ where: {name: name} });

                if (!user) {
                    res.status(400).json({ message: "User doesn't exist" });
                } else {
                    const isMatch = (password === user.password);
                    if (!isMatch) {
                        res.status(400).json({ message: "Incorrect password" });
                        return;
                    }
                    res.status(200).json({ userId: user.id, name: name });
                }
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

module.exports = router;
