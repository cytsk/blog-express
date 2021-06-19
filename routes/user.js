var express = require('express')
var router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login } = require('../controller/user')

router.post('/login', (req, res, next) => {
    const {username , password} = req.body
    const result = login(username, password)

    return result.then(data => {
        if (data.username) {
            // set session
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(new SuccessModel())
            return
        }
        res.json(new ErrorModel('login失败'))
    })
})

router.post('/admin', (req, res, next) => {
    res.json({
        errorno: 0,
        data: {
            username,
            password
        }
    })
    return
})

router.post('/login-test', (req, res, next) => {
    
    const {username , password} = req.body
    res.json({
        errorno: 0,
        data: {
            username,
            password
        }
    })
    return
    
})

// router.get('/session-test', (req, res, next) => {
//     const session = req.session
//     if(session.viewNum == null) {
//         session.viewNum = 0
//     }
//     session.viewNum++

//     res.json({
//         viewNum: session.viewNum
//     })
// })


module.exports = router