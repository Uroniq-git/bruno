const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../config')
const mongodb = require('mongodb')

const adminMiddleware = require('../middlewares/adminMiddleware')

const db = require("../models/db")
const fs = require("fs");

let createJwtToken = async () => {
    return jwtToken = await jwt.sign({isAuth: true}, config.jwtToken)
}


router.post('/auth', (req, res) => {
    if(req.body.password == config.adminPassword) {
        createJwtToken().then((token) => {
            res.status(200).json({token: token})
        })
    } else {
        res.status(403).json({err: "Неверный пароль"})
    }
})

router.post('/createSoft', adminMiddleware, (req, res) => {
    data = {
        title: req.body.title,
        logo: req.body.logo,
        category: req.body.category,
        imgs: req.body.imgs,
        description: req.body.description,
        fileFormat: req.body.fileFormat,
        fileSize: req.body.fileSize,
        downloadSource: req.body.downloadSource,
        unlockPassword: req.body.unlockPassword,
        howInstall: req.body.howInstall,
        downloadLinks: req.body.downloadLinks,
    }
    db.createSoft(data).then((result) => {
        res.status(200).json({message: result})
    }, (err) => {
        res.status(403).json({err: err})
    })
})
router.post('/deleteSoft', adminMiddleware, (req, res) => {
    db.deleteSoft(req.body.id).then((result) => {
        res.status(200).json({message: result})
    }, (err) => {
        res.status(403).json({err: err})
    })
})
router.post('/changeSoft', (req, res) => {
    db.changeSoft(req.body.id, req.body.target, req.body.newValue).then((result) => {
        res.status(200).json({message: result})
    }, (err) => {
        res.status(403).json({err: err})
    })
})

router.post('/createCategory', adminMiddleware, (req, res) => {
    db.createCategory(req.body.name).then((result) => {
        res.status(200).json({message: result})
    }, (err) => {
        res.status(403).json({err: err})
    })
})
router.post('/deleteCategory', adminMiddleware, (req, res) => {
    db.deleteCategory(req.body.name).then((result) => {
        res.status(200).json({message: result})
    }, (err) => {
        res.status(403).json({err: err})
    })
})
router.post('/renameCategory', adminMiddleware, (req, res) => {
    db.renameCategory(req.body.name, req.body.newName).then((result) => {
        res.status(200).json({message: result})
    }, (err) => {
        res.status(403).json({err: err})
    })
})

router.post('/changeLogo', adminMiddleware, (req, res) => {
    db.changeLogo(req.body.theme, req.body.newUrl).then((result) => {
        res.status(200).json({message: result})
    }, (err) => {
        res.status(403).json({err: err})
    })
})
router.post('/changeFont', adminMiddleware, (req, res) => {
    db.changeFont(req.body.target, req.body.fontFamily).then((result) => {
        res.status(200).json({message: result})
    }, (err) => {
        res.status(403).json({err: err})
    })
})
router.post('/changeColor', adminMiddleware, (req, res) => {
    db.changeColor(req.body.target, req.body.color).then((result) => {
        res.status(200).json({message: result})
    }, (err) => {
        res.status(403).json({err: err})
    })
})


router.post('/test', adminMiddleware, (req, res) => {
    res.send("work")
})

module.exports = router;