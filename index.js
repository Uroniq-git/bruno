const express = require('express')
const app = express()
const Routes = require('./routes')
const port = 3000
const config = require('./config')

app.use(express.json());
app.use('/', Routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})