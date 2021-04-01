/**
 * 管理员后台登录页面
 */
const express = require('express');

const adminMid = require('../../middleware/adminMid')

const adminApp = express();


//管理员登录页面
adminApp.get('/login' , (request , response) => {
    response.render('admin/login/login' , {msg: ''})
})


//登录
adminApp.post('/login' , [adminMid.loginAdmin] , (request , response) => {
    
    let { admin } = request;

    if(admin) { //存在admin，即admin登录成功
        request.session.adm = admin;    //把admin存入名为adm的session中

        response.redirect('/admin');    //重定向至管理员首页面
    } else {
        response.render('admin/login/login' , {msg: '管理员验证失败！！！请检查您的账号或密码'});  //登录失败，跳转并渲染到管理员登录页面login.html
    }
})


//退出
adminApp.get('/exit' , (request , response) => {
    request.session.adm = null; //把名为adm的session设为空
    response.render('admin/login/login' , {msg: '管理员退出成功'});
})


module.exports = adminApp