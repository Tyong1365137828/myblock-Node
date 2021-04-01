/**
 * 登录子应用
 */
const express = require('express');

//获取中间件
const userMid = require('../../middleware/userMid')
const categoryMid = require('../../middleware/categoryMid')
const articleMid = require('../../middleware/articleMid')
const logsMid = require('../../middleware/logsMid')

const logsAPP = express();//登录子应用


//查看用户日志首页面
logsAPP.get('/index' , logsMid.userLogsCount , (request , response , next) => {

    let page = {    //页对象
        index: request.query.i ? request.query.i : 1,   //当前页
        count: request.userLogsCount.count,   //总记录数从logMid.LogsCount方法获取
        size: 10,    //每页3条记录

    }
    page.total = Math.ceil(page.count / page.size); //总页码数,通过取天花板整数得到
    page.index = page.index > page.total ? request.page.total : page.index    //当前页面,如果这个参数大于页面页数,就取页面页数;否则，就取参数
    page.index = page.index < 1 ? 1 : page.index    //当前页面,如果这个参数小于1，则取1;否则，就取当前参数

    request.page = page ;   //把上面的page放到request中并命名为page
    next();
} , logsMid.userLogsPage , (request , response) => {
    let { page } = request
    let { userPageLogs } = request

    page.list = userPageLogs;

    response.render('user/logs/index' , { u: request.user , pg: page })
})


module.exports = logsAPP;//挂载
