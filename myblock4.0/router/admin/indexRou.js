/**
 * 管理员后台页面
 */
const express = require('express');

//加载中间件
const adminMid = require('../../middleware/adminMid');
const logsMid = require('../../middleware/logsMid')
const pvMid = require('../../middleware/pvMid')
const articleMid = require('../../middleware/articleMid')
const categoryMid = require('../../middleware/categoryMid')

const indexApp = express();

//跳转至管理员首页面
indexApp.get('/' , [adminMid.allowAdmin , logsMid.lastLogin , pvMid.hitsTotal , articleMid.RecomCount , categoryMid.NavCount ] , (request , response) => {
    let { adm , log , h_total , rec_count , nav_count } = request;
    console.log('log='+log)
    response.render('admin/index' , { a: adm , l: log , h: h_total , r: rec_count , n: nav_count });
})


//异步加载访问量接口，用于渲染到图
indexApp.get('/pvs_data' , [pvMid.allData] , (request , response) => {
    let { pv_data } = request;

    let obj_data = {};//创建一个空对象

    obj_data.data = pv_data;
    obj_data.start = pv_data[0].time;   //获取起始日期
    obj_data.end = pv_data[pv_data.length-1].time;  //获取终止日期

    response.json(obj_data);
} )


module.exports = indexApp
