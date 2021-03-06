const request = require('request-promise')
const config = require('../tool/config.js')
const api = require('../tool/api.js')
const error = require('../tool/error.js')
const Const = require('../tool/const.js')

const exp = {
    URL : '/authenticate',
    ACTION : (req, res) => {
        try {
            const params = req.body
            if (!params || !params.login || !params.password) {
                error.fn401(res, 'incorrect params')
                return
            }
            options = {
                method: 'POST',
                uri: api.getUrl(exp.URL),
                form: {
                    login: params.login,
                    password: params.password
                },
                headers: { 
                    'User-Agent': 'Request-Promise', 
                },
                json: true  
            }
            request(options)
                .then((data) => {
                    res.json({
                        success : true,
                        token : data.token,
                        user : data.user
                    })
                })
                .catch((err) => {
                    if (err.statusCode == 401)
                        error.fn401(res, 'Authentication failed')
                    else
                        error.fn500(res, err)
                })
        } catch(ex) {
            error.fn500(res, ex)
        }
    }
}

module.exports = exp

