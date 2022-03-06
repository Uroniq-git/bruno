const express = require("express");
const router = express.Router();

const adminRouter = require("./adminRouter.js")
const userRouter = require("./userRouter")

router.use('/admin', adminRouter)
router.use('/user', userRouter)

module.exports = router;