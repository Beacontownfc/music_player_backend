const express = require('express')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const fs = require('jsonfile')
//const bodyPaser = require('body-parser')

const router = express.Router()

const secretKey = 'hello world'

router.use(express.urlencoded({extended: true}))
router.use(express.json())
router.use(expressJWT({secret: secretKey, algorithms: ['HS256']}).unless({path: [/^\/api\//]}))

router.post('/api/login', (req, res)=>{
    fs.readFile('./data/user.json', (err, data)=>{
        if(err) {console.log(err); return;}    
        let login_success = false
        data.forEach((curV)=>{
            if(curV.userName === req.body.userName && curV.password === req.body.password){
                login_success = true
                const token = jwt.sign({userName: req.body.userName}, secretKey, {expiresIn: '1h'})
                res.send({code: 0, msg: '登录成功', token: token})
            }
            if(!login_success) res.send({code: 1, msg: '登录失败'})
        })

    })
})

module.exports = router