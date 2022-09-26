const { Router } = require("express");
const models = require("../models");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = Router();

// POST /signup
router.post(
    "/signup",
    [
        check("name", "Incorrect name").isString(),
        check("password", "Minimal length is 6 symbols, maximal - 255").isLength({
            min: 6,
            max: 255,
        }),
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
                const { name, password, deliveryAddress } = req.body;
                const candidate = await models.User.findOne({ where: { name: name } });

                if (candidate) {
                    return res.status(400).json({ message: "User already exists" });
                }
                console.log("Search completed");
                const hashedPwd = await bcrypt.hash(password, 12);
                console.log("Pwd hashed");
                await models.User.create({
                    name: name,
                    password: hashedPwd,
                    deliveryAddress: deliveryAddress,
                });
                console.log("User created");

                res.status(201).json({ message: "Registered successfully" });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

// POST /login
router.post(
    "/login",
    [check("name", "Input correct name").isString(), check("password", "Input password").exists()],
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
                const user = await models.User.findOne({ where: { name: name } });

                if (!user) {
                    return res.status(400).json({ message: "User doesn't exist" });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    res.status(400).json({ message: "Incorrect password" });
                    return;
                }
                const token = jwt.sign({ userId: user.id }, "ayuryshev_pernProject1!", {
                    expiresIn: "1h",
                });

                res.status(200).json({ userId: user.id, name: name, token: token });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

module.exports = router;
