// express 模块
var express = require('express');
var router = express.Router();
var User = require('../models/User');


router.use(function(req, res, next) {

    res.responseData = {
        code: 0,
        message: ''
    }

    res.sendJSON = function() {
        this.json(this.responseData);
    }

    next();
});

/*
* 用户名验证
* method: GET
* params:
*   <string>username : 用户要注册的用户名
* */
router.get('/user/checkUserName', function(req, res) {
    var username = req.query.username || '';

    //用户名验证
    if ( username.length < 3 || username.length > 16 ) {
        res.responseData.code = 1;
        res.responseData.message = '用户名长度必须在3-16个字符之间';
        res.sendJSON();
        return;
    }

    //验证用户名是否已经被注册
    User.findOne({
        username: username
    }).then(function(result) {
        if (result) {
            res.responseData.code = 2;
            res.responseData.message = '用户名已经被注册';
        } else {
            res.responseData.message = '用户名可以注册';
        }
        res.sendJSON();
    })

})

/*
* 用户注册
* method: POST
* params:
*   <string>username : 用户要注册的用户名
*   <string>password : 用户要注册的密码
*   <string>repassword : 重复密码
* */
router.post('/user/register', function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';
    var repassword = req.body.repassword || '';

    //用户名验证
    if ( username.length < 3 || username.length > 16 ) {
        res.responseData.code = 1;
        res.responseData.message = '用户名长度必须在3-16个字符之间';
        res.sendJSON();
        return;
    }
    //密码验证
    if (password.length == '') {
        res.responseData.code = 2;
        res.responseData.message = '密码不能为空';
        res.sendJSON();
        return;
    }
    if ( password != repassword ) {
        res.responseData.code = 3;
        res.responseData.message = '两次输入密码不一致';
        res.sendJSON();
        return;
    }

    //验证用户名是否已经被注册
    User.findOne({
        username: username
    }).then(function(result) {
        if (result) {
            res.responseData.code = 4;
            res.responseData.message = '用户名已经被注册';
            res.sendJSON();
            return;
        }
        var user = new User({
            username: username,
            password: password
        });
        return user.save();
    }).then(function(newUser) {
        if (newUser) {
            res.responseData.message = '注册成功';
            res.sendJSON();
        }
    }).catch(function() {
        res.responseData.code = 5;
        res.responseData.message = '注册失败';
        res.sendJSON();
    });

});

/*
 * 用户登录
 * method: POST
 * params:
 *   <string>username : 用户要登录的用户名
 *   <string>password : 用户要登录的密码
 * */
router.post('/user/login', function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    //用户名和密码的验证
    if ( username == '' || password == '' ) {
        res.responseData.code = 1;
        res.responseData.message = '用户名和密码不能为空';
        res.sendJSON();
        return;
    }

    //验证用户名和密码是否是匹配的
    User.findOne({
        username: username
    }).then(function(userInfo) {
        if (!userInfo) {
            res.responseData.code = 2;
            res.responseData.message = '用户名不存在';
            res.sendJSON();
            return;
        }
        if (userInfo.password != password) {
            res.responseData.code = 3;
            res.responseData.message = '密码错误';
            res.sendJSON();
            return;
        }

        //把登录用户的信息记录到cookie中，发送给客户端
        var cookieUserInfo = {
            _id: userInfo._id.toString(),
            username: userInfo.username
        }

        req.cookies.set('userInfo', JSON.stringify(cookieUserInfo));

        res.responseData.message = '登录成功';
        res.sendJSON();
        return;
    })

});


module.exports = router;