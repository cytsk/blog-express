var express = require('express')
var router = express.Router()
const { getList,getDetail,newBlog,updateBlog,delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', loginCheck, (req, res, next) => {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData))
    })
})

// details
router.get('/detail', loginCheck, (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data))
    })
})

// create a blog
router.post('/new', loginCheck, (req, res, next) => {

    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data))
    })
})

// update a blog
router.post('/update', loginCheck, (req, res, next) => {

    req.body.author = req.session.username
    const result = updateBlog(req.query.id,req.body)
    return result.then(val => {
        if (val) {
            res.json(new SuccessModel())
        }else {
            res.json(new ErrorModel('更新Blog失敗'))
        }
    })
})

// delete a blog
router.post('/del', loginCheck, (req, res, next) => {

    const result = delBlog(req.query.id,req.session.username)
    return result.then(val => {
        if (val) {
            res.json(new SuccessModel())
        }else {
            res.json(new ErrorModel('删除Blog失败'))
        }
    })
})

module.exports = router