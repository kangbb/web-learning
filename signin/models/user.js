var bcrypt = require('bcrypt-as-promised');
var debug = require('debug')('signin:user');
var validator = require('../public/javascripts/validator');
var _ = require('lodash');
module.exports = function (db) {
    var users = db.collection('users');

    return {
        findUser: function (username, password) {
            return users.findOne({username: username}).then(function (user) {
                return user ? bcrypt.compare(password, user.password)
                    .then(function () {
                        return user;
                    }).catch(function (err) {
                        return Promise.reject('您输入的密码不正确');
                    }) : Promise.reject("您输入的用户不存在.");
            });
        },
        createUser: function (user) {
            var iteration = 10;
            return bcrypt.hash(user.password, iteration).then(function (value) {
                user.password = value;
                return users.insertOne(user);
            });
        },
        checkUser: function (user) {
            var formatErrors = validator.findFormatErrors(user);
            return new Promise(function (resolve, reject) {
                formatErrors ? reject(formatErrors) : resolve(user);
            }).then(function () {
                return users.findOne(getQueryForUniqueInAttributes(user))
                    .then(function (existedUser) {
                        debug('existed user: ', existedUser);
                        if(existedUser){
                            var errorMessages = {};
                            var lab = {
                                username: '该用户名',
                                sid: '该学号',
                                phone: '该电话',
                                email: '该邮箱'
                            }
                            for(var key in user){
                                if(key != 'password' && key != 'repeat-password'){
                                    if(!validator.isAttrValueUnique(existedUser, user, key)){
                                        errorMessages[key] = lab[key] + '已存在';
                                    }else{
                                        errorMessages[key] = '';
                                    }
                                }else{
                                    errorMessages[key] = '';
                                }
                            }
                            return Promise.reject(errorMessages);
                        }else{
                            return Promise.resolve(user);
                        }
                    });
            });
        }
    };
}

function getQueryForUniqueInAttributes(user) {
    return{
        $or: _.chain(user).omit('password').toPairs().map(pairToObject).value()
    }
}

function pairToObject(pair) {
    var obj = {};
    obj[pair[0]] = pair[1];
    return obj;
}