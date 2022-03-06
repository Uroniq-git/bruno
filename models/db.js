const mongo = require('mongodb').MongoClient
const url = ""
const jwt = require('jsonwebtoken')
const config = require("../config")

const db = "fd"
const softsCollection = "soft-carts"
const categoriesCollection = "categories"
const mainCollection = "main"

let getRandomStr = (lenght) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

    for( var i=0; i < lenght; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

let getRandomInt = (lenght) => {
    let text = "";
    let possible = "1234567890";

    for( var i=0; i < lenght; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

let getSoftObject = (data) => {
    return {
        id: getRandomInt(6),
        title: data.title,
        category: data.category,
        logo: data.logo,
        imgs: data.imgs,
        description: data.description,
        comments: [],
        fileFormat: data.fileFormat,
        fileSize: data.fileSize,
        downloadSource: data.downloadSource,
        unlockPassword: data.unlockPassword,
        howInstall: data.howInstall,
        downloadLinks : data.downloadLinks
    }
}

module.exports.createSoft = (data) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            client.db(db).collection(categoriesCollection).findOne({name: data.category}).then((result) => {
                if(result){
                    client.db(db).collection(softsCollection).findOne({title: data.title}).then((soft_result) => {
                        if(soft_result){
                            reject("Страница софта существует")
                        } else {
                            let new_soft = getSoftObject(data)
                            client.db(db).collection(softsCollection).insertOne(new_soft)
                            resolve("Успешно")
                        }
                    })
                } else {
                    reject("Категории не существует")
                }
            })
            //client.db(db).collection(usersCollection).insertOne(getUserObject(login, password))

        })
    })
}
module.exports.deleteSoft = (id) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            client.db(db).collection(softsCollection).findOne({id: id}).then((isExist) => {
                if(isExist) {
                    client.db(db).collection(softsCollection).deleteOne({id: id}, (err, result) => {
                        if(err){
                            reject("Что-то пошло не так")
                        } else {
                            resolve("Успешно")
                        }
                    })
                } else {
                    reject("Такого софта не существует")
                }
            })
        })
    })
}
module.exports.changeSoft = (id, target, newValue) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            client.db(db).collection(softsCollection).findOne({id: id}).then((soft) => {
                if(soft){
                    if(target == "title"){
                        client.db(db).collection(softsCollection).updateOne({id: id}, {$set: {title: newValue}})
                    } else if (target == "category"){
                        client.db(db).collection(softsCollection).updateOne({id: id}, {$set: {category: newValue}})
                    } else if(target == "logo"){
                        client.db(db).collection(softsCollection).updateOne({id: id}, {$set: {logo: newValue}})
                    } else if(target == "imgs"){
                        client.db(db).collection(softsCollection).updateOne({id: id}, {$set: {imgs: newValue}})
                    } else if(target == "description") {
                        client.db(db).collection(softsCollection).updateOne({id: id}, {$set: {description: newValue}})
                    } else if(target == "fileFormat") {
                        client.db(db).collection(softsCollection).updateOne({id: id}, {$set: {fileFormat: newValue}})
                    } else if(target == "fileSize") {
                        client.db(db).collection(softsCollection).updateOne({id: id}, {$set: {fileSize: newValue}})
                    } else if(target == "downloadSource") {
                        client.db(db).collection(softsCollection).updateOne({id: id}, {$set: {downloadSource: newValue}})
                    } else if(target == "unlockPassword") {
                        client.db(db).collection(softsCollection).updateOne({id: id}, {$set: {unlockPassword: newValue}})
                    } else if (target == "howInstall") {
                        client.db(db).collection(softsCollection).updateOne({id: id}, {$set: {howInstall: newValue}})
                    } else if(target == "downloadLinks") {
                        client.db(db).collection(softsCollection).updateOne({id: id}, {$set: {downloadLinks: newValue}})
                    } else{
                        reject("Такого элемента не существует")
                    }
                    resolve("Успешно")
                } else {
                    reject("Такого софта не существует")
                }
            })

        })
    })
}
module.exports.getAllSofts = () => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            client.db(db).collection(softsCollection).find().toArray().then((result) => {
                for(let i = 0; i < result.length; i++){
                    delete result[i]._id
                }
                delete result._id
                resolve(result)
            }, (err) => {
                console.log(err)
                reject(err)
            })
        })
    })
}
module.exports.getSoftById = (id) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            client.db(db).collection(softsCollection).findOne({id: id}).then((result) => {
                if(result){
                    delete result._id
                    resolve(result)
                } else {
                    reject("Ничего не найдено")
                }
            }, (err) => {
                console.log(err)
                reject(err)
            })
        })
    })
}
module.exports.getSoftbyCategory = (category) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            client.db(db).collection(softsCollection).find({category: category}).toArray().then((result) => {
                delete result._id
                resolve(result)
            }, (err) => {
                console.log(err)
                reject(err)
            })
        })
    })
}

