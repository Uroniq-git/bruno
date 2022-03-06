const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../config')

const adminMiddleware = require('../middlewares/adminMiddleware')

const db = require("../models/db")

router.get('/getCategories', (req, res) => {
    db.getAllCategories().then((result) => {
        res.status(200).json({categories: result})
    }, (err) => {
        res.status(403).json({err: err})
    })
})
router.get('/getSofts', (req, res) => {
    db.getAllSofts().then((result) => {
        res.status(200).json(result)
    }, (err) => {
        res.status(403).json({err: err})
    })
})
router.get('/getSoftbyCategory', (req ,res) => {
    db.getSoftbyCategory(req.body.category).then((result) => {
        res.status(200).json(result)
    }, (err) => {
        res.status(403).json({err: err})
    })
})
router.get('/getSoftbyId', (req ,res) => {
    db.getSoftById(req.body.id).then((result) => {
        res.status(200).json(result)
    }, (err) => {
        res.status(403).json({err: err})
    })
})



module.exports = router;