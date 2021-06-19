const crypto = require('crypto')

const SECRET_KEY = '#3!12808>119+'

function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

// const result = genPassword('Cout1234')
// const result = genPassword('123')
// console.log(result)

module.exports = {
    genPassword
}