var express = require('express');
var validator = require("../public/javascripts/validator");
var router = express.Router();

var users = {};

module.exports = function (db) {
    var userManager = require('../models/user')(db);

    /* Get signin page */
    router.get('/signin', function(req, res, next){
        res.render('signin', {title: '登陆', url: 'signin.css', user: {}, error: ''});
    });

    router.post('/signin', function (req, res, next) {
        userManager.findUser(req.body.username, req.body.password)
            .then(function (user) {
                    req.session.user = user;
                    res.redirect('/detail');
            })
            .catch(function (err) {
                res.render('signin', {title: '登陆', url: 'signin.css', user: req.body, error: err });
            });
    });

    router.get('/signout', function (req, res, next) {
        delete req.session.user;
        res.redirect('/signin');
    });

    /* GET signup page. */
    router.get('/signup', function(req, res, next){
        res.render('signup', {title: '注册', url: 'signup.css', user: {}, error: {}});
    });

    /* Post show detail. */
    router.post('/signup', function(req, res, next){
        var user = req.body;
        userManager.checkUser(user)
            .then(userManager.createUser)
            .then(function () {
                req.session.user = user;
                res.redirect('/detail');
            })
            .catch(function (error) {
                res.render('signup', {title: '注册', user: user, url: 'signup.css', error: error });
            });
    });

    router.all('*', function (req, res, next) {
        req.session.user ? next():res.redirect('/signin');
    })
    /* GET detail page. */
    router.get('/detail', function(req, res, next) {
        res.render('detail', { title: '详情', url: 'detail.css', user: req.session.user});
    });

    return router;
}
