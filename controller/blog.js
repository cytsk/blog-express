const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = (author, keyword) => {
    let sql = `select id,title,content,author from blogs where 1=1 `
    if (author) {
        sql += `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    // const createtime = Date.now()
    const author = blogData.author

    let sql = `
    insert into blogs(title,content,createtime,author,updatetime,updateuser) 
    values('${title}','${content}',cast(now() as datetime),'${author}',cast(now() as datetime),'${author}');
    `
    return exec(sql).then(insertData => {
        console.log('insertData is ', insertData)
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {

    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = xss(blogData.author)

    let sql = `
    update blogs set title = '${title}', content = '${content}',updatetime = cast(now() as datetime),updateuser = '${author}' where id = ${id}
    `
    return exec(sql).then(updateDetail => {
        console.log('updateDetail is ',updateDetail)
        if(updateDetail.affectedRows > 0) {
            return true
        }
        return false
    })
    
    
}

const delBlog = (id,author) => {

    let sql = `delete from blogs where 1=1 and id = ${id} and author = '${author}'`
    
    return exec(sql).then(deleteDetail => {
        console.log('deleteId is ',deleteDetail)
        if(deleteDetail.affectedRows > 0) {
            return true
        }
        return false
    })    
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}