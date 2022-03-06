const express = require('express')
const app = express()
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../config')

let isAdmin = (req, res, next) => {
    if(req.headers.authorization) {
        jwt.verify(
            req.headers.authorization.split(' ')[1], config.jwtToken, (err, payload) => {
                if(err){
                    console.log("jwtcheck error")
                    res.status(403)
                    res.json({message: "Вы не вошли в админ-панель"})
                }

                if(payload) {
                    if(payload.isAuth == true) {
                        next()
                    } else {
                        res.status(403)
                        res.json({message: "Вы не вошли в админ-панель"})
                    }
                }
            })
    } else {
        res.status(403)
        res.json({message: "Не авторизовано"})
    }
}
module.exports = isAdmin