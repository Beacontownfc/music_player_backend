const express = require('express')
const cors = require('cors')
const path = require('path');
const userRouter = require('./api/userApi')
const musicRouter = require('./api/musicApi')

const app = express()
app.use(cors())
app.use(userRouter)
app.use(musicRouter)
app.use(express.static(path.join(__dirname, 'static')));


app.listen(8050, ()=>{
    console.log('The serve is running!');
})



