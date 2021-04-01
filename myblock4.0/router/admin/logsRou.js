/**
 * 管理员后台日志管理页面
 */
const express = require('express');

//加载中间件
const logsMid = require('../../middleware/logsMid')


const logsApp = express();

//日志首页面
logsApp.get('/' , logsMid.logsCount , (request , response , next) => {

    let page = {    //页对象
        index: request.query.i ? request.query.i : 1,   //当前页
        count: request.logsCount.count,   //总记录数从logMid.LogsCount方法获取
        size: 10,    //每页10条记录

    }
    page.total = Math.ceil(page.count / page.size); //总页码数,通过取天花板整数得到
    page.index = page.index > page.total ? request.page.total : page.index    //当前页面,如果这个参数大于页面页数,就取页面页数;否则，就取参数
    page.index = page.index < 1 ? 1 : page.index    //当前页面,如果这个参数小于1，则取1;否则，就取当前参数

    request.page = page ;   //把上面的page放到request中并命名为page
    next();
} , logsMid.logsAllPage , (request , response) => {
    let { page } = request
    let { pageLogs } = request

    page.list = pageLogs;

    response.render('admin/logs/index' , { a: request.adm , pg: page })
})


module.exports = logsApp