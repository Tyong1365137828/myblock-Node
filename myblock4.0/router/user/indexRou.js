/**
 * 登录子应用
 */
const express = require('express');

//获取中间件
const userMid = require('../../middleware/userMid')
const categoryMid = require('../../middleware/categoryMid')
const articleMid = require('../../middleware/articleMid')
const logsMid = require('../../middleware/logsMid')

const indexAPP = express();//登录子应用


//用户中心首页面
indexAPP.get('/:id' , userMid.findUserById , (request , response) => {
    let { user } = request;

    response.render('user/index' , { u: user })
} )



module.exports = indexAPP;//挂载