module.exports.createCategory = (name) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            client.db(db).collection(categoriesCollection).findOne({name:name}).then((result) => {
                if(result){
                    reject("Категория существует")
                } else {
                    client.db(db).collection(categoriesCollection).insertOne({name: name})
                    resolve("Успешно")
                }
            })
        })
    })
}
module.exports.deleteCategory = (name) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            client.db(db).collection(categoriesCollection).findOne({name: name}).then((isExist) => {
                if(isExist){
                    client.db(db).collection(softsCollection).deleteOne({category: name})
                    client.db(db).collection(categoriesCollection).deleteOne({name: name}, (err, result) => {
                        if(err){
                            reject("Что-то пошло не так")
                        } else {
                            resolve("Успешно")
                        }
                    })
                } else {
                    reject("Скорее всего вы пытаетесь удалить несуществующую категорию")
                }
            })
        })
    })
}
module.exports.renameCategory = (name, newname) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            client.db(db).collection(categoriesCollection).findOne({name: name}).then((isExist) => {
                if(isExist){
                    client.db(db).collection(categoriesCollection).updateOne({name: name}, {$set: {name: newname}})
                    client.db(db).collection(softsCollection).updateOne({category: name}, {$set: {category: newname}})
                    resolve("Успешно")
                } else {
                    reject("Скорее всего вы пытаетесь переименовать несуществующую категорию")
                }
            })
        })
    })
}
module.exports.getAllCategories = () => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            client.db(db).collection(categoriesCollection).find().toArray().then((result) => {
                resolve(result)
            }, (err) => {
                console.log(err)
                reject(err)
            })
        })
    })
}

module.exports.changeLogo = (theme, newUrl) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            if(theme == "dark") {
                client.db(db).collection(mainCollection).updateOne({}, {$set: {darkLogo: newUrl}})
                resolve("Успешно")
            } else if (theme == "light") {
                client.db(db).collection(mainCollection).updateOne({}, {$set: {lightLogo: newUrl}})
                resolve("Успешно")
            }

            // client.db(db).collection(categoriesCollection).updateOne({name: name}, {$set: {name: newname}})
        })
    })
}
module.exports.changeFont = (target, fontFamily) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            if(target == "title") {
                client.db(db).collection(mainCollection).updateOne({}, {$set: {titleFontFamily: fontFamily}})
                resolve("Успешно")
            } else if (target == "description") {
                client.db(db).collection(mainCollection).updateOne({}, {$set: {decriptionFontFamily: fontFamily}})
                resolve("Успешно")
            }

            // client.db(db).collection(categoriesCollection).updateOne({name: name}, {$set: {name: newname}})
        })
    })
}
module.exports.changeColor = (target, color) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, client) => {
            if (err) {
                console.log('Connection error: ', err)
                throw err
            }
            if (target == "header") {
                client.db(db).collection(mainCollection).updateOne({}, {$set: {"colors.header": color}})
            } else if(target == "underHeader") {
                client.db(db).collection(mainCollection).updateOne({}, {$set: {"colors.underHeader": color}})
            } else if(target == "font"){
                client.db(db).collection(mainCollection).updateOne({}, {$set: {"colors.font": color}})
            } else if(target == "background"){
                client.db(db).collection(mainCollection).updateOne({}, {$set: {"colors.background": color}})
            } else if(target == "blockBackground") {
                client.db(db).collection(mainCollection).updateOne({}, {$set: {"colors.blockBackground": color}})
            } else if(target == "button"){
                client.db(db).collection(mainCollection).updateOne({}, {$set: {"colors.button": color}})
            } else if(target == "hoverButton"){
                client.db(db).collection(mainCollection).updateOne({}, {$set: {"colors.hoverButton": color}})
            } else{
                reject("Такого элемента не существует")
            }
            resolve("Успешно")

        })
    })
}

// client.db(db).collection(categoriesCollection).updateOne({name: name}, {$set: {name: newname}})